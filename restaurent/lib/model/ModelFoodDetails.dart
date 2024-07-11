import 'package:restaurent/model/Category.dart';
import 'package:restaurent/model/NutritionValue.dart';
import 'package:restaurent/model/Comment.dart';

class Modelfooddetails {
  final int id;
  final String name;
  final String image;
  final String description;
  final double rating;
  final double price;
  final Category category;
  final NutritionValue nutritionValue;
  final int totalCalories;
  final List<Comment> comments;

  Modelfooddetails({
    required this.id,
    required this.name,
    required this.image,
    required this.description,
    required this.rating,
    required this.price,
    required this.category,
    required this.nutritionValue,
    required this.totalCalories,
    required this.comments,
  });

  factory Modelfooddetails.fromJson(Map<String, dynamic> json) {
    if (json == null) {
      throw ArgumentError.notNull('json');
    }

    // Parse comments
    List<Comment> parsedComments = [];
    if (json['foods']['comments'] != null) {
      var commentsList = json['foods']['comments'] as List<dynamic>;
      parsedComments =
          commentsList.map((comment) => Comment.fromJson(comment)).toList();
    }

    return Modelfooddetails(
      id: json['foods']['id'] ?? 0,
      name: json['foods']['name'] ?? '',
      image: json['foods']['image'] ?? '',
      description: json['foods']['description'] ?? '',
      rating: (json['foods']['rating'] ?? 0.0).toDouble(),
      price: (json['foods']['price'] ?? 0.0).toDouble(),
      category: Category.fromJson(json['foods']['category'] ?? {}),
      nutritionValue:
          NutritionValue.fromJson(json['foods']['nutritionValue'] ?? {}),
      totalCalories: json['foods']['totalCalories'] ?? 0,
      comments: parsedComments,
    );
  }
}
