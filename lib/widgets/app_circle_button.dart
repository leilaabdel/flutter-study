import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';

class AppCircleButton extends StatelessWidget {
  const AppCircleButton(
      {super.key, required this.child, this.color, this.width, this.onTap});
  final Widget child;
  final Color? color;
  final double? width;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      shape: const CircleBorder(),
      type: MaterialType.transparency,
      clipBehavior: Clip.hardEdge,
      child: InkWell(
        child: child,
      ),
    );
  }
}
