import 'dart:convert';

import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'package:restaurent/Components/MyButton.dart';
import 'package:restaurent/model/food.dart';
import 'package:restaurent/theme/colors.dart';

class CardPage extends StatefulWidget {
  const CardPage({Key? key}) : super(key: key);

  @override
  State<CardPage> createState() => _CardPageState();
}

class _CardPageState extends State<CardPage> {
  List<Food> cartItems = [];
  int totalPrice = 0;
  int _selectedIndex = 2; // Set the initial selected index

  @override
  void initState() {
    super.initState();
    fetchCartItems();
  }

  Future<void> fetchCartItems() async {
    final url = Uri.parse('http://192.168.100.128:9090/cart/all?userId=2');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      // Parse JSON response
      final jsonData = jsonDecode(response.body);

      if (jsonData['items'] != null && jsonData['items'] is List) {
        final List<dynamic> items = jsonData['items'];

        setState(() {
          cartItems = items.map((item) => Food.fromJson(item)).toList();
          totalPrice = calculateTotalPrice();
        });
      } else {
        setState(() {
          cartItems = [];
          totalPrice = 0;
        });
      }
    } else {
      throw Exception('Failed to load cart items: ${response.body}');
    }
  }

  int calculateTotalPrice() {
    int total = 0;
    for (var item in cartItems) {
      total += item.price.toInt();
    }
    return total;
  }

  Future<void> removeFromCart(int index) async {
    if (index < 0 || index >= cartItems.length) {
      throw Exception('Index out of bounds');
    }
    int foodId = cartItems[index].id;
    final url = Uri.parse('http://192.168.100.128:9090/cart/remove');
    final response = await http.post(
      url,
      body: {
        'userId': '2', // userId as string
        'foodId': foodId.toString(), // Convert foodId to string
      },
    );
    if (response.statusCode == 200) {
      // Remove item from cartItems list
      setState(() {
        cartItems.removeAt(index);
        totalPrice = calculateTotalPrice();
      });
    } else {
      throw Exception('Failed to remove item from cart: ${response.body}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: primaryColor,
        title: Text(
          "Cart",
          style: GoogleFonts.quicksand(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: cartItems.length,
              itemBuilder: (context, index) {
                final Food food = cartItems[index];
                return Card(
                  margin:
                      const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                  child: ListTile(
                    leading: Image.asset(
                      food.image,
                      width: 80,
                      height: 80,
                      fit: BoxFit.cover,
                    ),
                    title: Text(food.name),
                    subtitle: Text('Price: \$${food.price.toString()}'),
                    trailing: IconButton(
                      icon: const Icon(Icons.delete),
                      onPressed: () => removeFromCart(index),
                    ),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: MyButton(
              text: "Pay ${totalPrice.toString()}",
              onTap: () {
                // Handle payment logic
                // This is where you would typically navigate to a payment screen
                // or execute payment operations.
              },
            ),
          ),
        ],
      ),
    );
  }
}
