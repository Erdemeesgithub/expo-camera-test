import * as MediaLibrary from "expo-media-library";
import { useEffect, useState, Button } from "react";
import gif from "../assets/gif.gif";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

const windowWidth = Dimensions.get("window").width;

const imageWidth = windowWidth * 0.33;
const imageGap = windowWidth * 0.005;

export function MediaScreen() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  async function loadInitialPhotos() {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: ["creationTime"],
      first: 21,
    });
    setPhotos(media.assets);
  }

  async function loadMorePhotos() {
    let media = await MediaLibrary.getAssetsAsync({
      after: photos[photos.length - 1].id,
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: ["creationTime"],
      first: 21,
    });
    setPhotos([...photos, ...media.assets]);
  }

  async function handleUpload() {
    const photo = selectedPhotos[0];

    const info = await MediaLibrary.getAssetInfoAsync(photo);

    console.log({ info });

    const data = new FormData();
    data.append("file", { uri: info.localUri, name: info.filename });
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "daczboj8k");

    fetch("https://api.cloudinary.com/v1_1/daczboj8k/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.secure_url);
      })
      .catch((err) => {
        alert("An Error occured while Uploading");
      });
  }

  useEffect(() => {
    if (permissionResponse && permissionResponse.granted) {
      loadInitialPhotos();
    }
  }, [permissionResponse]);

  if (!permissionResponse) {
    return (
      <View>
        <Text>Bro</Text>
      </View>
    );
  }

  const { granted, canAskAgain } = permissionResponse;

  if (!granted && canAskAgain) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{ backgroundColor: "black", padding: 20, borderRadius: 10 }}
          onPress={requestPermission}
        >
          <Text style={{ color: "white" }}>Request permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!granted && !canAskAgain) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ textAlign: "center", fontSize: 16, lineHeight: 23 }}>
          Zuvshuurul ugugu bn
        </Text>
      </View>
    );
  }

  return (
    <>
      <ImageBackground source={gif} resizeMode="cover" style={{ flex: 1 }}>
        <FlatList
          onEndReached={loadMorePhotos}
          numColumns={3}
          data={photos}
          renderItem={({ item, index }) => (
            <ImageItem
              onSelect={() => setSelectedPhotos([...selectedPhotos, item])}
              onRemove={() =>
                setSelectedPhotos(
                  selectedPhotos.filter((selected) => selected.id !== item.id)
                )
              }
              selected={
                selectedPhotos.findIndex(
                  (selected) => selected.id === item.id
                ) + 1
              }
              photo={item}
              index={index}
            />
          )}
          keyExtractor={(item) => item.uri}
        />
        {selectedPhotos.length > 0 && (
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              right: 20,
              backgroundColor: "#FF69B4",
              padding: 10,
              alignItems: "center",
              borderRadius: 30,
            }}
            onPress={handleUpload}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Send
            </Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </>
  );
}

function ImageItem({ photo, index, onSelect, onRemove, selected }) {
  const marginHorizontal = index % 3 === 1 ? imageGap : 0;

  return (
    <TouchableOpacity onPress={() => (selected ? onRemove() : onSelect())}>
      <View
        style={{
          width: imageWidth,
          height: imageWidth,
          marginBottom: imageGap,
          marginHorizontal,
          position: "relative",
        }}
      >
        <Image
          source={{ uri: photo.uri }}
          style={{
            backgroundColor: "#eee",
            width: imageWidth,
            height: imageWidth,
          }}
        />
        {!!selected && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255,255,255,0.6",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "blue",
                width: 30,
                height: 30,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>{selected}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
