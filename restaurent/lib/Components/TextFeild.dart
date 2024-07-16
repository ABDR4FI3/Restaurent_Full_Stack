import 'package:flutter/material.dart';

class CustomTextfeild extends StatefulWidget {
  final TextEditingController controller;
  final String hintText;
  final bool obscureText;

  const CustomTextfeild({
    Key? key,
    required this.controller,
    required this.hintText,
    this.obscureText = false, // Default to false for normal text input
  }) : super(key: key);

  @override
  _CustomTextfeildState createState() => _CustomTextfeildState();
}

class _CustomTextfeildState extends State<CustomTextfeild> {
  bool _obscureText = true;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      child: TextField(
        controller: widget.controller,
        obscureText: _obscureText && widget.obscureText,
        decoration: InputDecoration(
          enabledBorder: const OutlineInputBorder(
            borderRadius: BorderRadius.all(Radius.circular(25)),
            borderSide: BorderSide(
              color: Color.fromARGB(106, 106, 105, 247),
              width: 2,
            ),
          ),
          focusedBorder: const OutlineInputBorder(
            borderSide: BorderSide(color: Colors.white, width: 2),
          ),
          fillColor: const Color.fromARGB(253, 255, 255, 255),
          filled: true,
          hintText: widget.hintText,
          hintStyle: TextStyle(color: Colors.grey[500]),
          suffixIcon: widget.obscureText
              ? IconButton(
                  onPressed: () {
                    setState(() {
                      _obscureText = !_obscureText;
                    });
                  },
                  icon: Icon(
                    _obscureText ? Icons.visibility_off : Icons.visibility,
                    color: Colors.grey[500],
                  ),
                )
              : null,
        ),
      ),
    );
  }
}
