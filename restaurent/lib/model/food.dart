class Food {
  String name;
  String image;
  String description;
  int rating;
  int price;
  List<String> carousel;
  Map<String, double> nutritionValue; // Map to store nutrition values
  int calories; // Total calories for the meal

  Food({
    required this.name,
    required this.image,
    required this.description,
    required this.rating,
    required this.price,
    required this.carousel,
    required this.nutritionValue,
    required this.calories,
  });

  // Getters
  String getName() {
    return name;
  }

  int getRating() {
    return rating;
  }

  String getImage() {
    return image;
  }

  String getDescription() {
    return description;
  }

  int getPrice() {
    return price;
  }

  List<String> getCarousel() {
    return carousel;
  }

  Map<String, double> getNutritionValue() {
    return nutritionValue;
  }

  int getCalories() {
    return calories;
  }
}

// Update the foodMenu list with nutrition values and calories
List<Food> foodMenu = [
  Food(
    name: 'Ramen',
    image: 'lib/Images/ramen.png',
    description:
        'Ramen is a Japanese noodle soup dish that features Chinese-style wheat noodles served in a meat or fish-based broth. It is often flavored with soy sauce or miso and topped with ingredients like sliced pork, nori, menma, and scallions',
    rating: 4,
    price: 20,
    carousel: [
      'lib/Images/Ramen/ramen1.png',
      'lib/Images/Ramen/ramen2.png',
      'lib/Images/Ramen/ramen3.png'
    ],
    nutritionValue: {
      'protein': 15.0, // Example protein value in grams
      'carbs': 30.0, // Example carbs value in grams
      'fat': 10.0, // Example fat value in grams
      'vitamins': 5.0, // Example vitamins value in grams
    },
    calories: 350, // Example total calories
  ),
  Food(
    name: 'Biryani',
    image: 'lib/Images/biryani.png',
    description:
        'Biryani is a fragrant and flavorful rice dish made with basmati rice, meat (such as chicken, mutton, or beef), and a blend of spices. Originating from the Indian subcontinent, it is a popular dish known for its rich taste and aroma.',
    rating: 5,
    price: 25,
    carousel: [
      'lib/Images/Biryani/biryani1.png',
      'lib/Images/Biryani/biryani2.png',
      'lib/Images/Biryani/biryani3.png'
    ],
    nutritionValue: {
      'protein': 20.0,
      'carbs': 50.0,
      'fat': 15.0,
      'vitamins': 8.0,
    },
    calories: 500,
  ),
  Food(
    name: 'Salad',
    image: 'lib/Images/salad.png',
    description:
        'Salads are dishes consisting of mixed ingredients such as leafy greens, vegetables, fruits, nuts, and dressings. They are often enjoyed as a healthy and refreshing meal or side dish, offering a variety of flavors and nutrients.',
    rating: 3,
    price: 35,
    carousel: [
      'lib/Images/Salad/salad1.png',
      'lib/Images/Salad/salad2.png',
      'lib/Images/Salad/salad3.png'
    ],
    nutritionValue: {
      'protein': 15.0,
      'carbs': 25.0,
      'fat': 3.0,
      'vitamins': 60.0,
    },
    calories: 150,
  ),
  Food(
    name: 'Burger',
    image: 'lib/Images/fast-food.png',
    description:
        'A burger is a sandwich consisting of a cooked patty of ground meat (typically beef) placed inside a sliced bread roll. It is often served with various toppings such as lettuce, tomato, cheese, and condiments like ketchup or mustard.',
    rating: 2,
    price: 15,
    carousel: [
      'lib/Images/Burger/burger1.png',
      'lib/Images/Burger/burger2.png',
      'lib/Images/Burger/burger3.png'
    ],
    nutritionValue: {
      'protein': 25.0,
      'carbs': 40.0,
      'fat': 25.0,
      'vitamins': 2.0,
    },
    calories: 400,
  ),
];
