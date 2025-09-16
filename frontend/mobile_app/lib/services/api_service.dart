import 'dart:convert';
import 'package:http/http.dart' as http;
import '../core/constants/app_constants.dart';
import '../models/report_model.dart';
import '../models/location_model.dart';

class ApiService {
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal();

  final String _baseUrl = AppConstants.baseUrl;
  final Map<String, String> _headers = {
    'Content-Type': 'application/json',
  };

  // Get all reports
  Future<List<ReportModel>> getReports() async {
    try {
      final response = await http
          .get(
            Uri.parse('$_baseUrl/api/reports'),
            headers: _headers,
          )
          .timeout(const Duration(milliseconds: AppConstants.apiTimeout));

      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) => ReportModel.fromJson(json)).toList();
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
            Uri.parse('$_baseUrl/api/reports'),
            headers: _headers,
            body: json.encode(report.toJson()),
          )
          .timeout(const Duration(milliseconds: AppConstants.apiTimeout));

      if (response.statusCode == 201) {
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
