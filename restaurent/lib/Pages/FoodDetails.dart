import 'dart:convert';
import 'dart:ffi';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:restaurent/Components/MyButton.dart';
import 'package:restaurent/Components/radialbar.dart';
import 'package:restaurent/Config/IPadress.dart';
import 'package:restaurent/model/FoodWithCarousel.dart';
import 'package:restaurent/model/ModelFoodDetails.dart';
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
  late Future<FoodWithCarousel> futureFood;
  int quantity = 0;

  @override
  void initState() {
    super.initState();
    futureFood = fetchFood(widget.foodId);
  }

  Future<FoodWithCarousel> fetchFood(int foodId) async {
    final response = await http
        .get(Uri.parse('http://192.168.100.128:9090/food/detailed/$foodId'));

    if (response.statusCode == 200) {
      print('Response Body: ${response.body}');
      final Map<String, dynamic> jsonResponse = jsonDecode(response.body);
      final foodJson = jsonResponse['food']
          [0]; // Adjusted to access the first element of the food array
      final foodWithCarousel = FoodWithCarousel.fromJson(foodJson);
      return foodWithCarousel;
    } else {
      print('Failed to load food. Status Code: ${response.statusCode}');
      throw Exception('Failed to load food ${response.body}');
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

  Future<void> addToCart(Modelfooddetails food, int userId) async {
    final String url = 'http://$IpAdress/cart/add'; //
    final String apiUrl =
        'http://192.168.100.128:9090/cart/add?foodId=${food.id}&userId=2';

    print("my parameters, foodId: ${food.id} , userId: $userId");

    try {
      final response = await http.post(
        Uri.parse(
            'http://$IpAdress/cart/add?foodId=${food.id}&userId=${userId}'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      if (response.statusCode == 200) {
        print("Added to cart successfully. \n ${response.body}}");
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("Added to cart successfully."),
            backgroundColor: Colors.green,
          ),
        );
      } else if (response.statusCode == 400) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text("Already in Cart ."),
            backgroundColor: Colors.redAccent,
          ),
        );
      } else {
        print("Failed to add to cart: ${response.body}");
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text("Failed to add to cart: ${response.body}"),
            backgroundColor: const Color.fromARGB(255, 62, 100, 206),
          ),
        );
      }
    } catch (e) {
      print("Error: $e");
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Error: $e"),
          backgroundColor: const Color.fromARGB(255, 62, 100, 206),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<FoodWithCarousel>(
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

  Widget _buildFoodDetails(FoodWithCarousel food) {
    print("food: ${food.foods[0].name}");
    return Scaffold(
      appBar: AppBar(
        backgroundColor: primaryColor,
        foregroundColor: secondaryColor,
        iconTheme: const IconThemeData(color: Colors.white),
        title: Text(
          food.foods[0].name,
          style: GoogleFonts.quicksand(
              color: Colors.white, fontWeight: FontWeight.bold),
        ),
      ),
      body: SingleChildScrollView(
        child: Container(
          margin: const EdgeInsets.only(top: 50),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // *  image logo
              Image.asset(
                food.foods[0].image,
                height: 300,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // * Meal Name
                    Text(
                      food.foods[0].name,
                      style: const TextStyle(
                          fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    //* seperator
                    const SizedBox(height: 8),
                    Text(
                      food.foods[0].description,
                      style: const TextStyle(fontSize: 18),
                    ),
                    //* seperator
                    const SizedBox(height: 16),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        //* meal description
                        Container(
                          margin: const EdgeInsets.only(top: 10),
                          padding: const EdgeInsets.symmetric(horizontal: 20),
                          child: Text(
                            'Price: \$${food.foods[0].price.toString()}',
                            style: GoogleFonts.quicksand(
                              color: Colors.grey[800],
                              fontSize: 20,
                            ),
                          ),
                        ),
                        //* Title for Carousel
                        Container(
                          height: 260,
                          margin: const EdgeInsets.all(2),
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(25),
                              border: Border.all(
                                color: primaryColor,
                                width: 2,
                              )),
                          child: ListView.builder(
                            scrollDirection: Axis.horizontal,
                            itemCount: food.images.length,
                            itemBuilder: (context, index) {
                              return Container(
                                margin: const EdgeInsets.all(10),
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(20),
                                  child: Image.asset(
                                    fit: BoxFit.cover,
                                    food.images[index],
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                        //* seperator
                        const SizedBox(
                          height: 30,
                        ),
                        // * Text Nutrition Title
                        Text(
                          "Nutrition Value (grams)",
                          style: GoogleFonts.quicksand(
                              fontSize: 25,
                              color: Colors.grey[800],
                              fontWeight: FontWeight.w600),
                        ),
                        RadialBar(
                          fat: food.foods[0].nutritionValue.fat,
                          protein: food.foods[0].nutritionValue.protein,
                          vitamins: food.foods[0].nutritionValue.vitamins,
                          carbohydrates: food.foods[0].nutritionValue.carbs,
                        ),
                        // * seperator
                        const SizedBox(
                          height: 30,
                        ),

                        Container(
                          //width: 200,
                          margin: const EdgeInsets.all(10),
                          padding: const EdgeInsets.all(10),
                          height: 130,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(25),
                            color: primaryColor,
                            boxShadow: [
                              BoxShadow(
                                color: Colors.grey.withOpacity(0.5),
                                spreadRadius: 15,
                                blurRadius: 10,
                                offset: const Offset(0, 3),
                              ),
                            ],
                          ),
                          child: Column(
                            children: [
                              // * Price and Quantity
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  // * Left section with price and currency icon
                                  Row(
                                    children: [
                                      Text(
                                        food.foods[0].price.toString(),
                                        style: GoogleFonts.quicksand(
                                          color: Colors.white,
                                          fontSize: 25,
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                      const SizedBox(
                                          width:
                                              5), // Adjust spacing between price and icon if needed
                                      const Icon(
                                        Icons.attach_money,
                                        color: lightGreen,
                                        size: 30,
                                      ),
                                    ],
                                  ),
                                  // * Right section with buttons and quantity
                                  /*
                                  Row(
                                    children: [
                                      // * Remove Button
                                      Container(
                                        decoration: BoxDecoration(
                                          color: secondaryColor,
                                          shape: BoxShape.circle,
                                        ),
                                        child: IconButton(
                                          icon: const Icon(
                                            Icons.remove,
                                            color: Colors.white,
                                          ),
                                          onPressed: decrementQuantity,
                                        ),
                                      ),
                                      // * Quantity Text
                                      Container(
                                        margin: const EdgeInsets.symmetric(
                                            horizontal: 10),
                                        child: Text(
                                          quantity.toString(),
                                          style: const TextStyle(
                                            color: Colors.white,
                                            fontSize: 18,
                                          ),
                                        ),
                                      ),
                                      // * Add Button
                                      Container(
                                        decoration: BoxDecoration(
                                          color: secondaryColor,
                                          shape: BoxShape.circle,
                                        ),
                                        child: IconButton(
                                          icon: const Icon(
                                            Icons.add,
                                            color: Colors.white,
                                          ),
                                          onPressed: incrementQuantity,
                                        ),
                                      ),
                                    ],
                                  ),
                                  */
                                ],
                              ),
                              // * Add to Cart Button
                              MyButton(
                                height: 35,
                                width: double.infinity,
                                icon: Icons.shopping_cart,
                                iconSize: 30,
                                padding:
                                    const EdgeInsets.symmetric(horizontal: 15),
                                boxColor: thirdColor,
                                text: "Add to Cart",
                                fontSize: 15,
                                contentColor: Colors.white,
                                onTap: () => addToCart(food.foods[0], 2),
                              ),
                            ],
                          ),
                        )
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
