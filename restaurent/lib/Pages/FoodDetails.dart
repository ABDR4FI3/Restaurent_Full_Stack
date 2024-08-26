import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:restaurent/Components/MyButton.dart';
import 'package:restaurent/Components/radialbar.dart';
import 'package:restaurent/Config/IPadress.dart';
import 'package:restaurent/model/food.dart';
import 'package:restaurent/theme/colors.dart';
import 'package:http/http.dart' as http;
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shared_preferences/shared_preferences.dart'; 

class FoodDetails extends StatefulWidget {
  final int foodId;

  const FoodDetails({Key? key, required this.foodId}) : super(key: key);

  @override
  State<FoodDetails> createState() => _FoodDetailsState();
}

class _FoodDetailsState extends State<FoodDetails> {
  late Future<Food> futureFood;
  int quantity = 1;

  @override
  void initState() {
    super.initState();
    futureFood = fetchFood(widget.foodId);
  }

  Future<Food> fetchFood(int foodId) async {
    try{
    final response = await http
        .get(Uri.parse('https://rms-service-g7uz.onrender.com/food/$foodId'));

    if (response.statusCode == 200) {
      print('Response Body: ${response.body}');
      final Map<String, dynamic> jsonResponse = jsonDecode(response.body);
      print("body Json : $jsonResponse");
      final foodJson = jsonResponse['foods'];
      print("my dataaaaaaaaaa \n" +Food.fromJson(foodJson).toString());
      return Food.fromJson(foodJson);
    } else {
      print('Failed to load food. Status Code: ${response.statusCode}');
      throw Exception('Failed to load food ${response.body}');
    }
    }catch(e){
      print(e.toString());
      return Future.error(e);
    }

  }

  void incrementQuantity() {
    setState(() {
      quantity++;
    });
  }

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('token');
  }

  void decrementQuantity() {
    if (quantity > 1) {
      setState(() {
        quantity--;
      });
    }
  }
  

  Future<void> addToCart(Food food, String token, int qte) async {
    final String apiUrl = '$IpAdress/order/make';

    print("my parameters, foodId: ${food.id}, token: $token, qte: $qte");

    final makeOrderDTO = {
      'token': token,
      'foodId': food.id,
      'qte': qte,
    };

    try {
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(makeOrderDTO),
      );

      if (response.statusCode == 200) {
        print("Order placed successfully. \n ${response.body}}");
        Fluttertoast.showToast(
          msg: "Order placed successfully.",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.green,
          textColor: Colors.white,
          fontSize: 16.0,
        );
      } else {
        print("Failed to place order: ${response.body}");
        Fluttertoast.showToast(
          msg: "Failed to place order: ${response.body}",
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          timeInSecForIosWeb: 1,
          backgroundColor: Colors.red,
          textColor: Colors.white,
          fontSize: 16.0,
        );
      }
    } catch (e) {
      print("Error: $e");
      Fluttertoast.showToast(
        msg: "Error: $e",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        timeInSecForIosWeb: 1,
        backgroundColor: Colors.blue,
        textColor: Colors.white,
        fontSize: 16.0,
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
    print("my food item " + food.nutritionValue.carbs.toString());
    print("food: ${food.name}");
    return Scaffold(
      appBar: AppBar(
        backgroundColor: primaryColor,
        foregroundColor: secondaryColor,
        iconTheme: const IconThemeData(color: Colors.white),
        title: Text(
          food.name,
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
                food.image,
                height: 400,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // * Meal Name
                    Center(
                      child: Text(
                        food.name,
                        style: GoogleFonts.montserrat(
                          fontSize: 34,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 5
                        )
                      ),
                    ),
                    //* seperator
                    const SizedBox(height: 8),
                    Text(
                      food.description,
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
                            'Price: \$${food.price.toString()}',
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
                            itemCount: food.carousel.links.length,
                            itemBuilder: (context, index) {
                              return Container(
                                margin: const EdgeInsets.all(10),
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(20),
                                  child: Image(image: NetworkImage(food.carousel.links[index]),),
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
                          fat: food.nutritionValue.fat,
                          protein: food.nutritionValue.protein,
                          vitamins: food.nutritionValue.vitamins,
                          carbohydrates: food.nutritionValue.carbs,
                        ),
                        // * seperator
                        const SizedBox(
                          height: 30,
                        ),
                        Container(
                          padding: const EdgeInsets.all(20),
                          decoration: BoxDecoration(
                            color: primaryColor,
                            borderRadius: BorderRadius.circular(25),
                            boxShadow: const [
                              BoxShadow(
                                color: Colors.black12,
                                blurRadius: 5,
                                offset: Offset(10, 10),
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
                                        food.price.toString(),
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
                                boxColor: Colors.white,
                                text: "Add to Cart",
                                fontSize: 15,
                                contentColor: thirdColor,
                                onTap: () async {
                                  final token = await getToken();
                                  if (token != null) {
                                    addToCart(
                                      food,
                                      token,
                                      quantity,
                                    );
                                  } else {
                                    Fluttertoast.showToast(
                                      msg: "Failed to retrieve token",
                                      toastLength: Toast.LENGTH_SHORT,
                                      gravity: ToastGravity.BOTTOM,
                                      timeInSecForIosWeb: 1,
                                      backgroundColor: Colors.red,
                                      textColor: Colors.white,
                                      fontSize: 16.0,
                                    );
                                    //Navigator.push(context, Routes.loginRoute);
                                  }
                                },
                              ),
                            ],
                          ),
                        ),
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
