import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:restaurent/Components/MyButton.dart';

class LandingPage extends StatelessWidget {
  const LandingPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(
          255, 138, 60, 50), // Set background color to deep orange
      body: Padding(
        padding: const EdgeInsets.all(25.0),
        child: Column(
          children: [
            // * shop name
            Container(
              margin: const EdgeInsets.only(
                  top: 40.0), // Adjust the top margin as needed
              child: Text(
                "A43 Restaurent",
                style: GoogleFonts.spaceGrotesk(
                  fontSize: 35,
                  color: Colors.white,
                ),
              ),
            ),
            //* separator
            const SizedBox(
              height: 50,
            ),
            // * Image
            Padding(
              padding: const EdgeInsets.all(50.0),
              child: Image.asset('Images/Logo.png'),
            ),
            // * Separator
            const SizedBox(
              height: 150,
            ),
            // * Slogan
            Text(
              "Artistry on Every Plate",
              style: GoogleFonts.aboreto(
                  fontSize: 35,
                  color: Colors.white,
                  fontWeight: FontWeight.bold),
            ),
            // * button
            MyButton(
              text: "Order Now",
              onTap: () {
                Navigator.pushNamed(context, '/Home');
              },
            )
          ],
        ),
      ),
    );
  }
}
