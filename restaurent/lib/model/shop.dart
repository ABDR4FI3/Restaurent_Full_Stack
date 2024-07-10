import 'package:flutter/cupertino.dart';
import 'package:restaurent/model/food.dart';



// * Cart Class

class Cart extends ChangeNotifier {

  List<Food> _cart = [];
  List<Food> get cart => _cart;
  // * methodes 
  void addToCart(Food food, int quantity) {
    for (var i = 0; i < quantity; i++) {
      _cart.add(food);
    }
    notifyListeners();
  }
  // ! remove from cart
  void removeFromCart(Food food) {
    _cart.remove(food);
    notifyListeners();
  }
}
