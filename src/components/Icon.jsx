import { View, Text } from "react-native"

// This is a simple icon component that would normally use a library like react-native-vector-icons
// For this example, we're just creating a placeholder
const Icon = ({ name, size, color, fill }) => {
  // In a real app, you would use:
  // import Icon from 'react-native-vector-icons/Feather';
  // return <Icon name={name} size={size} color={color} />;

  // For this example, we'll just return a placeholder
  let content = ""

  if (name === "chevron-left") {
    content = "<"
  } else if (name === "heart") {
    content = "♥"
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: fill || "transparent",
      }}
    >
      <Text style={{ color, fontSize: size * 0.8 }}>{content}</Text>
    </View>
  )
}

export default Icon

