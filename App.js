import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { MediaScreen } from "./components/MediaScreen";
import { CameraScreen } from "./components/cameraScreen";
import { TouchableOpacity, View, Text, ImageBackground } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import gif from "./assets/gif.gif";

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
    <ImageBackground source={gif} resizeMode="cover" style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 32,
          justifyContent: "space-around",
          paddingVertical: 32,
          background: "",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          <MaterialCommunityIcons
            name="camera-plus"
            size={80}
            color="#FF69B4"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Media")}>
          <MaterialIcons name="photo-library" size={80} color="#FF69B4" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
