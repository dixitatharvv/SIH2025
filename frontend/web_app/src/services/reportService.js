// Report Service for API communication
import api from '../utils/api';

// Map UI activity labels to backend HazardType values
const mapActivityToHazardType = (activityType) => {
  const mapping = {
    'Oil Spill': 'Marine Debris / Pollution',
    'Marine Pollution': 'Marine Debris / Pollution',
    'Suspicious Vessel': 'Other',
    'Fishing Violation': 'Other',
    'Coral Damage': 'Other',
    'Marine Life Disturbance': 'Other',
    'Weather Hazard': 'High Waves / Swell',
    'Navigation Hazard': 'Other',
    'Other': 'Other',
    // Support values used by Report page
    'tsunami': 'Tsunami',
    'high_waves': 'High Waves / Swell',
    'swell_surges': 'High Waves / Swell',
    'flooding': 'Coastal Flooding',
    'coastal_damage': 'Coastal Erosion',
    'rip_current': 'Rip Current',
    'marine_life': 'Other',
    'weather_alert': 'High Waves / Swell',
    'usual_tides': 'Other',
  };
  // If already a valid backend enum value, pass through
  const validBackendEnums = new Set([
    'Tsunami',
    'High Waves / Swell',
    'Coastal Flooding',
    'Storm Surge',
    'Rip Current',
    'Coastal Erosion',
    'Water Discoloration / Algal Bloom',
    'Marine Debris / Pollution',
    'Other',
  ]);
  if (validBackendEnums.has(activityType)) return activityType;
  return mapping[activityType] || 'Other';
};

/**
 * Submit a hazard report to the backend API
 * @param {Object} reportData - The report data to submit
 * @param {string} reportData.activityType - Type of activity/hazard
 * @param {string} reportData.description - Description of the hazard
 * @param {Array} reportData.photos - Array of photo files
 * @param {Array} reportData.videos - Array of video files
 * @param {Object} reportData.voiceReport - Voice recording data
 * @returns {Promise<Object>} Response from the API
 */
export const submitReport = async (reportData) => {
  try {
    // Create FormData for multipart/form-data request
    const formData = new FormData();
    
    // Add required fields matching backend
    formData.append('user_hazard_type', mapActivityToHazardType(reportData.activityType));
    formData.append('user_description', reportData.description || '');
    
    // Location is sent in headers, not form fields
    
    // Add media files as a single field list expected by backend
    if (reportData.photos && reportData.photos.length > 0) {
      reportData.photos.forEach((file) => {
        formData.append('media_files', file);
      });
    }
    if (reportData.videos && reportData.videos.length > 0) {
      reportData.videos.forEach((file) => {
        formData.append('media_files', file);
      });
    }
    if (reportData.voiceReport) {
      formData.append('media_files', reportData.voiceReport);
    }

    const { data } = await api.post('/reports/submit', formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'latitude': String(reportData.latitude),
        'longitude': String(reportData.longitude),
      },
    });
    return data;
  } catch (error) {
    console.error('Error submitting report:', error);
    
    // Normalize axios/network errors
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    if (error.message?.includes('Network Error')) {
      throw new Error('Unable to connect to the server. Please check your internet connection.');
    }
    throw error;
  }
};

/**
 * Save report as draft (for future implementation)
 * @param {Object} reportData - The report data to save as draft
 * @returns {Promise<Object>} Response from the API
 */
export const saveDraft = async (reportData) => {
  try {
    const { data } = await api.post('/reports/draft', reportData);
    return data;
  } catch (error) {
    console.error('Error saving draft:', error);
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw error;
  }
};

/**
 * Get current location using browser geolocation API
 * @returns {Promise<Object>} Location object with latitude and longitude
 */
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        let errorMessage = 'Unable to get your location.';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};

/**
 * Validate report data before submission
 * @param {Object} reportData - The report data to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateReportData = (reportData) => {
  const errors = [];
  
  if (!reportData.activityType || reportData.activityType.trim() === '') {
    errors.push('Activity type is required');
  }
  
  if (!reportData.description || reportData.description.trim() === '') {
    errors.push('Description is required');
  }
  
  if (reportData.description && reportData.description.length < 10) {
    errors.push('Description must be at least 10 characters long');
  }
  
  if (reportData.photos && reportData.photos.length > 5) {
    errors.push('Maximum 5 photos allowed');
  }
  
  if (reportData.videos && reportData.videos.length > 3) {
    errors.push('Maximum 3 videos allowed');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Validate file type and size
 * @param {File} file - File to validate
 * @param {string} type - Expected file type ('image' or 'video')
 * @returns {Object} Validation result
 */
export const validateFile = (file, type) => {
  const errors = [];
  
  if (type === 'image') {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
      errors.push('Only JPEG, PNG, and GIF images are allowed');
    }
    
    if (file.size > maxSize) {
      errors.push('Image size must be less than 5MB');
    }
  } else if (type === 'video') {
    const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'];
    const maxSize = 50 * 1024 * 1024; // 50MB
    
    if (!allowedTypes.includes(file.type)) {
      errors.push('Only MP4, AVI, MOV, and WMV videos are allowed');
    }
    
    if (file.size > maxSize) {
      errors.push('Video size must be less than 50MB');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
