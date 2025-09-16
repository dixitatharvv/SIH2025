import 'package:flutter/material.dart';

class SafePlacesCard extends StatelessWidget {
  const SafePlacesCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      color: const Color(0xFFF8FAFC),
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            const Row(
              children: [
                Icon(
                  Icons.shield,
                  color: Color(0xFF1E3A8A),
                  size: 20,
                ),
                SizedBox(width: 8),
                Text(
                  'Safe Places Nearby',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFF1E3A8A),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            // Safe Places List
            _buildSafePlace(
              'Main Beach Lifeguard Station',
              '0.2 km',
              'Lifeguard Station',
              '+(91) 1234567890',
            ),
            const SizedBox(height: 12),
            _buildSafePlace(
              'Harbor Safe Zone',
              '0.5 km',
              'Protected Harbor',
              '+(91) 1234567890',
            ),
            const SizedBox(height: 12),
            _buildSafePlace(
              'Emergency Medical Station',
              '0.9 km',
              'Medical Facility',
              '+(91) 1234567890',
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSafePlace(
      String name, String distance, String type, String phone) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(
                Icons.local_hospital,
                color: Color(0xFF1E3A8A),
                size: 20,
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  name,
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFF374151),
                  ),
                ),
              ),
              Text(
                distance,
                style: const TextStyle(
                  fontSize: 12,
                  color: Color(0xFF6B7280),
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Text(
            type,
            style: const TextStyle(
              fontSize: 12,
              color: Color(0xFF3B82F6),
            ),
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              const Icon(
                Icons.phone,
                color: Color(0xFF6B7280),
                size: 16,
              ),
              const SizedBox(width: 4),
              Text(
                phone,
                style: const TextStyle(
                  fontSize: 12,
                  color: Color(0xFF6B7280),
                ),
              ),
              const Spacer(),
              ElevatedButton.icon(
                onPressed: () {
                  // Handle directions
                },
                icon: const Icon(
                  Icons.directions,
                  size: 16,
                ),
                label: const Text(
                  'Directions',
                  style: TextStyle(fontSize: 12),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF1E3A8A),
                  foregroundColor: Colors.white,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  minimumSize: Size.zero,
                  tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
