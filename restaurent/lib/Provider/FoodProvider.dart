import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:restaurent/model/food.dart';

class FoodProvider with ChangeNotifier {
  List<Food> _foodMenu = [];// * Original (not used outside this class)
  List<Food> _filteredFoodMenu = []; //* Filtered (used to filter the original list)


  List<Food> get foodMenu => _filteredFoodMenu;

  Future<void> fetchFoods() async {
    final response =
        await http.get(Uri.parse('https://rms-service-g7uz.onrender.com/food/all'));

    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      var foodsList = jsonData['foods'] as List;
      _foodMenu = foodsList.map((e) => Food.fromJson(e)).toList();
      _filteredFoodMenu = _foodMenu;// * init the filtered list to all
      notifyListeners();
    } else {
      throw Exception('Failed to load foods');
    }
  }
    void filterFoodsByCategory(String category) {
    if (category == 'All') {
      _filteredFoodMenu = _foodMenu;
    } else {
      _filteredFoodMenu =
          _foodMenu.where((food) => food.category.name.toLowerCase() == category.toLowerCase()).toList();
    }
    print(_filteredFoodMenu.toList());
    notifyListeners();
  }
  
}
