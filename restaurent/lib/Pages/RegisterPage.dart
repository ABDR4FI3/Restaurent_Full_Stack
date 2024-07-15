import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:restaurent/Components/AuthButton.dart';
import 'package:restaurent/Components/TextFeild.dart';

class Registerpage extends StatelessWidget {
  final usernameController = TextEditingController();
  final passwordController = TextEditingController();

  Registerpage({super.key});

  Future<void> RegisterUser(BuildContext context) async {
    
  }


  void showSnackbar(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // * Background image
          Positioned.fill(
            child: Image.asset(
              'Images/Auth/blob-haikei.png',
              fit: BoxFit.cover,
            ),
          ),
          // * Bottom Curved image
          Positioned(
            bottom: 0,
            left: 0,
            child: SvgPicture.asset(
              'Images/Buttom.svg',
              width: 200,
              height: 200,
            ),
          ),
          //* Opacity Background
          Container(
            color: Colors.black.withOpacity(0.5),
          ),
          //* Container For Login elements
          SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // * Top Curved image
                SvgPicture.asset(
                  'Images/Top.svg',
                  width: 200,
                  height: 200,
                ),
                // * Image Auth logo
                Image.asset(
                  'Images/Auth/online-shop.gif',
                  width: 200,
                  height: 200,
                ),
                //* Separator
                const SizedBox(height: 10),
                // * Auth Text
                Text(
                  "Welcome in our Universe ",
                  style: GoogleFonts.quicksand(
                    fontSize: 20,
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                // * Separator
                const SizedBox(height: 50),
                // * TextField
                CustomTextfeild(
                  controller: usernameController,
                  hintText: "Enter Username",
                  obscureText: false,
                ),
                // ! Separator
                const SizedBox(height: 20),
                CustomTextfeild(
                  controller: passwordController,
                  hintText: "Enter email",
                  obscureText: true,
                ),
                // ! Separator
                const SizedBox(height: 20),
                CustomTextfeild(
                  controller: passwordController,
                  hintText: "Enter adress",
                  obscureText: true,
                ),
                // ! Separator
                const SizedBox(height: 20),
                CustomTextfeild(
                  controller: passwordController,
                  hintText: "Enter phone",
                  obscureText: true,
                ),
                // ! Separator
                const SizedBox(height: 20),
                CustomTextfeild(
                  controller: passwordController,
                  hintText: "Enter Password",
                  obscureText: true,
                ),
                //* You have an account
                Padding(
                  padding: const EdgeInsets.all(25),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      GestureDetector(
                        onTap: () {
                          Navigator.pushReplacementNamed(context, '/login');
                        },
                        child: Text("You already have an account !",
                            style: GoogleFonts.quicksand(
                              color: Colors.white,
                            )),
                      ),
                    ],
                  ),
                ),
                // * Separator
                const SizedBox(height: 20),
                // * Login Button
                Authbutton(
                  onTap: () => RegisterUser(context),
                ),
                // * Separator
              ],
            ),
          ),
        ],
      ),
    );
  }
}
