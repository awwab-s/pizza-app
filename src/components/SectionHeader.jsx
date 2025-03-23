import { View, Text, StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get("window")

const SectionHeader = ({ title, required = false, optional = false }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {required && (
        <View style={styles.requiredBadge}>
          <Text style={styles.requiredText}>REQUIRED</Text>
        </View>
      )}
      {optional && (
        <View style={styles.optionalBadge}>
          <Text style={styles.optionalText}>OPTIONAL</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: width * 0.03,
    marginTop: width * 0.06,
  },
  title: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#0f0e0d",
  },
  requiredBadge: {
    backgroundColor: "#ffd9d9",
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.01,
    borderRadius: width * 0.05,
  },
  requiredText: {
    color: "#d00000",
    fontSize: width * 0.03,
    fontWeight: "bold",
  },
  optionalBadge: {
    backgroundColor: "#e6e6e6",
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.01,
    borderRadius: width * 0.05,
  },
  optionalText: {
    color: "#8e8e8e",
    fontSize: width * 0.03,
    fontWeight: "bold",
  },
})

export default SectionHeader

