import React, { useState } from 'react';
import { MapPin, Camera, FileText } from 'lucide-react';

const Report = () => {
  const [reportType, setReportType] = useState('incident');

  return (
    <div className="min-h-screen bg-sky-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Submit Report
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select 
              value={reportType} 
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="incident">Incident Report</option>
              <option value="emergency">Emergency</option>
              <option value="maintenance">Maintenance Request</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the issue"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea 
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed description of the report"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-600">Upload Images</p>
                <p className="text-sm text-gray-500">Click to select files</p>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-gray-600">Location</p>
                <p className="text-sm text-gray-500">Click to set location</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Save Draft
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Submit Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
