import 'package:restaurent/model/ModelFoodDetails.dart';

class FoodWithCarousel {
  final int carouselId;
  final List<String> images;
  final List<Modelfooddetails> foods;

  FoodWithCarousel({
    required this.carouselId,
    required this.images,
    required this.foods,
  });

  factory FoodWithCarousel.fromJson(Map<String, dynamic> json) {
    var imagesFromJson = json['images'] as List<dynamic>;
    var foodsFromJson = json['foods'] as List<dynamic>;
    try {
      return FoodWithCarousel(
        carouselId: json['carouselId'],
        images: List<String>.from(imagesFromJson),
        foods: foodsFromJson
            .map((foodJson) => Modelfooddetails.fromJson(foodJson))
            .toList(),
      );
    } catch (e) {
      print(e);
    }
    return FoodWithCarousel(
      carouselId: json['carouselId'],
      images: List<String>.from(imagesFromJson),
      foods: foodsFromJson
          .map((foodJson) => Modelfooddetails.fromJson(foodJson))
          .toList(),
    );
  }
}
