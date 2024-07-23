import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text, Alert, Modal, Pressable, Platform, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { WindowWidth } from './Dimensions';
import Colors from '../Branding/colors';
import GlobalStyles from '../Branding/GlobalStyles';
const { width, height } = Dimensions.get('window');

// Calculate the aspect ratio based on the screen dimensions
const aspectRatio = width / height;


const ImageUpload = ({ onSelect,value }) => {
  const [image, setImage] = useState(null);
  const [showModal, setModal] = useState(false);


  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this app to access your photos!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [4, 3],
      base64:true,

      quality: 1,
    });

    if (!result.canceled) {
        onSelect(result.assets[0].uri,result.assets[0].base64);
        setModal(false)
    }
  };




  const onSelectLiveImage =async () => {
  
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this app to access your camera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64:true,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);
    
    if (!result.canceled) {
      const { uri, base64 } = result.assets[0];
  let formattedUri = uri;
  onSelect(formattedUri,base64);
  setModal(false)
  // Check if the platform is iOS
  // if (Platform.OS === 'ios') {
  //   // Handle iOS file path format
  //   formattedUri =  uri.replace('file://', '');
  // }

    }
  };

  function OptionModal(){
    return(
      <Modal
      transparent={true}
      visible={showModal}
      animationType='slide'
      >
        <Pressable
        onPress={()=> setModal(false)}
        style={[GlobalStyles.Container,{backgroundColor:"rgba(0,00,0,0.5)",justifyContent:'center',alignItems:'center'}]}
        >
          <View style={styles.ModalStyle}>
          <Text style={{color:Colors.FontColorI}}>
                Select To Upload Image
              </Text>
            <TouchableOpacity 
            onPress={()=> onSelectLiveImage()}
            style={styles.ModalButton}
            >
              <Text style={{color:Colors.Dark}}>
                Open Camera
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={()=> pickImage()}

            style={styles.ModalButton}
            >
              <Text style={{color:Colors.Dark}}>
                Select From Gallery
              </Text>
            </TouchableOpacity>
          </View>

        </Pressable>

      </Modal>
    )
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>{label}</Text> */}
      <TouchableOpacity style={styles.imagePicker}
      
      // onPress={pickImage}
      onPress={()=> setModal(true)}
      
      >
        {value ? (
          <Image source={{ uri: value }} style={styles.image} />
        ) : (
          <Ionicons name="camera-outline" size={50} color={Colors.PrimaryColor} />
        )}
      </TouchableOpacity>
      <OptionModal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
  },
  ModalButton:{paddingVertical:20,width:WindowWidth/1.3,backgroundColor:Colors.PrimaryColor,borderRadius:40,justifyContent:'center',alignItems:'center',marginTop:10},
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  imagePicker: {
    width: WindowWidth/1.12,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Dark,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  ModalStyle:{backgroundColor:Colors.Dark,width:WindowWidth/1.1,padding:20,paddingVertical:40,borderRadius:20,justifyContent:'center',alignItems:'center'}
});

export default ImageUpload;
