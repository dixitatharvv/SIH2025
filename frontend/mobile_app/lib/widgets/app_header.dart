import 'package:flutter/material.dart';

class AppHeader extends StatelessWidget implements PreferredSizeWidget {
  const AppHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: Colors.white,
      elevation: 0,
      automaticallyImplyLeading: false,
      flexibleSpace: Container(
        decoration: const BoxDecoration(
          color: Colors.white,
          border: Border(
            bottom: BorderSide(
              color: Color(0xFF3B82F6),
              width: 2,
            ),
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              children: [
                // Hamburger Menu
                IconButton(
                  icon: const Icon(
                    Icons.menu,
                    color: Colors.black,
                    size: 24,
                  ),
                  onPressed: () {
                    // Handle menu tap
                  },
                ),
                const Spacer(),
                // Right side icons
                Row(
                  children: [
                    // Translation Icon
                    IconButton(
                      icon: const Icon(
                        Icons.translate,
                        color: Colors.black,
                        size: 24,
                      ),
                      onPressed: () {
                        // Handle translation
                      },
                    ),
                    // Notification Icon
                    IconButton(
                      icon: const Icon(
                        Icons.notifications_outlined,
                        color: Colors.black,
                        size: 24,
                      ),
                      onPressed: () {
                        // Handle notifications
                      },
                    ),
                    // Settings Icon
                    IconButton(
                      icon: const Icon(
                        Icons.settings_outlined,
                        color: Colors.black,
                        size: 24,
                      ),
                      onPressed: () {
                        // Handle settings
                      },
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight + 2);
}
