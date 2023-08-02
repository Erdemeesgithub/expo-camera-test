import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export function MediaScreen() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [photos, setPhotos] = useState([]);

  async function loadInitialPhotos() {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: ["creationTime]"],
      first: 20,
    });
    setPhotos(media.assets);
  }
  useEffect(() => {
    if (permissionResponse && permissionResponse.granted) {
      loadInitialPhotos();
    }
  }, [permissionResponse]);

  if (!permissionResponse) {
    return <View />;
  }

  const { granted, canAskAgain } = permissionResponse;

  if (!granted && canAskAgain) {
    <View style={styles.container}>
      <Button onPress={requestPermission} title="grant permission">
        <Text>Request permission</Text>
      </Button>
    </View>;
  }

  if (!granted && !canAskAgain) {
    return (
      <View>
        <Text>Zuvshuurul ugugu bn</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={{ gap: 10 }}>
        {photos.map((photo) => (
          <Image
            source={{ uri: photo.uri }}
            style={{ backgroundColor: "#ccc", width: 100, height: 100 }}
          />
        ))}
      </View>
    </View>
  );
}
