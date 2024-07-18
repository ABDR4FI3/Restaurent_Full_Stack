import 'package:restaurent/model/User.dart';

class UserWithDetails {
  final User user;
  final int count;
  final double total;

  UserWithDetails({
    required this.user,
    required this.count,
    required this.total,
  });

  factory UserWithDetails.fromJson(Map<String, dynamic> json) {
    return UserWithDetails(
      user: User.fromJson(json['user']),
      count: json['count'],
      total: json['totale'],
    );
  }
}
