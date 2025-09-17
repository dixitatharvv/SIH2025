import 'dart:convert';
import 'package:http/http.dart' as http;
import '../core/constants/app_constants.dart';
import '../models/report_model.dart';
import '../models/location_model.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal();

  final String _baseUrl = AppConstants.baseUrl;
  Future<Map<String, String>> _headers() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('auth_token');
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  // Get all reports
  Future<List<ReportModel>> getReports() async {
    try {
      final response = await http
          .get(
            Uri.parse('$_baseUrl/api/reports/hotspots'),
            headers: await _headers(),
          )
          .timeout(const Duration(milliseconds: AppConstants.apiTimeout));

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(response.body);
        final List<dynamic> items = data['items'] ?? [];
        // Reuse ReportModel minimally: map hotspot to a report-like model
        return items.map((h) => ReportModel.fromJson({
          'id': h['report_id'],
          'latitude': h['latitude'],
          'longitude': h['longitude'],
          'confidence': h['confidence'],
          'status': h['status'],
          'hazardType': h['hazard_type'],
          'createdAt': h['created_at'],
        })).toList();
      } else {
        throw Exception('Failed to load reports');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  // Create a new report
  Future<ReportModel> createReport(ReportModel report) async {
    try {
      final response = await http
          .post(
            Uri.parse('$_baseUrl/api/reports/submit'),
            headers: await _headers(),
            body: json.encode(report.toJson()),
          )
          .timeout(const Duration(milliseconds: AppConstants.apiTimeout));

      if (response.statusCode == 202 || response.statusCode == 201) {
        return ReportModel.fromJson(json.decode(response.body));
      } else {
        throw Exception('Failed to create report');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  // Get current location data
  Future<LocationModel> getCurrentLocation() async {
    try {
      final response = await http
          .get(
            Uri.parse('$_baseUrl/api/location/current'),
            headers: _headers,
          )
          .timeout(const Duration(milliseconds: AppConstants.apiTimeout));

      if (response.statusCode == 200) {
        return LocationModel.fromJson(json.decode(response.body));
      } else {
        throw Exception('Failed to load location');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  // Get risk assessment
  Future<Map<String, dynamic>> getRiskAssessment() async {
    try {
      final response = await http
          .get(
            Uri.parse('$_baseUrl/api/risk-assessment'),
            headers: _headers,
          )
          .timeout(const Duration(milliseconds: AppConstants.apiTimeout));

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        throw Exception('Failed to load risk assessment');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }
}
