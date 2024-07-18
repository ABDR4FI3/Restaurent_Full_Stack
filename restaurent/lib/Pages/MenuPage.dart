import 'dart:convert';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'package:restaurent/Components/CustomDrawer.dart';
import 'package:restaurent/Components/MyButton.dart';
import 'package:restaurent/Components/food_tile.dart';
import 'package:restaurent/Pages/FoodDetails.dart';
import 'package:restaurent/model/CategoryData.dart';
import 'package:restaurent/model/food.dart';
import 'package:restaurent/theme/colors.dart';

class MenuPage extends StatefulWidget {
  const MenuPage({Key? key}) : super(key: key);

  @override
  _MenuPageState createState() => _MenuPageState();
}

class _MenuPageState extends State<MenuPage> {
  late List<Food> foodMenu = [];
  bool isVisible = true;


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

  // * Navigate to food item details
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
    return Scaffold(
      backgroundColor: lightBackground,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        leading: Builder(
          builder: (context) => IconButton(
            icon: const Icon(
              Icons.menu,
              color: Colors.black,
            ),
            onPressed: () {
              Scaffold.of(context).openDrawer();
            },
          ),
        ),
        title: Text(
          'A43 Sushi & Roll',
          style: GoogleFonts.abhayaLibre(
            fontWeight: FontWeight.w800,
            color: Colors.black,
          ),
        ),
        centerTitle: true,
      ),
      drawer:  Customdrawer(),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // *Search Bar
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
            const SizedBox(height: 20),
            // * Carousel Slider
            CarouselSlider(
              options: CarouselOptions(
                autoPlayInterval: const Duration(seconds: 2),
                autoPlayAnimationDuration: const Duration(milliseconds: 800),
                autoPlayCurve: Curves.fastOutSlowIn,
                enlargeCenterPage: true,
                enlargeFactor: 0.3,
                scrollDirection: Axis.horizontal,
                enableInfiniteScroll: true,
                height: 240.0,
                autoPlay: true,
                aspectRatio: 16 / 9,
                viewportFraction: 0.8,
              ),
              items: foodMenu.map((i) {
                return Builder(
                  builder: (BuildContext context) {
                    return Container(
                        width: MediaQuery.of(context).size.width,
                        margin: const EdgeInsets.symmetric(horizontal: 5.0),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10.0),
                          border: Border.all(color: primaryColor),
                        ),
                        child: Image(
                          image: AssetImage(
                            i.image,
                          ),
                          fit: BoxFit.cover,
                        ));
                  },
                );
              }).toList(),
            ),
            // * Menu List Text Widget
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 25),
              margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 20),
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
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 8),
              child: SizedBox(
                height: 50, // Adjust the height as needed
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: categories.length,
                  itemBuilder: (context, index) {
                    return Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 8.0),
                      child: Container(
                        width: 150, // Adjust the width as needed
                        decoration: BoxDecoration(
                          color: primaryColor, // Example color
                          borderRadius: BorderRadius.circular(15),
                        ),
                        child: Center(
                          child: Text(
                            categories[index],
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),
            const SizedBox(height: 10),
            // * Grid Menu with Image Widget
            SizedBox(
              height: 550,
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: 0,
                  crossAxisSpacing: 0,
                  childAspectRatio: 0.75,
                ),
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
                    "A gift for your first order",
                    style: GoogleFonts.montserrat(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(width: 10),
                  const Icon(
                    Icons.favorite,
                    color: Colors.red,
                    size: 40,
                  )
                ],
              ),
            ),
            Visibility(
              visible: isVisible,
              child: Container(
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
                          MyButton(
                            text: "Redeem",
                            onTap: () {
                              setState(() {
                                isVisible = false; // Update isVisible state
                              });
                            },
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
