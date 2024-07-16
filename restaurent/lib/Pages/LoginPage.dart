import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:restaurent/Components/AuthButton.dart';
import 'package:restaurent/Components/TextFeild.dart';

class Loginpage extends StatelessWidget {
  final usernameController = TextEditingController();
  final passwordController = TextEditingController();

  Loginpage({super.key});

  Future<void> loginUser(BuildContext context) async {
    final username = usernameController.text;
    final password = passwordController.text;

    if (username.isEmpty || password.isEmpty) {
      showSnackbar(context, 'Please enter both username and password');
      return;
    }

    final response = await http.post(
      Uri.parse('http://192.168.100.128:9090/user/Login'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'email': username,
        'password': password,
      }),
    );

    switch (response.statusCode) {
      case 200:
        final responseData = jsonDecode(response.body);
        final token = responseData['token'];
        await saveToken(token);
        showSnackbar(context, 'Login successful');
        Navigator.pushReplacementNamed(context, '/home');
        break;
      case 404:
        showSnackbar(context, 'User not found');
        break;
      case 401:
        showSnackbar(context, 'Incorrect password');
        break;
      default:
        showSnackbar(context, 'Login failed');
        break;
    }
  }

  Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('token', token);
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
                  'Images/Auth/finger.gif',
                  width: 200,
                  height: 200,
                ),
                //* Separator
                const SizedBox(height: 10),
                // * Auth Text
                Text(
                  "Welcome again you have been missed",
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
                  hintText: "Enter Password",
                  obscureText: true,
                ),
                //* Forgot password text
                Padding(
                  padding: const EdgeInsets.all(25),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      GestureDetector(
                        onTap: () {
                          Navigator.pushReplacementNamed(context, '/register');
                        },
                        child: Text("Forgot Password?",
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
                  onTap: () => loginUser(context),
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
