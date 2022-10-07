import 'package:flutter/material.dart';
import 'package:flutter_auth/configs/themes/app_colors.dart';
import 'package:google_fonts/google_fonts.dart';

mixin SubThemeData {
  TextTheme getTextThemes() {
    // ignore: prefer_const_constructors
    return GoogleFonts.quicksandTextTheme(TextTheme(
        bodyText1: const TextStyle(
          fontWeight: FontWeight.w400,
        ),
        bodyText2: const TextStyle(fontWeight: FontWeight.w400)));
  }

  IconThemeData getIconTheme() {
    return const IconThemeData(color: onSurfaceTextColor, size: 16);
  }
}
