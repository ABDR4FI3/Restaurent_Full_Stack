import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:restaurent/Components/MapComponent.dart';
import 'package:restaurent/theme/colors.dart';

class FavoritePage extends StatefulWidget {
  const FavoritePage({super.key});

  @override
  State<FavoritePage> createState() => _FavoritePageState();
}

class _FavoritePageState extends State<FavoritePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: lightBackground,
      appBar: AppBar(
        backgroundColor: primaryColor,
        title: Text(
          "Our Locations",
          style: GoogleFonts.montserrat(
            color: Colors.white,
          ),
        ),
      ),
      body: Container(
        child: MapComponent(),
      ),
    );
  }
}
