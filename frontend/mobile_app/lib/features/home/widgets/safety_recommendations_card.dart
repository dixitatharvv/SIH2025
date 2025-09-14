import 'package:flutter/material.dart';

class SafetyRecommendationsCard extends StatelessWidget {
  const SafetyRecommendationsCard({super.key});

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
            Row(
              children: [
                const Icon(
                  Icons.shield,
                  color: Color(0xFF1E3A8A),
                  size: 20,
                ),
                const SizedBox(width: 8),
                const Text(
                  'Safety Recommendations',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFF1E3A8A),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            // Recommendations List
            _buildRecommendation('Avoid swimming alone'),
            _buildRecommendation('Stay close to shore'),
            _buildRecommendation('Check with lifeguards before entering'),
            _buildRecommendation('Be aware of rip current warnings'),
          ],
        ),
      ),
    );
  }

  Widget _buildRecommendation(String text) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            margin: const EdgeInsets.only(top: 6),
            width: 6,
            height: 6,
            decoration: const BoxDecoration(
              color: Color(0xFF1E3A8A),
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              text,
              style: const TextStyle(
                fontSize: 14,
                color: Color(0xFF374151),
                height: 1.4,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
