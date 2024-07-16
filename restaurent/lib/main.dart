import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:restaurent/Pages/FavoritePage.dart';
import 'package:restaurent/Pages/HomeScreen.dart';
import 'package:restaurent/Pages/LandingPage.dart';
import 'package:restaurent/Pages/LoginPage.dart';
import 'package:restaurent/Pages/MenuPage.dart';
import 'package:restaurent/Pages/ProfilePage.dart';
import 'package:restaurent/Pages/RegisterPage.dart';
import 'package:restaurent/Pages/card_page.dart';
import 'package:restaurent/Provider/HomeScreenProvider.dart';
import 'package:restaurent/theme/colors.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => HomeScreenProvider(),
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Restaurant App',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: Registerpage(),
        routes: {
          //'/': (context) => const HomeScreen(),
          '/register': (context) => Registerpage(),
          '/login': (context) => Loginpage(),
          '/home': (context) => const HomeScreen(),
          '/menu': (context) => const MenuPage(),
          '/favorite': (context) => const FavoritePage(),
          '/cart': (context) => const CardPage(),
          '/profile': (context) => const Profilepage(),
        },
      ),
    );
  }
}
