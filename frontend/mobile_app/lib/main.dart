import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

// --- Step 1: Initialize dotenv before running the app ---
Future<void> main() async {
  // Ensure that Flutter bindings are initialized
  WidgetsFlutterBinding.ensureInitialized();
  // Load the .env file
  await dotenv.load(fileName: ".env");
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    // --- Step 2: Example of how to access the variable ---
    // For an Android emulator, use 'http://10.0.2.2:8000' to connect to your PC's localhost
    // For iOS simulator or a physical device on the same Wi-Fi, use your PC's network IP address.
    final String apiBaseUrl = dotenv.env['API_BASE_URL'] ?? 'http://localhost:8000';
    
    print('API Base URL loaded from .env: $apiBaseUrl');

    return MaterialApp(
      title: 'Coastal Guardian',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('Coastal Guardian - Flutter'),
      ),
      body: const Center(
        child: Text(
          'Flutter App Initialized!',
        ),
      ),
    );
  }
}
