enum ReportType {
  ripCurrent,
  strongWaves,
  marineLifeAlert,
  highTides,
  weatherAlert,
  other,
}

enum ReportStatus {
  pending,
  verified,
  rejected,
}

class ReportModel {
  final String id;
  final ReportType type;
  final String title;
  final String description;
  final String location;
  final DateTime timestamp;
  final ReportStatus status;
  final String? imageUrl;
  final String reporterId;

  ReportModel({
    required this.id,
    required this.type,
    required this.title,
    required this.description,
    required this.location,
    required this.timestamp,
    required this.status,
    this.imageUrl,
    required this.reporterId,
  });

  factory ReportModel.fromJson(Map<String, dynamic> json) {
    return ReportModel(
      id: json['id'] ?? '',
      type: ReportType.values.firstWhere(
        (e) => e.toString() == 'ReportType.${json['type']}',
        orElse: () => ReportType.other,
      ),
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      location: json['location'] ?? '',
      timestamp: DateTime.parse(json['timestamp']),
      status: ReportStatus.values.firstWhere(
        (e) => e.toString() == 'ReportStatus.${json['status']}',
        orElse: () => ReportStatus.pending,
      ),
      imageUrl: json['imageUrl'],
      reporterId: json['reporterId'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'type': type.toString().split('.').last,
      'title': title,
      'description': description,
      'location': location,
      'timestamp': timestamp.toIso8601String(),
      'status': status.toString().split('.').last,
      'imageUrl': imageUrl,
      'reporterId': reporterId,
    };
  }
}
