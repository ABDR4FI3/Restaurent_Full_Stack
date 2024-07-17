import 'food.dart'; // Assuming you have defined the Food model class separately

class Order {
  int id;
  int qte;
  Food food;

  Order({
    required this.id,
    required this.qte,
    required this.food,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'],
      qte: json['qte'],
      food: Food.fromJson(json['food']),
    );
  }
}
