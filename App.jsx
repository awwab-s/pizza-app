import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Feather";

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
        tabBarActiveTintColor: "#dd714e",
        tabBarInactiveTintColor: "#868686",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <View style={styles.activeIconContainer}>
                <Icon name="home" size={active} color="#dd714e" />
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
                <Icon name="shopping-cart" size={active} color="#dd714e" />
              </View>
            ) : (
              <Icon name="shopping-cart" size={inactive} color={color} />
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
                <Icon name="search" size={active} color="#dd714e" />
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
                <Icon name="heart" size={active} color="#dd714e" />
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
                <Icon name="user" size={active} color="#dd714e" />
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
  )
}

const styles = StyleSheet.create({
  activeIconContainer: {
    backgroundColor: "#ffffff",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },

  bottomNavigation: {
    position: "absolute",
    bottom: height * 0.01,
    marginLeft: width * 0.01,
    marginRight: width * 0.01,
    backgroundColor: "#0f0e0d",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 35,
  },
  navItem: {
    alignItems: "center",
  },
  navItemActive: {
    alignItems: "center",
  },
})

export default App