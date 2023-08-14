import { Camera, CameraType } from "expo-camera";
import { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";

export function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const CameraRef = useRef();

  const [ratioExpanded, setRatioExpanded] = useState(false);

  const radioWidth = useRef(new Animated.Value(100)).current;

  function expandWidth() {
    setRatioExpanded(true);
    Animated.timing(radioWidth, {
      toValue: 200,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  function shrinkWidth() {
    setRatioExpanded(false);
    Animated.timing(radioWidth, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePic() {
    const newPhoto = await CameraRef.current.takePictureAsync();
    console.log(newPhoto);
  }

  return (
    <View style={styles.container}>
      <Camera ref={CameraRef} type={type} flashMode="on" style={styles.camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePic}>
            <Text style={styles.text}>take pic</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => (ratioExpanded ? shrinkWidth() : expandWidth())}
        >
          <Animated.View
            style={{
              borderRadius: 20,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              width: radioWidth,
              padding: 20,
              margin: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>4:3</Text>
          </Animated.View>
        </TouchableOpacity>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF69B4",
  },
});
