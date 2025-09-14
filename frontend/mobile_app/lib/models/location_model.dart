class LocationModel {
  final double latitude;
  final double longitude;
  final String address;
  final String city;
  final String state;

  LocationModel({
    required this.latitude,
    required this.longitude,
    required this.address,
    required this.city,
    required this.state,
  });

  factory LocationModel.fromJson(Map<String, dynamic> json) {
    return LocationModel(
      latitude: json['latitude']?.toDouble() ?? 0.0,
      longitude: json['longitude']?.toDouble() ?? 0.0,
      address: json['address'] ?? '',
      city: json['city'] ?? '',
      state: json['state'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'latitude': latitude,
      'longitude': longitude,
      'address': address,
      'city': city,
      'state': state,
    };
  }
}
