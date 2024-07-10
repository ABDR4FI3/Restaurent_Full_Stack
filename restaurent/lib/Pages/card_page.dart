import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:restaurent/Components/MyButton.dart';
import 'package:restaurent/model/food.dart';
import 'package:restaurent/model/shop.dart';
import 'package:restaurent/theme/colors.dart';

class CardPage extends StatefulWidget {
  const CardPage({Key? key}) : super(key: key);

  @override
  State<CardPage> createState() => _CardPageState();
}

class _CardPageState extends State<CardPage> {
  int totalePrice = 0;

  @override
  void initState() {
    super.initState();
    // Initialize total price based on current cart items
    totalePrice = calculateTotalPrice();
  }

  int calculateTotalPrice() {
    int totalPrice = 0;
    for (Food food in Provider.of<Cart>(context, listen: false).cart) {
      totalPrice += food.getPrice();
    }
    return totalPrice;
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<Cart>(
      builder: (context, value, child) => Scaffold(
        appBar: AppBar(
          backgroundColor: primaryColor,
          foregroundColor: secondaryColor,
          iconTheme: const IconThemeData(color: Colors.white),
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
            SizedBox(
              height: 640,
              child: ListView.builder(
                itemCount: value.cart.length,
                itemBuilder: (context, index) {
                  final Food food = value.cart[index];
                  final String foodname = food.getName();
                  final int foodPrice = food.getPrice();
                  return Container(
                    padding: const EdgeInsets.all(8),
                    margin: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.grey[400],
                      borderRadius: BorderRadius.circular(25),
                    ),
                    child: ListTile(
                      title: Text(
                        foodname,
                        style: GoogleFonts.quicksand(
                          fontWeight: FontWeight.bold,
                          fontSize: 23,
                        ),
                      ),
                      subtitle: Text(
                        foodPrice.toString(),
                        style: GoogleFonts.quicksand(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      trailing: IconButton(
                        icon: const Icon(Icons.delete),
                        onPressed: () {
                          removeFromCart(index); // Remove item from cart
                        },
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 20),
            // Display the total price using a MyButton widget
            MyButton(
              text: "Pay $totalePrice",
              icon: Icons.attach_money,
              onTap: () {
                // Handle payment logic here
              },
            ),
          ],
        ),
      ),
    );
  }

  void removeFromCart(int index) {
    setState(() {
      // Update total price by subtracting the removed item's price
      totalePrice -=
          Provider.of<Cart>(context, listen: false).cart[index].getPrice();
      // Remove item from the cart
      Provider.of<Cart>(context, listen: false).removeFromCart(
          Provider.of<Cart>(context, listen: false).cart[index]);
    });
  }
}
