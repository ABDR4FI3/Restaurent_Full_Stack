import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:restaurent/Pages/FavoritePage.dart';
import 'package:restaurent/Pages/LandingPage.dart';
import 'package:restaurent/Pages/MenuPage.dart';
import 'package:restaurent/Pages/ProfilePage.dart';
import 'package:restaurent/Pages/card_page.dart';
import 'package:restaurent/theme/colors.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Restaurant App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const LandingPage(),
      routes: {
        '/menu': (context) => const MenuPage(),
        '/Home': (context) => const HomeScreen(),
        '/favorite': (context) => const FavoritePage(),
        '/cart': (context) => const CardPage(),
        '/profile': (context) => const Profilepage(),
      },
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _buildBody(),
      bottomNavigationBar: _buildBottomNavigationBar(),
    );
  }

  Widget _buildBody() {
    return IndexedStack(
      index: _selectedIndex,
      children: const [
        MenuPage(),
        FavoritePage(),
        CardPage(),
        Profilepage(),
      ],
    );
  }

Widget _buildBottomNavigationBar() {
    // List of page indices where bottom navigation bar should be hidden
    List<int> pagesWithoutBottomNavBar = [0]; // Index of LandingPage()
    print("_selectedIndex: $_selectedIndex");
    if(pagesWithoutBottomNavBar.contains([_selectedIndex])) {
      print("teeeeeeeeeeeeeeeeeeeeeest");
      return Container();
    }
    return CurvedNavigationBar(
      color: primaryColor,
      backgroundColor: secondaryColor,
      index: _selectedIndex,
      onTap: (index) {
        setState(() {
          _selectedIndex = index;
          print("_selectedIndex set to: $_selectedIndex");
        });
      },
      items: const [
        Icon(Icons.home, color: Colors.white),
        Icon(Icons.favorite, color: Colors.white),
        Icon(Icons.shopping_cart, color: Colors.white),
        Icon(Icons.person, color: Colors.white),
      ],
    );
  }
}
