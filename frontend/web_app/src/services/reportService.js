// Report Service for API communication
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

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
    
    // Add required fields
    formData.append('hazard_type', reportData.activityType);
    formData.append('description', reportData.description || '');
    
    // Add location data (you might want to get this from geolocation)
    // For now, using default coordinates - you can modify this
    formData.append('latitude', 28.6139); // Default to Delhi coordinates
    formData.append('longitude', 77.2090);
    
    // Add media files
    if (reportData.photos && reportData.photos.length > 0) {
      reportData.photos.forEach((photo, index) => {
        formData.append(`photo_${index}`, photo);
      });
    }
    
    if (reportData.videos && reportData.videos.length > 0) {
      reportData.videos.forEach((video, index) => {
        formData.append(`video_${index}`, video);
      });
    }
    
    // Add voice report if available
    if (reportData.voiceReport) {
      formData.append('voice_report', reportData.voiceReport);
    }

    const response = await fetch(`${API_BASE_URL}/api/reports/submit`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header, let browser set it with boundary for FormData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || 
        `HTTP error! status: ${response.status}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting report:', error);
    
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the server. Please check your internet connection.');
    }
    
    // Re-throw other errors
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
    const response = await fetch(`${API_BASE_URL}/api/reports/draft`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving draft:', error);
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
