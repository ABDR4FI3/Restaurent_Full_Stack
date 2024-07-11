import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:restaurent/Components/MyButton.dart';
import 'package:restaurent/model/food.dart';
import 'package:restaurent/model/shop.dart';
import 'package:restaurent/theme/colors.dart';
import 'package:http/http.dart' as http;

class CardPage extends StatefulWidget {
  const CardPage({Key? key}) : super(key: key);

  @override
  State<CardPage> createState() => _CardPageState();
}

class _CardPageState extends State<CardPage> {
  List<Food> cartItems = [];
  int totalPrice = 0;

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
          double totalPrice = 0.0;
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

  void removeFromCart(int index) {
    setState(() {
      cartItems.removeAt(index);
      totalPrice = calculateTotalPrice();
    });
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
                  margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
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
                      icon: Icon(Icons.delete),
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
