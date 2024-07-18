import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:restaurent/Pages/FoodDetails.dart';
import 'package:restaurent/Provider/FoodProvider.dart';
import 'package:restaurent/model/CategoryData.dart';
import 'package:restaurent/theme/colors.dart';
import 'package:restaurent/Components/food_tile.dart';

class Menu extends StatefulWidget {
  const Menu({super.key});

  @override
  State<Menu> createState() => _MenuState();
}

class _MenuState extends State<Menu> {
  void navigateToFoodDetails(int id) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => FoodDetails(foodId: id),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    Provider.of<FoodProvider>(context, listen: false).fetchFoods();
    print(Provider.of<FoodProvider>(context, listen: false).fetchFoods());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Discover our menu',
          style: GoogleFonts.abhayaLibre(
            fontWeight: FontWeight.w800,
            color: Colors.white,
          ),
        ),
        iconTheme: const IconThemeData(color: Colors.white),
        backgroundColor: Colors.blueAccent,
        centerTitle: true,
      ),
      body: Consumer<FoodProvider>(
        builder: (context, foodProvider, child) {
          return Column(
            children: [
              const SizedBox(height: 20),
              Container(
                margin: const EdgeInsets.symmetric(horizontal: 8),
                child: SizedBox(
                  height: 50, // Adjust the height as needed
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: categories.length,
                    itemBuilder: (context, index) {
                      return GestureDetector(
                        onTap: () {
                          print("category is ${categories[index]}");
                          foodProvider.filterFoodsByCategory(categories[index]);
                        },
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 8.0),
                          child: Container(
                            width: 150, // Adjust the width as needed
                            decoration: BoxDecoration(
                              color: primaryColor, // Example color
                              borderRadius: BorderRadius.circular(15),
                            ),
                            child: Center(
                              child: Text(
                                categories[index],
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ),
              const SizedBox(height: 10),
              Expanded(
                child: foodProvider.foodMenu.isEmpty
                    ? const Center(child: CircularProgressIndicator())
                    : GridView.builder(
                        gridDelegate:
                            const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          mainAxisSpacing: 0,
                          crossAxisSpacing: 0,
                          childAspectRatio: 0.75,
                        ),
                        itemCount: foodProvider.foodMenu.length,
                        itemBuilder: (context, index) => FoodTile(
                          food: foodProvider.foodMenu[index],
                          onTap: () => navigateToFoodDetails(
                              foodProvider.foodMenu[index].id),
                        ),
                      ),
              ),
            ],
          );
        },
      ),
    );
  }
}
