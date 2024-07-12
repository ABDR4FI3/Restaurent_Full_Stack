import 'package:restaurent/model/UserRole.dart';

class User {
  final int id;
  final String name;
  final String address;
  final String phone;
  final String email;
  final String password; // Added password field
  final UserRole userRole;

  User({
    required this.id,
    required this.name,
    required this.address,
    required this.phone,
    required this.email,
    required this.password, // Include password in constructor
    required this.userRole,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] ?? 0,
      name: json['name'] ?? '',
      address: json['address'] ?? '',
      phone: json['phone'] ?? '',
      email: json['email'] ?? '',
      password: json['password'] ??
          '', 
      userRole: UserRole.fromJson(json['userRole'] ?? {}),
    );
  }
}
