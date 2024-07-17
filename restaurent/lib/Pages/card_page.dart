import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'package:restaurent/Components/MyButton.dart';
import 'package:restaurent/Config/IPadress.dart';
import 'package:restaurent/model/OrderResponse.dart';
import 'package:restaurent/theme/colors.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CardPage extends StatefulWidget {
  const CardPage({Key? key}) : super(key: key);

  @override
  State<CardPage> createState() => _CardPageState();
}

class _CardPageState extends State<CardPage> {
  List<Order> orders = [];
  int totalPrice = 0;

  @override
  void initState() {
    super.initState();
    fetchOrders();
  }

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('token');
  }

  Future<void> fetchOrders() async {
    final token = await getToken();
    final url = Uri.parse('http://$IpAdress/order/all?token=$token');

    try {
      final response = await http.get(url);

      if (response.statusCode == 200) {
        // Parse JSON response
        final jsonData = jsonDecode(response.body);

        if (jsonData['orders'] != null && jsonData['orders'] is List) {
          final List<dynamic> ordersList = jsonData['orders'];

          setState(() {
            orders = ordersList.map((order) => Order.fromJson(order)).toList();
            totalPrice = calculateTotalPrice();
          });
        } else {
          setState(() {
            orders = [];
            totalPrice = 0;
          });
        }
      } else {
        throw Exception('Failed to load orders: ${response.body}');
      }
    } catch (e) {
      print('Error fetching orders: $e');
    }
  }

  int calculateTotalPrice() {
    int total = 0;
    for (var order in orders) {
      total += order.food.price.toInt() *
          order.qte; // Assuming qte represents quantity
    }
    return total;
  }

  Future<void> removeFromCart(int orderId) async {
    final token = await getToken();
    final url =
        Uri.parse('http://$IpAdress/cart/remove?token=$token&orderId=$orderId');

    try {
      final response = await http.post(url);

      if (response.statusCode == 200) {
        fetchOrders();
      } else {
        throw Exception('Failed to remove order: ${response.body}');
      }
    } catch (e) {
      print('Error removing order: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: lightBackground,
      appBar: AppBar(
        backgroundColor: primaryColor,
        title: Text(
          "Orders",
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
              itemCount: orders.length,
              itemBuilder: (context, index) {
                final Order order = orders[index];
                return Card(
                  margin:
                      const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                  child: ListTile(
                    leading: Image.asset(
                      order.food.image,
                      width: 80,
                      height: 80,
                      fit: BoxFit.cover,
                    ),
                    title: Text(order.food.name),
                    subtitle: Text('Quantity: ${order.qte}'),
                    trailing: IconButton(
                      icon: Icon(Icons.delete),
                      onPressed: () =>
                          removeFromCart(order.id), // Pass order id to remove
                    ),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: MyButton(
              boxColor: Colors.black,
              text: "Total Price: ${totalPrice.toString()}",
              onTap: () {
                // todo Handle payment logic
              },
            ),
          ),
        ],
      ),
    );
  }
}
