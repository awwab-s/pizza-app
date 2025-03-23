import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Alert } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Cart from "react-native-vector-icons/Ionicons";

// Import screens
import SplashScreen from "./src/screens/SplashScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CartScreen from "./src/screens/CartScreen";
import SearchScreen from "./src/screens/SearchScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import uploadPizzas from "./src/data/uploadPizzas";
import DetailsScreen from "./src/screens/DetailsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get('window');
const active = width * 0.08;
const inactive = width * 0.06;

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.bottomNavigation,
        tabBarActiveTintColor: "#B55638",
        tabBarInactiveTintColor: "#868686",
        tabBarButton: (props) => <TouchableOpacity {...props} activeOpacity={1} />,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={styles.activeIconContainer}>
                <Icon name="home" size={active} color="#B55638" />
              </View>
            ) : (
              <Icon name="home" size={inactive} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={styles.activeIconContainer}>
                <Cart name="cart-outline" size={active + width * 0.015} color="#B55638" />
              </View>
            ) : (
              <Cart name="cart-outline" size={inactive + width * 0.013} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={styles.activeIconContainer}>
                <Icon name="search" size={active} color="#B55638" />
              </View>
            ) : (
              <Icon name="search" size={inactive} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={styles.activeIconContainer}>
                <Icon name="heart" size={active} color="#B55638" />
              </View>
            ) : (
              <Icon name="heart" size={inactive} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={styles.activeIconContainer}>
                <Icon name="user" size={active} color="#B55638" />
              </View>
            ) : (
              <Icon name="user" size={inactive} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {

  // useEffect(() => {
  //   uploadPizzas();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
    // <DetailsScreen />
  )
}

const styles = StyleSheet.create({
  activeIconContainer: {
    backgroundColor: "#ffffff",
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },

  bottomNavigation: {
    height: height * 0.09,
    backgroundColor: "#0f0e0d",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: height * 0.04,
    // borderTopLeftRadius: 35,
    // borderTopRightRadius: 35,
    // borderRadius: 35,
    // marginHorizontal: width * 0.01,
    // marginBottom: height * 0.01,
  },
  navItem: {
    alignItems: "center",
  },
  navItemActive: {
    alignItems: "center",
  },
})

export default App