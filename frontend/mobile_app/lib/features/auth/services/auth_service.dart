import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../../../core/constants/app_constants.dart';
import '../models/user_model.dart';

class AuthService {
  static const String _tokenKey = 'auth_token';
  static const String _userKey = 'user_data';

  // Singleton pattern
  static final AuthService _instance = AuthService._internal();
  factory AuthService() => _instance;
  AuthService._internal();

  // Check if user is logged in
  Future<bool> isLoggedIn() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString(_tokenKey);
    return token != null && token.isNotEmpty;
  }

  // Get stored user data
  Future<UserModel?> getCurrentUser() async {
    final prefs = await SharedPreferences.getInstance();
    final userData = prefs.getString(_userKey);
    if (userData != null) {
      return UserModel.fromJson(json.decode(userData));
    }
    return null;
  }

  // Login user
  Future<UserModel> login({
    required String email,
    required String password,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('${AppConstants.baseUrl}/api/auth/login'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: json.encode({
          'email': email,
          'password': password,
        }),
      ).timeout(
        const Duration(milliseconds: AppConstants.apiTimeout),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final user = UserModel.fromJson(data['user']);
        final token = data['token'];

        // Store token and user data
        await _storeAuthData(token, user);
        
        return user;
      } else {
        final errorData = json.decode(response.body);
        throw Exception(errorData['message'] ?? 'Login failed');
      }
    } catch (e) {
      if (e.toString().contains('TimeoutException')) {
        throw Exception('Connection timeout. Please check your internet connection.');
      }
      throw Exception('Login failed: ${e.toString()}');
    }
  }

  // Register user
  Future<UserModel> register({
    required String email,
    required String username,
    required String password,
    required String role,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('${AppConstants.baseUrl}/api/auth/register'),
        headers: {
          'Content-Type': 'application/json',
        },
        body: json.encode({
          'email': email,
          'username': username,
          'password': password,
          'role': role.toLowerCase(),
        }),
      ).timeout(
        const Duration(milliseconds: AppConstants.apiTimeout),
      );

      if (response.statusCode == 201) {
        final data = json.decode(response.body);
        final user = UserModel.fromJson(data['user']);
        final token = data['token'];

        // Store token and user data
        await _storeAuthData(token, user);
        
        return user;
      } else {
        final errorData = json.decode(response.body);
        throw Exception(errorData['message'] ?? 'Registration failed');
      }
    } catch (e) {
      if (e.toString().contains('TimeoutException')) {
        throw Exception('Connection timeout. Please check your internet connection.');
      }
      throw Exception('Registration failed: ${e.toString()}');
    }
  }

  // Logout user
  Future<void> logout() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString(_tokenKey);

      if (token != null) {
        // Call logout endpoint
        await http.post(
          Uri.parse('${AppConstants.baseUrl}/api/auth/logout'),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer $token',
          },
        ).timeout(
          const Duration(milliseconds: AppConstants.apiTimeout),
        );
      }
    } catch (e) {
      // Continue with local logout even if API call fails
      print('Logout API call failed: $e');
    } finally {
      // Clear local storage
      await _clearAuthData();
    }
  }

  // Refresh token
  Future<String?> refreshToken() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final currentToken = prefs.getString(_tokenKey);

      if (currentToken == null) return null;

      final response = await http.post(
        Uri.parse('${AppConstants.baseUrl}/api/auth/refresh'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $currentToken',
        },
      ).timeout(
        const Duration(milliseconds: AppConstants.apiTimeout),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final newToken = data['token'];
        
        // Update stored token
        await prefs.setString(_tokenKey, newToken);
        
        return newToken;
      } else {
        // Token refresh failed, logout user
        await logout();
        return null;
      }
    } catch (e) {
      print('Token refresh failed: $e');
      await logout();
      return null;
    }
  }

  // Get auth token for API calls
  Future<String?> getAuthToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_tokenKey);
  }

  // Store authentication data
  Future<void> _storeAuthData(String token, UserModel user) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, token);
    await prefs.setString(_userKey, json.encode(user.toJson()));
  }

  // Clear authentication data
  Future<void> _clearAuthData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
    await prefs.remove(_userKey);
  }

  // Validate email format
  bool isValidEmail(String email) {
    return RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(email);
  }

  // Validate password strength
  bool isValidPassword(String password) {
    // At least 8 characters, contains uppercase, lowercase, number
    return password.length >= 8 &&
           RegExp(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)').hasMatch(password);
  }
}
