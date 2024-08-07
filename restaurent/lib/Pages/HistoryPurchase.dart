import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:google_fonts/google_fonts.dart';
import 'package:restaurent/Config/IPadress.dart';
import 'package:restaurent/model/OrderResponse.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Historypurchase extends StatefulWidget {
  const Historypurchase({Key? key}) : super(key: key);

  @override
  State<Historypurchase> createState() => _HistorypurchaseState();
}

class _HistorypurchaseState extends State<Historypurchase> {
  late List<Order> orders = [];

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

    final url = Uri.parse('http://$IpAdress/cart/paid?token=$token');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final jsonResponse = json.decode(response.body);
      List<Order> fetchedOrders = [];

      for (var order in jsonResponse['orders']) {
        fetchedOrders.add(Order.fromJson(order));
      }

      setState(() {
        orders = fetchedOrders;
      });
    } else if (response.statusCode == 201) {
      List<Order> fetchedOrders = [];

      setState(() {
        orders = fetchedOrders;
      });
    } else {
      final myresponse = response.body;
      throw Exception('Failed to load orders $myresponse');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'History Purchase',
          style: GoogleFonts.abhayaLibre(
            fontWeight: FontWeight.w800,
            color: Colors.white,
          ),
        ),
        iconTheme: const IconThemeData(color: Colors.white),
        backgroundColor: Colors.blueAccent,
        centerTitle: true,
      ),
      body: orders == null
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: orders.length,
              itemBuilder: (context, index) {
                final order = orders[index];
                return ListTile(
                    title: Text(order.food.name),
                    subtitle: Text('Quantity: ${order.qte}'),
                    trailing: Column(
                      children: [
                        Text('Qte: ${order.qte}'),
                        Text('price: ${order.food.price}'),
                        Text('Total: ${order.food.price * order.qte}'),
                      ],
                    ));
              },
            ),
    );
  }
}
