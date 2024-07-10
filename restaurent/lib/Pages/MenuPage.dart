import 'dart:math';

import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:restaurent/Components/MyButton.dart';
import 'package:restaurent/Components/food_tile.dart';
import 'package:restaurent/Pages/FoodDetails.dart';
import 'package:restaurent/model/food.dart';
import 'package:restaurent/theme/colors.dart';

class MenuPage extends StatefulWidget {
  const MenuPage({super.key});

  @override
  State<MenuPage> createState() => _MenuPageState();
}

class _MenuPageState extends State<MenuPage> {

  // * navigate to food item details
  void navigateToFoodDetails(int index) {
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) => FoodDetails(
                  food: foodMenu[index],
                )));
  }

  @override
  Widget build(BuildContext context) {
    int random_meal_id = Random().nextInt(foodMenu.length);
    return Scaffold(
      backgroundColor: const Color.fromARGB(234, 255, 255, 255),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        leading: const Icon(
          Icons.menu,
          color: Colors.black,
        ),
        title: Text(
          'A43 Sushi & Roll',
          style: GoogleFonts.aboreto(
            fontWeight: FontWeight.w800,
            color: Colors.black,
          ),
        ),
        centerTitle: true, // This will center the title
      ),
      bottomNavigationBar: CurvedNavigationBar(
        color: primaryColor,
        backgroundColor: secondaryColor,
        onTap: (index) {
          if (index == 2) {
            Navigator.pushNamed(context, '/cart');
          }
        },
        items: const [
          Icon(Icons.home, color: Colors.white),
          Icon(Icons.favorite, color: Colors.white),
          Icon(Icons.shopping_cart, color: Colors.white),
          Icon(Icons.person, color: Colors.white),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // * Search Bar
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 25.0),
              child: TextField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(
                    borderSide: BorderSide(color: primaryColor),
                    borderRadius: BorderRadius.circular(25),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: primaryColor),
                    borderRadius: BorderRadius.circular(25),
                  ),
                  hintText: "Seach your favorite food",
                ),
              ),
            ),
            // * Get a Discount Text Widget
            Container(
              decoration: BoxDecoration(
                  color: primaryColor, borderRadius: BorderRadius.circular(25)),
              margin: const EdgeInsets.all(25),
              padding: const EdgeInsets.all(25),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Expanded(
                    // Wrap Column with Expanded
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment
                          .start, // Align content to the start
                      children: [
                        Text(
                          "Get a 10% discount on your order",
                          style: GoogleFonts.spaceGrotesk(
                            fontSize: 23,
                            fontWeight: FontWeight.w600,
                            color: Colors.white,
                          ),
                        ),
                        // * Redeem Button Widget
                        MyButton(
                          text: "Redeem",
                          onTap: () {},
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            // * Menu List Text Widget
            Padding(
              // ! i use this to give left margin to the menu list
              padding: const EdgeInsets.symmetric(horizontal: 40.0),
              child: Text(
                "Food Menu ",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.grey[900],
                  fontSize: 25,
                ),
              ),
            ),

            const SizedBox(height: 10),
            // * Menu List Image Widget
            SizedBox(
              height: 365, // Add a height constraint to the Expanded widget
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: foodMenu.length,
                itemBuilder: (context, index) => FoodTile(
                  onTap: () => navigateToFoodDetails(index),
                  food: foodMenu[index], // Pass the food object
                ),
              ),
            ),
            // * Separator
            const SizedBox(
              height: 10,
            ),
            // * Popular Menu Text
            Container(
              margin: const EdgeInsets.all(10),
              padding: const EdgeInsets.all(10),
              child: Row(
                children: [
                  Text("Popular meal today",
                      style: GoogleFonts.quicksand(
                        fontSize: 25,
                        fontWeight: FontWeight.bold,
                      )),

                  const SizedBox(width: 10),
                  // *  Heart Icon
                  const Icon(
                    Icons.favorite,
                    color: Colors.red,
                    size: 40,
                  )
                ],
              ),
            ),
            // * Popular Menu Items
            Container(
                margin: const EdgeInsets.all(15),
                padding: const EdgeInsets.all(15),
                height: 200,
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 152, 158, 139),
                  borderRadius: BorderRadius.circular(25),
                ),
                child:
                    Row(mainAxisAlignment: MainAxisAlignment.start, children: [
                  // todo image :
                  // * get random id for a meal
                  Image.asset(
                    foodMenu[random_meal_id].getImage(),
                    height: 100,
                  ),
                  const SizedBox(
                    width: 50,
                  ),
                  // *  Text
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // ! Meal Name
                      Text(foodMenu[random_meal_id].getName(),
                          style: GoogleFonts.quicksand(
                            fontSize: 25,
                            fontWeight: FontWeight.bold,
                          )),
                      const SizedBox(
                        width: 50,
                      ),
                      // ! meal price
                      Text(foodMenu[random_meal_id].getPrice().toString(),
                          style: GoogleFonts.quicksand(
                            fontSize: 25,
                            fontWeight: FontWeight.bold,
                          )),
                      Icon(Icons.attach_money,
                          color: Colors.green[700], size: 30),
                    ],
                  ),
                ]))
          ],
        ),
      ),
    );
  }
}
