import 'package:restaurent/model/ModelFoodDetails.dart';

class FoodWithCarousel {
  final int carouselId;
  final List<String> images;
  final List<String> links;
  final List<Modelfooddetails> foods;

  FoodWithCarousel({
    required this.carouselId,
    required this.images,
    required this.foods,
    required this.links,
  });

  factory FoodWithCarousel.fromJson(Map<String, dynamic> json) {
    // Get the nested 'food' object
    var foodJson = json['food'] as Map<String, dynamic>;
    var imagesFromJson = foodJson['images'] as List<dynamic>;
    var linksFromJson = foodJson['links'] as List<dynamic>;
    var foodsFromJson = foodJson['foods'] as List<dynamic>;

    return FoodWithCarousel(
      carouselId: foodJson['carouselId'],
      images: List<String>.from(imagesFromJson),
      links: List<String>.from(linksFromJson),
      foods: foodsFromJson
          .map((foodJson) => Modelfooddetails.fromJson(foodJson))
          .toList(),
    );
  }
}
