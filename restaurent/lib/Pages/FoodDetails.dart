import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:restaurent/Components/MyButton.dart';
import 'package:restaurent/Components/radialbar.dart';
import 'package:restaurent/model/food.dart';
import 'package:restaurent/model/shop.dart';
import 'package:restaurent/theme/colors.dart';

class FoodDetails extends StatefulWidget {
  final Food food;

  const FoodDetails({super.key, required this.food});

  @override
  State<FoodDetails> createState() => _FoodDetailsState();
}

class _FoodDetailsState extends State<FoodDetails> {
  // * quantity
  int quantity = 0;
  //* increment quantity
  void incrementQuantity() {
    setState(() {
      quantity++;
    });
  }

  //* decrement quantity
  void decrementQuantity() {
    if (quantity > 0) {
      setState(() {
        quantity--;
      });
    }
  }
  //* add meal to cart 
  addToCart() {
    if (quantity <= 0) {
      showDialog(
        context: context,
        builder: (context) =>  AlertDialog(
          backgroundColor: primaryColor, // ! primarycolor
          content: const Text("Please select quantity",
              style: TextStyle(
                color: Colors.white,
                fontSize: 18,
              )),
        ),
      );
    }
    if (quantity > 0) {
      //* get access to cart
      final Cart cart = context.read<Cart>();
      //* add to cart
      cart.addToCart(widget.food, quantity);
      //* notify user
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          backgroundColor: primaryColor, // ! primarycolor
          content: const Text("Successfully added to cart",
              style: TextStyle(
                color: Colors.white,
                fontSize: 18,
              )),
          actions: [
            IconButton(
              onPressed: () {
                //* pop once (go back ) to remove dialog
                Navigator.pop(context);
                Navigator.pop(context);
              },
              icon: const Icon(
                Icons.done,
                color: Colors.white,
              ),
            )
          ],
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: primaryColor,
        foregroundColor: secondaryColor,
        iconTheme: const IconThemeData(color: Colors.white),
        title: Text(
          widget.food.name,
          style: GoogleFonts.quicksand(
              color: Colors.white, fontWeight: FontWeight.bold),
        ),
      ),
      body: SizedBox(
        width: double.infinity,
        child: SingleChildScrollView(
          child: Column(
            children: [
              // *  image logo
              Container(
                height: 300,
                padding: const EdgeInsets.all(8),
                child: Center(
                  child: Image.asset(
                    widget.food.image,
                  ),
                ),
              ),
              // * Meal Name
              Text(
                widget.food.getName(),
                style: GoogleFonts.quicksand(
                    fontSize: 42, color: Colors.grey[800]),
              ),
              //* seperator
              const SizedBox(
                height: 10,
              ),
              //* meal description
              Container(
                margin: const EdgeInsets.only(top: 10),
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Text(
                  textAlign: TextAlign.justify,
                  widget.food.getDescription(),
                  style: GoogleFonts.quicksand(
                    color: Colors.grey[800],
                    fontSize: 20,
                  ),
                ),
              ),
              //* seperator
              const SizedBox(
                height: 30,
              ),
              //* Title
              Text(
                'Discover',
                style: GoogleFonts.quicksand(
                  fontSize: 40,
                  color: Colors.grey[800],
                ),
              ),
              //* seperator
              const SizedBox(
                height: 10,
              ),
              // * Images Carousel
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
                  itemCount: widget.food.carousel.length,
                  itemBuilder: (context, index) {
                    return Container(
                      margin: const EdgeInsets.all(10),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(20),
                        child: Image.asset(
                          fit: BoxFit.cover,
                          widget.food.carousel[index],
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
              // *  Radial Bar
              RadialBar(
                fat: widget.food.nutritionValue['fat'] ?? 0,
                protein: widget.food.nutritionValue['protein'] ?? 0,
                vitamins: widget.food.nutritionValue['vitamins'] ?? 0,
                carbohydrates: widget.food.nutritionValue['carbs'] ?? 0,
              ),
              // * seperator
              const SizedBox(
                height: 30,
              ),
              // * Add to Cart
              Container(
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
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        // * Left section with price and currency icon
                        Row(
                          children: [
                            Text(
                              widget.food.getPrice().toString(),
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
                              margin:
                                  const EdgeInsets.symmetric(horizontal: 10),
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
                      height: 35, //!35
                      width: double.infinity, //!80
                      icon: Icons.shopping_cart,
                      iconSize: 30,
                      padding: const EdgeInsets.symmetric(horizontal: 15),
                      boxColor: secondaryColor,
                      text: "Add to Cart",
                      fontSize: 15,
                      contentColor: Colors.white,
                      onTap: () => addToCart(),
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
