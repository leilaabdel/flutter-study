import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter_auth/configs/themes/app_colors.dart';
import 'package:flutter_auth/widgets/app_circle_button.dart';
import 'package:get/get.dart';

class AppIntroductionScreen extends StatelessWidget {
  const AppIntroductionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
          decoration: BoxDecoration(gradient: mainGradient(context)),
          alignment: Alignment.center,
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: Get.width * 0.2),
            child:
                Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              const Icon(Icons.star, size: 65),
              SizedBox(
                height: 40,
              ),
              const Text(
                  "This is a study app. You can use it as you want. If you understand how this wors, you would be able to scale it. With this you will master firebase backend and flutter backend."),
              SizedBox(height: 40),
              AppCircleButton(
                onTap: () => null,
                child: const Icon(Icons.arrow_forward, size: 35),
              )
            ]),
          )),
    );
  }
}
