import 'dart:convert';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'package:restaurent/Components/MyButton.dart';
import 'package:restaurent/Components/food_tile.dart';
import 'package:restaurent/Pages/FoodDetails.dart';
import 'package:restaurent/model/food.dart';
import 'package:restaurent/theme/colors.dart';

class MenuPage extends StatefulWidget {
  const MenuPage({Key? key}) : super(key: key);

  @override
  _MenuPageState createState() => _MenuPageState();
}

class _MenuPageState extends State<MenuPage> {
  late List<Food> foodMenu = [];

  // Fetch food data from API
  Future<void> fetchFoods() async {
    final response =
        await http.get(Uri.parse('http://192.168.100.128:9090/food/all'));

    if (response.statusCode == 200) {
      var jsonData = jsonDecode(response.body);
      var foodsList = jsonData['foods'] as List;
      setState(() {
        foodMenu = foodsList.map((e) => Food.fromJson(e)).toList();
      });
    } else {
      throw Exception('Failed to load foods');
    }
  }

  @override
  void initState() {
    super.initState();
    fetchFoods();
  }

  // Navigate to food item details
  void navigateToFoodDetails(int index) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => FoodDetails(foodId: foodMenu[index].id),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    int randomMealId = foodMenu.isNotEmpty ? foodMenu.length : 0;
    return Scaffold(
      backgroundColor: lightBackground,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        leading: const Icon(
          Icons.menu,
          color: Colors.black,
        ),
        title: Text(
          'A43 Sushi & Roll',
          style: GoogleFonts.abhayaLibre(
            fontWeight: FontWeight.w800,
            color: Colors.black,
          ),
        ),
        centerTitle: true, // This will center the title
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Search Bar
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
                  hintText: "Search your favorite food",
                ),
              ),
            ),
            // Get a Discount Text Widget
            Container(
              decoration: BoxDecoration(
                color: primaryColor,
                borderRadius: BorderRadius.circular(25),
              ),
              margin: const EdgeInsets.all(25),
              padding: const EdgeInsets.all(25),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Get a 10% discount on your order",
                          style: GoogleFonts.abhayaLibre(
                            fontSize: 23,
                            fontWeight: FontWeight.w600,
                            color: Colors.white,
                          ),
                        ),
                        // Redeem Button Widget
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

            // Menu List Text Widget
            Padding(
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
            // Menu List Image Widget
            SizedBox(
              height: 365,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: foodMenu.length,
                itemBuilder: (context, index) => FoodTile(
                  onTap: () => navigateToFoodDetails(index),
                  food: foodMenu[index],
                ),
              ),
            ),
            // Separator
            const SizedBox(
              height: 10,
            ),
            // Popular Menu Text
            Container(
              margin: const EdgeInsets.all(10),
              padding: const EdgeInsets.all(10),
              child: Row(
                children: [
                  Text(
                    "Popular meal today",
                    style: GoogleFonts.abhayaLibre(
                      fontSize: 25,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(width: 10),
                  // Heart Icon
                  const Icon(
                    Icons.favorite,
                    color: Colors.red,
                    size: 40,
                  )
                ],
              ),
            ),
            // Popular Menu Items
          ],
        ),
      ),
    );
  }
}
