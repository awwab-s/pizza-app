import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView, ActivityIndicator  } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons";
import { Dimensions } from "react-native";
import { auth, db } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { doc, getDoc, collection, query, orderBy, getDocs, where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isGuest, setIsGuest] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const checkGuestUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user === "guest") {
        setIsGuest(true);
        Alert.alert("Login Required", "Please sign in to view your profile.");
        navigation.replace("SignIn");
      }
    };

    checkGuestUser();
  }, []);

  const fetchUserData = async () => {
    try {
      if (!isGuest) {
        const user = auth.currentUser;
        if (user) {
          setLoadingUserData(true);
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            console.log(userDoc.data());
            setLoadingUserData(false);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserOrders = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.log("No user logged in. No orders to fetch.");
      return;
    }

    setLoadingOrders(true);
    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("user_id", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const ordersList = [];
      querySnapshot.forEach((doc) => {
        ordersList.push({ id: doc.id, ...doc.data() });
      });

      setOrders(ordersList);
      console.log("Fetched order history:", ordersList);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserOrders();
  }, []);

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            setLoading(true);
            try {
              await AsyncStorage.removeItem("user");
              console.log("User removed from AsyncStorage!");
              await signOut(auth);
              navigation.reset({
                index: 0,
                routes: [{ name: "Welcome" }],
              });
            } catch (error) {
              console.error("Error signing out:", error);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleRefresh = async () => {
    setLoadingOrders(true);
    await fetchUserData(); // Refresh user data when the button is pressed
    await fetchUserOrders();
  };

  const handleOrderClick = (orderID) => {
    navigation.navigate("OrderHistory", { orderID });
  };

  const handleShowMore = () => {
    setShowMore(true); // Show all orders when "Show More" is clicked
  };

  const handleShowLess = () => {
    setShowMore(false); // Show only the first 3 orders when "Show Less" is clicked
  };

  const displayedOrders = showMore ? orders : orders.slice(0, 3); // Show up to 3 orders initially

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton} disabled={loading}>
                <Icon name="refresh" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton} disabled={loading}>
              <Icon name="logout" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.userInfo}>
          {loadingOrders ? (
            <ActivityIndicator size="large" color="#B55638" />  // Show loading spinner while fetching orders
          ) : (
            <>
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
                <Text style={[styles.infoText, styles.address]}>{userData?.address || 'No Address Set!'}</Text>
              </View>
            </>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.ordersSection}>
          <Text style={styles.sectionTitle}>Previous Orders</Text>
          {loadingOrders ? (
            <ActivityIndicator size="large" color="#B55638" />  // Show loading spinner while fetching orders
          ) : displayedOrders.length > 0 ? (
            displayedOrders.map((order) => (
              <TouchableOpacity key={order.id} style={styles.orderCard} onPress={() => handleOrderClick(order.id)}>
                <View style={styles.orderImage}>
                  <Image source={require('../assets/card_logo_small.png')} style={styles.orderImage} />
                </View>
                <View style={styles.orderDetails}>
                  <Text style={styles.orderNumber}>Order #{order.id}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No orders found.</Text>
          )}
          {orders.length > 3 && !showMore && (
            <TouchableOpacity onPress={handleShowMore}>
              <Text style={styles.showMoreText}>Show More</Text>
            </TouchableOpacity>
          )}
          {showMore && orders.length > 3 && (
            <TouchableOpacity onPress={handleShowLess}>
              <Text style={styles.showMoreText}>Show Less</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Loading Overlay */}
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#B55638" />
          </View>
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingBottom: height * 0.02,
  },
  header: {
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.03,
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: height * 0.02,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },
  signOutButton: {
    backgroundColor: "#B55638",
    width: 45,
    height: 45,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  refreshButton: {
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
    color: "#777",
    flexShrink: 1,   
    flexWrap: "wrap", 
    width: "100%",
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
    width: width * 0.1,
    height: width * 0.1,
    marginRight: width * 0.03,
  },
  orderDetails: {
    flex: 1,
  },
  orderNumber: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: "#333333",
    marginLeft: width * 0.02,
  },
  showMoreText: {
    fontSize: width * 0.04,
    color: "#007bff",
    textAlign: "center",
    marginTop: height * 0.015,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen

