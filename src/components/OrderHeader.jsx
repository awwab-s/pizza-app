import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import Heart from 'react-native-vector-icons/AntDesign';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window")

const OrderHeader = ({ isFavorite, setIsFavorite, imgURL }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={width * 0.05} color="#8e8e8e" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.favoriteButton} onPress={() => setIsFavorite(!isFavorite)}>
        {isFavorite ? <Heart
          name="heart"
          size={width * 0.05}
          color={"#d00000"}
        /> : <Heart
          name="hearto"
          size={width * 0.05}
          color={"#d00000"} />}
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image
          source={imgURL}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    paddingVertical: width * 0.04,
  },
  backButton: {
    position: "absolute",
    top: width * 0.08,
    left: width * 0.04,
    zIndex: 10,
    backgroundColor: "white",
    padding: width * 0.03,
    borderRadius: width * 0.1,
  },
  favoriteButton: {
    position: "absolute",
    top: width * 0.08,
    right: width * 0.04,
    zIndex: 10,
    backgroundColor: "white",
    padding: width * 0.03,
    borderRadius: width * 0.1,
    
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: width * 0.375,
  },
})

export default OrderHeader

