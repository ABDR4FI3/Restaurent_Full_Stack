import 'dart:convert';
import 'dart:ffi';

class Food {
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

  Food({
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

  factory Food.fromJson(Map<String, dynamic> json) {
    return Food(
      id: json['id'],
      name: json['name'],
      image: json['image'],
      description: json['description'],
      rating: (json['rating'] ?? 0.0).toDouble(),
      price: (json['price'] ?? 0.0).toDouble(),
      category: Category.fromJson(json['category'] ?? {}),
      nutritionValue: NutritionValue.fromJson(json['nutritionValue'] ?? {}),
      totalCalories: json['totalCalories'] ?? 0,
      comments: (json['comments'] as List<dynamic>?)
              ?.map((comment) => Comment.fromJson(comment))
              .toList() ??
          [],
    );
  }
}

class Category {
  final int id;
  final String name;

  Category({required this.id, required this.name});

  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      id: json['id'] ?? 0,
      name: json['name'] ?? '',
    );
  }
}

class NutritionValue {
  final double fat;
  final double vitamins;
  final double carbs;
  final double protein;

  NutritionValue({
    required this.fat,
    required this.vitamins,
    required this.carbs,
    required this.protein,
  });

  factory NutritionValue.fromJson(Map<String, dynamic> json) {
    return NutritionValue(
      fat: (json['fat'] ?? 0.0).toDouble(),
      vitamins: (json['vitamins'] ?? 0.0).toDouble(),
      carbs: (json['carbs'] ?? 0.0).toDouble(),
      protein: (json['protein'] ?? 0.0).toDouble(),
    );
  }
}

class Comment {
  final int id;
  final String content;
  final User user;

  Comment({required this.id, required this.content, required this.user});

  factory Comment.fromJson(Map<String, dynamic> json) {
    return Comment(
      id: json['id'] ?? 0,
      content: json['content'] ?? '',
      user: User.fromJson(json['user'] ?? {}),
    );
  }
}

class User {
  final int id;
  final String name;
  final String address;
  final String phone;
  final String email;
  final UserRole userRole;

  User({
    required this.id,
    required this.name,
    required this.address,
    required this.phone,
    required this.email,
    required this.userRole,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] ?? 0,
      name: json['name'] ?? '',
      address: json['address'] ?? '',
      phone: json['phone'] ?? '',
      email: json['email'] ?? '',
      userRole: UserRole.fromJson(json['userRole'] ?? {}),
    );
  }
}

class UserRole {
  final int roleId;
  final String roleName;

  UserRole({required this.roleId, required this.roleName});

  factory UserRole.fromJson(Map<String, dynamic> json) {
    return UserRole(
      roleId: json['roleId'] ?? 0,
      roleName: json['roleName'] ?? '',
    );
  }
}
