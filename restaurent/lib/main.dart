import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:restaurent/Pages/MenuPage.dart';
import 'package:restaurent/Pages/card_page.dart';
import 'package:restaurent/model/shop.dart';
import 'Pages/LandingPage.dart';

void main() {
  runApp(
    ChangeNotifierProvider(create: (context) => Cart(), child: const MyApp()),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

// This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Resturant A43',
      debugShowCheckedModeBanner: false,
      home: const LandingPage(),
      routes: {
        '/landing': (context) => const LandingPage(),
        '/menupage': (context) => const MenuPage(),
        '/cart': (context) => const CardPage(),
      },
    );
  }
}
