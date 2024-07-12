class NutritionValue {
  final double fat;
  final double vitamins;
  final double carbs;
  final double protein;

  NutritionValue({
    required this.fat,
    required this.vitamins,
    required this.carbs,
    required this.protein,
  });

  factory NutritionValue.fromJson(Map<String, dynamic> json) {
    return NutritionValue(
      fat: (json['fat'] ?? 0.0).toDouble(),
      vitamins: (json['vitamins'] ?? 0.0).toDouble(),
      carbs: (json['carbs'] ?? 0.0).toDouble(),
      protein: (json['protein'] ?? 0.0).toDouble(),
    );
  }
}
