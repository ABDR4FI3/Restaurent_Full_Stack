import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:restaurent/Components/AuthButton.dart';
import 'package:restaurent/Components/TextFeild.dart';


import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class Registerpage extends StatelessWidget {
  final usernameController = TextEditingController();
  final emailController = TextEditingController();
  final addressController = TextEditingController();
  final phoneController = TextEditingController();
  final passwordController = TextEditingController();

  Registerpage({super.key});

  Future<void> RegisterUser(BuildContext context) async {
    final String apiUrl = 'http://192.168.100.128:9090/user/register'; 

    final userDTO = {
      'name': usernameController.text,
      'email': emailController.text,
      'address': addressController.text,
      'phone': phoneController.text,
      'password': passwordController.text,
    };

    try {
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(userDTO),
      );
      print(response.body);

      if (response.statusCode == 200) {
        final responseData = json.decode(response.body);
        String message = responseData['message'];

        if (responseData['response'].toString() == 200.toString()) {
          // Save the token using SharedPreferences
          final SharedPreferences prefs = await SharedPreferences.getInstance();
          prefs.setString('token', responseData['token']);

          // Navigate to the next screen or show success message
          Navigator.pushReplacementNamed(context, '/home');
        } else {
          // Handle errors like non-unique username, email, or phone
          showSnackbar(context,
           'Registration failed. $message',
           Color(Colors.red.value));
        }
      } else {
        showSnackbar(context, 'Server error. Please try again later.' , Colors.redAccent);
      }
    } catch (error) {
      showSnackbar(context, 'An error occurred. Please try again later $error.' , Colors.black);
    }
  }

  void showSnackbar(BuildContext context, String message , Color color) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message),backgroundColor: color,),
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
                  controller: emailController,
                  hintText: "Enter email",
                  obscureText: false,
                ),
                // ! Separator
                const SizedBox(height: 20),
                CustomTextfeild(
                  controller: addressController,
                  hintText: "Enter address",
                  obscureText: false,
                ),
                // ! Separator
                const SizedBox(height: 20),
                CustomTextfeild(
                  controller: phoneController,
                  hintText: "Enter phone",
                  obscureText: false,
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

  