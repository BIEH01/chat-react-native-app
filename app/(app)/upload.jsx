import React, { useState } from "react";
import { View, Button, Text, ActivityIndicator, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../context/authContext";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";

const UploadMedia = () => {
  const { user } = useAuth;
  const [uploading, setUploading] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [thumbnailUri, setThumbnailUri] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const selectVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };

  const selectThumbnail = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setThumbnailUri(result.assets[0].uri);
    }
  };

  const uploadMedia = async () => {
    try {
      setUploading(true);
      if (videoUri) {
        await uploadFile(videoUri, "video", setVideoUrl);
      }
      if (thumbnailUri) {
        await uploadFile(thumbnailUri, "thumbnail", setThumbnailUrl);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert("Error", "Failed to upload media: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const uploadFile = async (uri, mediaType, setUrl) => {
    try {
      console.log(`Starting upload for ${mediaType}...`);
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileName = uri.substring(uri.lastIndexOf("/") + 1);
      const storageRef = ref(
        storage,
        `${user.userId}/content/${mediaType}/${Date.now()}-${fileName}`
      );
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed during task:", error);
          Alert.alert("Error", "Upload task failed: " + error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log(`${mediaType} available at`, downloadURL);

          setUrl(downloadURL);

          // Guardar la URL del archivo en Firestore
          const docData = {
            url: downloadURL,
            type: mediaType,
            userId: user.uid,
            timestamp: Date.now(),
          };
          await setDoc(doc(db, `${mediaType}s`, fileName), docData);
        }
      );
    } catch (error) {
      console.error("Error during file upload:", error);
      Alert.alert("Error", "Failed to upload file: " + error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Select Video" onPress={selectVideo} />
      <Button title="Select Thumbnail" onPress={selectThumbnail} />
      <Button
        title="Submit"
        onPress={uploadMedia}
        disabled={uploading || (!videoUri && !thumbnailUri)}
      />
      {uploading && <ActivityIndicator size="large" color="#0000ff" />}
      {videoUrl ? <Text>Video URL: {videoUrl}</Text> : null}
      {thumbnailUrl ? <Text>Thumbnail URL: {thumbnailUrl}</Text> : null}
    </View>
  );
};

export default UploadMedia;
