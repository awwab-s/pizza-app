import { View, StyleSheet } from "react-native"
import SectionHeader from "./SectionHeader"
import RadioButton from "./RadioButton"

const SizeSelector = ({ size, setSize, pizzasize}) => {
  return (
    <View style={styles.container}>
      <SectionHeader title="Choose Size" required={true} />
      
      <View style={styles.optionsContainer}>
        <RadioButton 
          selected={pizzasize === 'small'} 
          label="Small - 6"
          price={`$${size["small"]}`}
          onPress={() => setSize('small')} 
        />
        
        <RadioButton 
          selected={pizzasize === 'medium'} 
          label="Medium - 10" 
          price={`$${size["medium"]}`}
          onPress={() => setSize('medium')} 
        />
        
        <RadioButton 
          selected={pizzasize === 'large'} 
          label="Large - 14" 
          price={`$${size["large"]}`}
          onPress={() => setSize('large')} 
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

