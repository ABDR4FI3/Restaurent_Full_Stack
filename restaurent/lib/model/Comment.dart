import 'package:restaurent/model/User.dart';

class Comment {
  final int id;
  final String content;
  final User user;

  Comment({
    required this.id,
    required this.content,
    required this.user,
  });

  factory Comment.fromJson(Map<String, dynamic> json) {
    if (json['id'] == null) {
      throw Exception("Missing required field 'id'");
    }
    if (json['content'] == null) {
      throw Exception("Missing required field 'content'");
    }
    if (json['user'] == null) {
      throw Exception("Missing required field 'user'");
    }
    return Comment(
      id: json['id'] ?? 0,
      content: json['content'] ?? '',
      user: User.fromJson(json['user'] ?? {}),
    );
  }
}
