import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:restaurent/Pages/FavoritePage.dart';
import 'package:restaurent/Pages/MenuPage.dart';
import 'package:restaurent/Pages/ProfilePage.dart';
import 'package:restaurent/Pages/card_page.dart';
import 'package:restaurent/Provider/HomeScreenProvider.dart';
import 'package:restaurent/theme/colors.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<HomeScreenProvider>(context);

    return Scaffold(
      body: _buildBody(provider.selectedIndex),
      bottomNavigationBar: _buildBottomNavigationBar(provider),
    );
  }

  Widget _buildBody(int selectedIndex) {
    switch (selectedIndex) {
      case 0:
        return const MenuPage();
      case 1:
        return const FavoritePage();
      case 2:
        return const CardPage();
      case 3:
        return const Profilepage();
      default:
        return const MenuPage();
    }
  }

  Widget _buildBottomNavigationBar(HomeScreenProvider provider) {


    return CurvedNavigationBar(
      color: primaryColor,
      backgroundColor: Color.fromARGB(255, 224, 224, 224),
      index: provider.selectedIndex,
      onTap: (index) {
        provider.setIndex(index);
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
