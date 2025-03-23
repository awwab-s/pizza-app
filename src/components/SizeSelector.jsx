import { View, StyleSheet } from "react-native"
import SectionHeader from "./SectionHeader"
import RadioButton from "./RadioButton"

const SizeSelector = ({ size, setSize, prices }) => {
  return (
    <View style={styles.container}>
      <SectionHeader title="Choose Size" required={true} />
      
      <View style={styles.optionsContainer}>
        <RadioButton 
          selected={size === 'small'} 
          label="Small - 6"
          price={`${prices.small}`}
          onPress={() => setSize('small')} 
        />
        
        <RadioButton 
          selected={size === 'medium'} 
          label="Medium - 10" 
          price={`$${prices.medium}`}
          onPress={() => setSize('medium')} 
        />
        
        <RadioButton 
          selected={size === 'large'} 
          label="Large - 14" 
          price={`$${prices.large}`}
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

