import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Alert } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons";
import { Dimensions } from "react-native";
import { auth, db } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await signOut(auth);
              navigation.replace("Welcome");
            } catch (error) {
              console.error("Error signing out:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Icon name="logout" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.userInfo}>
        <View style={styles.infoRow}>
          <Icon name="person" style={styles.icon} />
          <Text style={[styles.infoText, styles.name]}>{userData?.name || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="email" style={styles.icon} />
          <Text style={[styles.infoText, styles.email]}>{userData?.email || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="location-on" style={styles.icon} />
          {userData?.address ? (
            <Text style={[styles.infoText, styles.address]}>{userData.address}</Text>
          ) : (
            <Text style={styles.noAddress}>No address set!</Text>
          )}
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.ordersSection}>
        <Text style={styles.sectionTitle}>Previous Orders</Text>
        <View style={styles.orderCard}>
          <View style={styles.orderImage}>
            <Image source={require('../assets/cheese_pizza.webp')} style={styles.orderImage} />
          </View>
          <View style={styles.orderDetails}>
            <Text style={styles.orderNumber}>Order #12345</Text>
            <Text style={styles.orderName}>Cheese Pizza</Text>
            <Text style={styles.orderTotal}>Total: $45.99</Text>
          </View>
        </View>
        <View style={styles.orderCard}>
          <View style={styles.orderImage}>
            <Image source={require('../assets/cheese_pizza.webp')} style={styles.orderImage} />
          </View>
          <View style={styles.orderDetails}>
            <Text style={styles.orderNumber}>Order #12346</Text>
            <Text style={styles.orderName}>Cheese Pizza</Text>
            <Text style={styles.orderTotal}>Total: $29.99</Text>
          </View>
        </View>
        <Text style={styles.showMoreButton}>Show More</Text>
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.03,
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 10
  },
  signOutButton: {
    backgroundColor: "#B55638",
    width: 45,
    height: 45,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#0f0e0d",
  },
  divider: {
    height: 1,
    backgroundColor: "#DDD",
    marginVertical: 10,
    width: "90%",
    alignSelf: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.06,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: "#868686",
    textAlign: "center",
  },
  userInfo: {
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.02,
  },
  name: { 
    fontSize: 20, 
    fontWeight: "bold" 
  },
  email: { 
    fontSize: 16, 
    color: "#555" 
  },
  address: { 
    fontSize: 14, 
    color: "#777" 
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.015,
  },
  icon: {
    fontSize: width * 0.06,
    marginRight: width * 0.03,
    color: "#B55638",
  },
  infoText: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#333333",
  },
  ordersSection: {
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.02,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#0f0e0d",
    marginBottom: height * 0.015,
  },
  orderCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: width * 0.03,
    borderRadius: width * 0.02,
    marginBottom: height * 0.015,
  },
  orderImage: {
    width: width * 0.2,
    height: width * 0.2,
    marginRight: width * 0.03,
  },
  orderDetails: {
    flex: 1,
  },
  orderNumber: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: "#333333",
  },
  orderName: {
    fontSize: width * 0.035,
    color: "#777",
    marginTop: 5,
  },
  orderTotal: {
    fontSize: width * 0.035,
    color: "#666666",
  },
  showMoreButton: {
    fontSize: width * 0.04,
    color: "#007bff",
    textAlign: "center",
    marginTop: height * 0.015,
  },
});

export default ProfileScreen

