import api from '../utils/api';

export const fetchHotspots = async () => {
  const { data } = await api.get('/reports/hotspots');
  // Normalize items
  return (data.items || []).map((h) => ({
    id: h.report_id,
    lat: h.latitude,
    lng: h.longitude,
    confidence: typeof h.confidence === 'number' ? h.confidence : 0,
    hazardType: h.hazard_type,
    status: h.status,
    createdAt: h.created_at,
  }));
};




