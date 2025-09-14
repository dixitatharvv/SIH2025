import 'package:flutter/material.dart';
import '../widgets/custom_app_bar.dart';
import '../widgets/current_location_card.dart';
import '../widgets/reports_activity_card.dart';
import '../widgets/risk_assessment_card.dart';
import '../widgets/safety_recommendations_card.dart';
import '../widgets/safe_places_card.dart';
import '../widgets/emergency_contact_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  final List<Widget> _screens = [
    const HomeContent(),
    const Center(
        child: Text('Report Screen', style: TextStyle(color: Colors.white))),
    const Center(
        child: Text('Community Screen', style: TextStyle(color: Colors.white))),
    const Center(
        child: Text('Profile Screen', style: TextStyle(color: Colors.white))),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(),
      body: _screens[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        backgroundColor: Colors.white,
        selectedItemColor: const Color(0xFF1E3A8A),
        unselectedItemColor: Colors.grey,
        currentIndex: _selectedIndex,
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.assessment),
            label: 'Report',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.people),
            label: 'Community',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}

class HomeContent extends StatelessWidget {
  const HomeContent({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: const [
          CurrentLocationCard(),
          SizedBox(height: 16),
          ReportsActivityCard(),
          SizedBox(height: 16),
          RiskAssessmentCard(),
          SizedBox(height: 16),
          SafetyRecommendationsCard(),
          SizedBox(height: 16),
          SafePlacesCard(),
          SizedBox(height: 16),
          EmergencyContactCard(),
          SizedBox(height: 80), // Space for bottom navigation
        ],
      ),
    );
  }
}
