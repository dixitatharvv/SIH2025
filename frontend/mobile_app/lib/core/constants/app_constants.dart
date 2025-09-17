class AppConstants {
  // App Information
  static const String appName = 'Pravah';
  static const String appVersion = '1.0.0';

  // API Configuration
  // For Android emulator, use 'http://10.0.2.2:8000' to connect to your PC's localhost
  // For iOS simulator or physical device, use your PC's network IP address
  static const String baseUrl = 'http://10.0.2.2:8000'; // Android emulator
  // static const String baseUrl = 'http://YOUR_PC_IP:8000'; // Physical device
  static const int apiTimeout = 30000; // 30 seconds

  // UI Constants
  static const double defaultPadding = 16.0;
  static const double cardRadius = 12.0;
  static const double buttonRadius = 8.0;

  // Colors
  static const int primaryColor = 0xFF1E3A8A;
  static const int backgroundColor = 0xFF0F172A;
  static const int cardColor = 0xFFF8FAFC;

  // Emergency
  static const String emergencyNumber = '112';

  // Map Configuration
  static const double defaultLatitude = 20.2961; // Odisha coordinates
  static const double defaultLongitude = 85.8245;
  static const double defaultZoom = 12.0;
}
