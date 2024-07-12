import 'package:restaurent/model/food.dart';

class Carousel {
  final int carouselId;
  final List<String> images;
  final List<Food> foods;

  Carousel(
      {required this.carouselId, required this.images, required this.foods});

  factory Carousel.fromJson(Map<String, dynamic> json) {
    var imagesList = json['images'] as List;
    List<String> imageList = imagesList.map((i) => i.toString()).toList();

    var foodsList = json['foods'] as List;
    List<Food> foodList = foodsList.map((i) => Food.fromJson(i)).toList();

    return Carousel(
      carouselId: json['carouselId'],
      images: imageList,
      foods: foodList,
    );
  }
}
