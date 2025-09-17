import React, { useState, useRef } from 'react';
import { submitReport } from '../../services/reportService';
import { 
  MapPin, 
  Camera, 
  Video, 
  Mic, 
  AlertTriangle, 
  Upload,
  Save,
  Send,
  FileImage,
  FileVideo,
  MicIcon,
  Play,
  Pause,
  Square
} from 'lucide-react';

const Report = () => {
  const [selectedIncidentType, setSelectedIncidentType] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);

  const incidentTypes = [
    { value: 'usual_tides', label: 'Usual Tides' },
    { value: 'flooding', label: 'Flooding' },
    { value: 'coastal_damage', label: 'Coastal Damage' },
    { value: 'tsunami', label: 'Tsunami' },
    { value: 'swell_surges', label: 'Swell Surges' },
    { value: 'high_waves', label: 'High Waves' },
    { value: 'rip_current', label: 'Rip Current' },
    { value: 'marine_life', label: 'Marine Life Alert' },
    { value: 'weather_alert', label: 'Weather Alert' },
    { value: 'other', label: 'Other' }
  ];

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages(prev => [...prev, ...files]);
  };

  const handleVideoUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedVideos(prev => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index) => {
    setSelectedVideos(prev => prev.filter((_, i) => i !== index));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get geolocation
      const position = await new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported by this browser.'));
          return;
        }
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        });
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      await submitReport({
        activityType: selectedIncidentType,
        description,
        photos: selectedImages,
        videos: selectedVideos,
        voiceReport: audioBlob,
        latitude,
        longitude,
      });

      alert('Report submitted successfully. It has been queued for processing.');
      // Reset form
      setSelectedIncidentType('');
      setDescription('');
      setSelectedImages([]);
      setSelectedVideos([]);
      setAudioBlob(null);
    } catch (err) {
      console.error('Submit failed', err);
      alert(err?.message || 'Failed to submit report. Please try again.');
    }
  };

  const handleSaveDraft = () => {
    // Handle save as draft
    console.log('Saving as draft...');
  };

  return (
    <div className="min-h-screen bg-sky-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1 text-left">Report Ocean Incident</h1>
              <p className="text-slate-600">Help keep our waters safe by reporting incidents</p>
            </div>
            
            {/* GPS Status */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-lg">
              <MapPin className="w-4 h-4 mr-2" />
              GPS Active
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Main Content - Left Side */}
          <div className="flex-1">
            <form id="report-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Incident Report Details Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-5 h-5 text-blue-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-800">Incident Report Details</h2>
            </div>

            {/* Incident Type - Full Width */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3 text-left">
                Incident Type *
              </label>
              <div className="relative">
                <select
                  value={selectedIncidentType}
                  onChange={(e) => setSelectedIncidentType(e.target.value)}
                  className="w-full p-4 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 appearance-none bg-white text-slate-800 font-medium"
                  required
                >
                  <option value="">Select incident type</option>
                  {incidentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-left">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none"
                placeholder="Describe the incident in detail..."
                required
              />
            </div>
          </div>

          {/* Media Evidence Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Camera className="w-5 h-5 text-blue-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-800">Media Evidence</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Photo Upload */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-6 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-blue-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <p className="text-blue-600 font-semibold mb-1">Add Photos</p>
                    <p className="text-sm text-slate-500">Click to upload images</p>
                  </div>
                </button>

                {/* Selected Images Preview */}
                {selectedImages.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {selectedImages.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center">
                          <FileImage className="w-4 h-4 text-blue-500 mr-2" />
                          <span className="text-sm font-medium text-slate-700 truncate">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video Upload */}
              <div>
                <input
                  type="file"
                  ref={videoInputRef}
                  onChange={handleVideoUpload}
                  accept="video/*"
                  multiple
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  className="w-full p-6 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="text-center">
                    <Video className="w-8 h-8 text-blue-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <p className="text-blue-600 font-semibold mb-1">Add Videos</p>
                    <p className="text-sm text-slate-500">Click to upload videos</p>
                  </div>
                </button>

                {/* Selected Videos Preview */}
                {selectedVideos.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {selectedVideos.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center">
                          <FileVideo className="w-4 h-4 text-blue-500 mr-2" />
                          <span className="text-sm font-medium text-slate-700 truncate">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeVideo(index)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Voice Report Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Mic className="w-5 h-5 text-blue-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-800">Voice Report</h2>
            </div>

            <div className="max-w-md mx-auto">
              {!audioBlob ? (
                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-200 ${
                    isRecording 
                      ? 'border-red-300 bg-red-50 hover:bg-red-100' 
                      : 'border-blue-300 bg-blue-50 hover:bg-blue-100'
                  }`}
                >
                  <div className="text-center">
                    {isRecording ? (
                      <>
                        <Square className="w-8 h-8 text-red-500 mx-auto mb-3 animate-pulse" />
                        <p className="text-red-600 font-semibold mb-1">Stop Recording</p>
                        <p className="text-sm text-red-500">Recording in progress...</p>
                      </>
                    ) : (
                      <>
                        <Mic className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                        <p className="text-blue-600 font-semibold mb-1">Start Voice Report</p>
                        <p className="text-sm text-slate-500">Describe the incident</p>
                      </>
                    )}
                  </div>
                </button>
              ) : (
                <div className="p-6 border-2 border-green-300 bg-green-50 rounded-xl">
                  <div className="text-center mb-4">
                    <MicIcon className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <p className="text-green-600 font-semibold">Voice Report Recorded</p>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <button
                      type="button"
                      onClick={isPlaying ? pauseAudio : playAudio}
                      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setAudioBlob(null);
                        setIsPlaying(false);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                  
                  <audio ref={audioRef} className="hidden" />
                </div>
              )}
            </div>
          </div>

            </form>
          </div>

          {/* Right Sidebar - Submit Section */}
          <div className="w-80">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <Send className="w-5 h-5 text-blue-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-800">Submit Report</h2>
                </div>
                
                <div className="space-y-4">
                  <button
                    type="submit"
                    form="report-form"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-md flex items-center justify-center"
                  >
                    Submit Report
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 flex items-center justify-center"
                  >
                    Save as Draft
                  </button>
                </div>
                
                <p className="text-center text-sm text-gray-500 mt-6">
                  Reports are reviewed by safety officials and shared with the community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
