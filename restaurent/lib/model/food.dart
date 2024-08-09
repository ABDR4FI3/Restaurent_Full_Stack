import 'package:restaurent/model/Carousel.dart';
import 'package:restaurent/model/Category.dart';
import 'package:restaurent/model/NutritionValue.dart';
import 'package:restaurent/model/Comment.dart';


class Food {
  final int id;
  final String name;
  final String image;
  final String description;
  final String link ;
  final double rating;
  final double price;
  final Category category;
  final NutritionValue nutritionValue;
  final int totalCalories;
  final List<Comment> comments;
  final Carousel carousel;

  Food({
    required this.id,
    required this.name,
    required this.image,
    required this.description,
    required this.rating,
    required this.price,
    required this.link,
    required this.category,
    required this.nutritionValue,
    required this.totalCalories,
    required this.carousel,
    required this.comments,
    
  });

  factory Food.fromJson(Map<String, dynamic>? json) {
    if (json == null) {
      throw ArgumentError.notNull('json');
    }

    // * Parse comments
    List<Comment> parsedComments = [];
    if (json['comments'] != null) {
      var commentsList = json['comments'] as List<dynamic>;
      parsedComments =
          commentsList.map((comment) => Comment.fromJson(comment)).toList();
    }


    return Food(
      id: json['id'] ?? 0,
      name: json['name'] ?? '',
      image: json['image'] ?? '',
      link: json['link'] ?? '',
      description: json['description'] ?? '',
      rating: (json['rating'] ?? 0.0).toDouble(),
      price: (json['price'] ?? 0.0).toDouble(),
      category: Category.fromJson(json['category'] ?? {}),
      nutritionValue: NutritionValue.fromJson(json['nutritionValue'] ?? {}),
      totalCalories: json['totalCalories'] ?? 0,
      carousel: Carousel.fromJson(json['carousel'] ?? {}),
      comments: parsedComments,
      
    );
  }
  
}
