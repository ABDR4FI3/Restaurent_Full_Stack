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
    return Comment(
      id: json['id'] ?? 0,
      content: json['content'] ?? '',
      user: User.fromJson(json['user'] ?? {}),
    );
  }
}
