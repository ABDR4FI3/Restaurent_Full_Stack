import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:restaurent/model/food.dart';

class FoodTile extends StatefulWidget {
  final Food food;
  final void Function()? onTap;
  const FoodTile({Key? key, required this.food, required this.onTap})
      : super(key: key);

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
        width: 180,
        height: 250,
        decoration: BoxDecoration(
          color: Colors.grey[100],
          border: Border.all(color: Colors.grey.shade300, width: 1),
          borderRadius: BorderRadius.circular(20),
        ),
        margin: const EdgeInsets.all(5),
        padding: const EdgeInsets.all(10),
        child: Column(
          children: [
            // Image with heart icon in top right corner
            Stack(
              children: [
                Image(
                  image: NetworkImage(widget.food.link),
                  height: 100,
                  width: 100,
                  fit: BoxFit.cover,
                ),
                Positioned(
                  top: 0,
                  right: -5,
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
            // Text: food name
            Text(
              widget.food.name,
              style: GoogleFonts.abhayaLibre(
                fontSize: 35,
                fontWeight: FontWeight.bold,
              ),
            ),
            // Rating & Price
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // Price
                Row(
                  children: [
                    Text(
                      widget.food.price.toString(),
                      style: GoogleFonts.abhayaLibre(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(width: 5),
                    Icon(
                      Icons.attach_money,
                      color: Colors.green[700],
                      size: 20,
                    ),
                  ],
                ),
                const SizedBox(
                  width: 20,
                ),
                // Rating
                Row(
                  children: [
                    Text(
                      widget.food.rating.toString(),
                      style: GoogleFonts.abhayaLibre(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(width: 1),
                    Icon(
                      Icons.star,
                      color: Colors.yellow[700],
                      size: 20,
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
