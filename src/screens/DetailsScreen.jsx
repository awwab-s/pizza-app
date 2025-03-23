import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '../../firebaseConfig';

const DetailsScreen = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPizzas();
  }, []);

  // Function to fetch pizzas from Firestore
  const fetchPizzas = async () => {
    try {
      const pizzasCollection = collection(db, "pizzas");
      const q = query(pizzasCollection, orderBy("id"));
  
      const pizzasSnapshot = await getDocs(q);
  
      const pizzasList = pizzasSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setPizzas(pizzasList);
    } catch (error) {
      console.error("Error fetching pizzas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to get image from Google Drive URL
  const getGoogleDriveImage = (imageURL) => {
    try {
      const imageId = imageURL.split('/d/')[1].split('/')[0];
      return `https://drive.google.com/uc?export=view&id=${imageId}`;
    } catch (error) {
      console.error("Invalid Google Drive URL:", imageURL);
      return imageURL;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pizza Menu</Text>
      {loading ? <ActivityIndicator size="large" color="#B55638" /> : (
        <FlatList
          data={pizzas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.text}>Category: {item.category?.join(", ")}</Text>

              {/* Display available sizes */}
              <Text style={styles.text}>Available Sizes:</Text>
              {item.size && (
                <View style={styles.sizeContainer}>
                  {Object.entries(item.size).map(([size, price]) => (
                    <Text key={size} style={styles.sizeText}>
                      {size.charAt(0).toUpperCase() + size.slice(1)} - ${price}
                    </Text>
                  ))}
                </View>
              )}

              {/* Display available crusts */}
              <Text style={styles.text}>Base Price: ${item.basePrice}</Text>
              <Text style={styles.text}>Rating: ⭐ {item.rating}</Text>

              <Image source={{ uri: getGoogleDriveImage(item.imageURL) }} style={styles.image} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: "center" },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#ddd', marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  description: { fontSize: 14, color: "#555", marginBottom: 5 },
  text: { fontSize: 16, marginBottom: 3 },
  sizeContainer: { marginVertical: 5 },
  sizeText: { fontSize: 14, color: "#444" },
  image: { width: 120, height: 120, borderRadius: 10, marginTop: 5 },
});
