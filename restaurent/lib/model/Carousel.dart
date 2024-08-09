

class Carousel {
  final int carouselId;
  final List<String> images;
  final List<String> links;

  Carousel(
      {required this.carouselId, required this.images, required this.links});

  factory Carousel.fromJson(Map<String, dynamic> json) {
    var imagesList = json['images'] as List;
    List<String> imageList = imagesList.map((i) => i.toString()).toList();
    var linksList = json['links'] as List;
    List<String> links = linksList.map((i) => i.toString()).toList();


    return Carousel(
      carouselId: json['carouselId'],
      images: imageList,
      links: links,
    );
  }
}
