import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_auth/configs/themes/sub_theme_data_mixins.dart';

const Color primaryLightColorLight = Color.fromARGB(255, 115, 168, 171);
const Color primaryColorLight = Color(0xFFf85187);

class LightTheme with SubThemeData {
  buildLightTheme() {
    final ThemeData systemLightTheme = ThemeData.light();
    return systemLightTheme.copyWith(iconTheme: getIconTheme());
  }
}
