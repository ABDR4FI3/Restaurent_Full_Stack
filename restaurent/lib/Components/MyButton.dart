import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class MyButton extends StatelessWidget {
  final String text;
  final void Function()? onTap;
  final double? width;
  final double? height;
  final double? fontSize;
  final EdgeInsetsGeometry? padding;
  final IconData? icon;
  final double? iconSize;
  final Color? boxColor; 
  final Color? contentColor; // ! parameter for text and icon color

  const MyButton({
    super.key,
    required this.text,
    required this.onTap,
    this.width,
    this.height,
    this.fontSize,
    this.padding,
    this.icon,
    this.iconSize,
    this.boxColor, 
    this.contentColor, // Initialize textColor
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: width,
        height: height,
        margin: const EdgeInsets.only(top: 20),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(15),
          color: boxColor ??
              Colors.white, // Use provided boxColor or default to white
        ),
        padding: padding ?? const EdgeInsets.all(20),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Expanded(
              child: Text(
                text,
                textAlign: TextAlign.center,
                style: GoogleFonts.quicksand(
                  fontSize: fontSize ?? 30,
                  color: contentColor ?? Color.fromARGB(255, 50, 94, 138),
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(width: 10),
            if (icon != null)
              Icon(
                icon,
                color: contentColor ?? Color.fromARGB(255, 56, 91, 108),
                size: iconSize ?? 40,
              ),
          ],
        ),
      ),
    );
  }
}
