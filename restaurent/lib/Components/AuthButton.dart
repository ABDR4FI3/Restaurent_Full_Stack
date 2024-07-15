import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:restaurent/theme/colors.dart';

class Authbutton extends StatelessWidget {
  final Function()? onTap;
  const Authbutton({super.key, this.onTap});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(20),
        margin: const EdgeInsets.symmetric(horizontal: 25),
        decoration: BoxDecoration(
          color: primaryBlue,
          borderRadius: BorderRadius.circular(15),
        ),
        child: Center(
          child: Text(
            "Sign In",
            style: GoogleFonts.quicksand(
                color: Colors.white, fontSize: 30,
                fontWeight: FontWeight.bold),
          ),
        ),
      ),
    );
  }
}
