import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { MediaScreen } from "./components/MediaScreen";
import { CameraScreen } from "./components/cameraScreen";
import { TouchableOpacity, View, Text } from "react-native";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Media" component={MediaScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        gap: 32,
        justifyContent: "space-around",
        paddingVertical: 32,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
        <Text>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Media")}>
        <Text>Media</Text>
      </TouchableOpacity>
    </View>
  );
}
