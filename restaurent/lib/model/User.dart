import 'package:restaurent/model/UserRole.dart';

class User {
  final int id;
  final String name;
  final String address;
  final String phone;
  final String email;
  final String gender;
  final String password; 
  final UserRole userRole;
  final String image;

  User({
    required this.id,
    required this.name,
    required this.gender,
    required this.address,
    required this.phone,
    required this.email,
    required this.password, 
    required this.userRole,
    required this.image
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] ?? 0,
      name: json['name'] ?? '',
      address: json['address'] ?? '',
      phone: json['phone'] ?? '',
      gender: json['gender'] ?? '',
      email: json['email'] ?? '',
      image: json['image'] ?? '',
      password: json['password'] ??
          '', 
      userRole: UserRole.fromJson(json['userRole'] ?? {}),
    );
  }
}
