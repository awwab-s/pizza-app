import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.infoRow}>
          <Icon name="person" style={styles.icon} />
          <Text style={styles.infoText}>John Doe</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="email" style={styles.icon} />
          <Text style={styles.infoText}>johndoe@example.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="location-on" style={styles.icon} />
          <Text style={styles.infoText}>123 Main Street, Cityville</Text>
        </View>
      </View>
      <View style={styles.ordersSection}>
        <Text style={styles.sectionTitle}>Previous Orders</Text>
        <View style={styles.orderCard}>
          <View style={styles.orderImage}>
            <Image source={require('../assets/welcome_pizza.png')} style={styles.orderImage} />
          </View>
          <View style={styles.orderDetails}>
            <Text style={styles.orderNumber}>Order #12345</Text>
            <Text style={styles.orderTotal}>Total: $45.99</Text>
          </View>
        </View>
        <View style={styles.orderCard}>
          <View style={styles.orderImage}>
            <Image source={require('../assets/welcome_pizza.png')} style={styles.orderImage} />
          </View>
          <View style={styles.orderDetails}>
            <Text style={styles.orderNumber}>Order #12346</Text>
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
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#0f0e0d",
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
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.015,
  },
  icon: {
    fontSize: width * 0.05,
    marginRight: width * 0.03,
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
    width: width * 0.12,
    height: width * 0.12,
    backgroundColor: "#e0e0e0",
    borderRadius: width * 0.02,
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

