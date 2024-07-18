import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:restaurent/Pages/FavoritePage.dart';
import 'package:restaurent/Pages/LoginPage.dart';
import 'package:restaurent/Pages/Menu.dart';
import 'package:restaurent/Pages/MenuPage.dart';
import 'package:restaurent/Pages/ProfilePage.dart';
import 'package:restaurent/Provider/HomeScreenProvider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Customdrawer extends StatelessWidget {
  const Customdrawer({super.key});

  Future<String?> getName() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('name');
  }

  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('mail');
  }

  @override
  Widget build(BuildContext context) {
    HomeScreenProvider routingProvider =
        Provider.of<HomeScreenProvider>(context);

    return Drawer(
      child: ListView(
        children: [
          FutureBuilder<List<String?>>(
            future: Future.wait([getName(), getToken()]),
            builder:
                (BuildContext context, AsyncSnapshot<List<String?>> snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return UserAccountsDrawerHeader(
                  accountName: const Text('Loading...'),
                  accountEmail: const Text('Loading...'),
                  currentAccountPicture: CircleAvatar(
                    child: ClipOval(
                      child: Image.asset(
                        'Images/avatar.png',
                      ),
                    ),
                  ),
                );
              } else if (snapshot.hasError) {
                return UserAccountsDrawerHeader(
                  accountName: const Text('Error'),
                  accountEmail: const Text('Error'),
                  currentAccountPicture: CircleAvatar(
                    child: ClipOval(
                      child: Image.asset(
                        'Images/avatar.png',
                      ),
                    ),
                  ),
                );
              } else {
                final name = snapshot.data?[0] ?? 'John Doe';
                final email = snapshot.data?[1] ?? 'XQW0s@example.com';
                return UserAccountsDrawerHeader(
                  onDetailsPressed: () => routingProvider.setIndex(3),
                  accountName: Text(
                    name,
                    style: GoogleFonts.montserrat(
                      fontSize: 20,
                    ),
                  ),
                  accountEmail: Text(
                    email,
                    style: GoogleFonts.montserrat(
                      fontSize: 15,
                    ),
                  ),
                  currentAccountPicture: CircleAvatar(
                    child: ClipOval(
                      child: Image.asset(
                        'Images/avatar.png',
                      ),
                    ),
                  ),
                  decoration: BoxDecoration(
                    image: DecorationImage(
                        image: Image.asset('Images/drawer.jpg').image,
                        fit: BoxFit.cover),
                  ),
                );
              }
            },
          ),
          ListTile(
            leading: const Icon(Icons.person),
            title: const Text('Profile'),
            onTap: () {
              routingProvider.setIndex(3);
            },
          ),
          ListTile(
            leading: const Icon(Icons.home),
            title: const Text('Home'),
            onTap: () {
              routingProvider.setIndex(0);
            },
          ),
          ListTile(
            leading: const Icon(Icons.location_on),
            title: const Text('Our Locations'),
            onTap: () {
              routingProvider.setIndex(1);
            },
          ),
          ListTile(
            leading: const Icon(Icons.search),
            title: const Text('Discover our menu'),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const Menu()),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.favorite),
            title: const Text('Favorite'),
            onTap: () {
              // TODO: Add favourite page
            },
          ),
          ListTile(
            leading: const Icon(Icons.logout),
            title: const Text('Logout'),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => Loginpage()),
              );
            },
          ),
        ],
      ),
    );
  }
}
