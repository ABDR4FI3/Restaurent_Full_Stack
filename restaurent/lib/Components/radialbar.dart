import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class RadialBar extends StatelessWidget {
  final double fat;
  final double protein;
  final double vitamins;
  final double carbohydrates;

  RadialBar({
    required this.fat,
    required this.protein,
    required this.vitamins,
    required this.carbohydrates,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 400,
      child: SfCircularChart(
        series: _getDonutSeries(),
        legend: Legend(
          isVisible: true,
          position: LegendPosition.bottom,
        ),
      ),
    );
  }

  List<DoughnutSeries<_ChartData, String>> _getDonutSeries() {
    final List<_ChartData> chartData = <_ChartData>[
      _ChartData('Fat', fat),
      _ChartData('Protein', protein),
      _ChartData('Vitamins', vitamins),
      _ChartData('Carbohydrates', carbohydrates),
    ];

    return <DoughnutSeries<_ChartData, String>>[
      DoughnutSeries<_ChartData, String>(
        dataSource: chartData,
        xValueMapper: (_ChartData data, _) => data.category,
        yValueMapper: (_ChartData data, _) => data.value,
        innerRadius: '60%', // Adjust inner radius for donut shape
        explode: true, // Enable to separate slices
        explodeIndex: 0, // Index of the slice to explode (optional)
        dataLabelSettings: DataLabelSettings(
          isVisible: true,
        ),
      ),
    ];
  }
}

class _ChartData {
  _ChartData(this.category, this.value);

  final String category;
  final double value;
}
