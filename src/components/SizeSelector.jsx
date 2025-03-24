import { View, StyleSheet } from "react-native"
import SectionHeader from "./SectionHeader"
import RadioButton from "./RadioButton"

const SizeSelector = ({ size, setSize, pizzasize}) => {
  return (
    <View style={styles.container}>
      <SectionHeader title="Choose Size" required={true} />
      
      <View style={styles.optionsContainer}>
        <RadioButton 
          selected={pizzasize === 'Small'} 
          label={`Small - 6"`}
          price={`Rs. ${size["small"]}`}
          onPress={() => setSize('Small')} 
        />
        
        <RadioButton 
          selected={pizzasize === 'Medium'} 
          label={`Medium - 10"`} 
          price={`Rs. ${size["medium"]}`}
          onPress={() => setSize('Medium')} 
        />
        
        <RadioButton 
          selected={pizzasize === 'Large'} 
          label={`Large - 14"`} 
          price={`Rs. ${size["large"]}`}
          onPress={() => setSize('Large')} 
          isLast={true}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  optionsContainer: {
    marginBottom: 10,
  },
})

export default SizeSelector

