import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:restaurent/model/food.dart';
import 'package:restaurent/theme/colors.dart';

class FoodTile extends StatefulWidget {
  final Food food;
  final void Function()? onTap;
  const FoodTile({super.key, required this.food, required this.onTap});

  @override
  _FoodTileState createState() => _FoodTileState();
}

class _FoodTileState extends State<FoodTile> {
  bool isFavorite = false;

  void toggleFavorite() {
    setState(() {
      isFavorite = !isFavorite;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onTap,
      child: Container(
        width: 250,
        height: 350,
        decoration: BoxDecoration(
          color: Colors.grey[100],
          border: Border.all(color: primaryColor, width: 5),
          borderRadius: BorderRadius.circular(20),
        ),
        margin: const EdgeInsets.all(10),
        padding: const EdgeInsets.all(10),
        child: Column(
          children: [
            // * Image with heart icon in top right corner
            Stack(
              children: [
                Image.asset(
                  widget.food.image,
                  height: 200,
                  width: 200,
                  
                  fit: BoxFit.cover,
                ),
                Positioned(
                  top: 0,
                  right: 5,
                  height: 40,
                  width: 40,
                  child: IconButton(
                    icon: Icon(
                      isFavorite ? Icons.favorite : Icons.favorite_border,
                      color: isFavorite ? Colors.red : Colors.grey,
                      size: 30,
                    ),
                    onPressed: toggleFavorite,
                  ),
                ),
              ],
            ),
            // * Text : food name
            Text(
              widget.food.name,
              style: GoogleFonts.quicksand(
                fontSize: 40,
                fontWeight: FontWeight.bold,
              ),
            ),
            // * Rating & Price
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // * Price
                Row(
                  children: [
                    Text(
                      widget.food.getPrice().toString(),
                      style: GoogleFonts.quicksand(
                        fontSize: 40,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(width: 5),
                    Icon(
                      Icons.attach_money,
                      color: Colors.green[700],
                      size: 40,
                    ),
                  ],
                ),
                const SizedBox(
                  width: 20,
                ),
                // * Rating
                Row(
                  children: [
                    Text(
                      widget.food.getRating().toString(),
                      style: GoogleFonts.quicksand(
                        fontSize: 40,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(width: 5),
                    Icon(
                      Icons.star,
                      color: Colors.yellow[700],
                      size: 40,
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
