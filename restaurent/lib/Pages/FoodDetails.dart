import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:restaurent/Components/MyButton.dart';
import 'package:restaurent/Components/radialbar.dart';
import 'package:restaurent/model/food.dart';
import 'package:restaurent/model/shop.dart';
import 'package:restaurent/theme/colors.dart';
import 'package:http/http.dart' as http;

class FoodDetails extends StatefulWidget {
  final int foodId;

  const FoodDetails({Key? key, required this.foodId}) : super(key: key);

  @override
  State<FoodDetails> createState() => _FoodDetailsState();
}

class _FoodDetailsState extends State<FoodDetails> {
  late Future<Food> futureFood;
  int quantity = 0;

  @override
  void initState() {
    super.initState();
    futureFood = fetchFood(widget.foodId);
    print(widget.foodId);
  }

  Future<Food> fetchFood(int foodId) async {
    final response =
        await http.get(Uri.parse('http://192.168.100.128/food/$foodId'));

    if (response.statusCode == 200) {
      return Food.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to load food');
    }
  }

  void incrementQuantity() {
    setState(() {
      quantity++;
    });
  }

  void decrementQuantity() {
    if (quantity > 0) {
      setState(() {
        quantity--;
      });
    }
  }

  addToCart(Food food) {
    if (quantity <= 0) {
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          backgroundColor: Colors.blueGrey, // Example color, adjust as needed
          content: const Text(
            "Please select quantity",
            style: TextStyle(
              color: Colors.white,
              fontSize: 18,
            ),
          ),
        ),
      );
    } else {
      // Add your cart functionality here, for example:
      // final Cart cart = context.read<Cart>();
      // cart.addToCart(food, quantity);
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          backgroundColor: Colors.blueGrey, // Example color, adjust as needed
          content: const Text(
            "Successfully added to cart",
            style: TextStyle(
              color: Colors.white,
              fontSize: 18,
            ),
          ),
          actions: [
            IconButton(
              onPressed: () {
                Navigator.pop(context);
                Navigator.pop(
                    context); // Assuming you want to pop back twice to dismiss both dialogs
              },
              icon: const Icon(
                Icons.done,
                color: Colors.white,
              ),
            ),
          ],
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Food>(
      future: futureFood,
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return _buildFoodDetails(snapshot.data!);
        } else if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        }
        return Center(child: CircularProgressIndicator());
      },
    );
  }

  Widget _buildFoodDetails(Food food) {
    return Scaffold(
      appBar: AppBar(
        title: Text(food.name),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Image.asset(
              food.image,
              height: 300,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    food.name,
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 8),
                  Text(
                    food.description,
                    style: TextStyle(fontSize: 18),
                  ),
                  SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Price: \$${food.price.toString()}',
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      Row(
                        children: [
                          IconButton(
                            onPressed: decrementQuantity,
                            icon: Icon(Icons.remove),
                          ),
                          Text(quantity.toString(),
                              style: TextStyle(fontSize: 18)),
                          IconButton(
                            onPressed: incrementQuantity,
                            icon: Icon(Icons.add),
                          ),
                        ],
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () => addToCart(food),
                    child: Text('Add to Cart'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
