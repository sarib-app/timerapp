// import React, { useEffect, useState } from 'react';
// import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// import DataListStyle from './DataListStyles';
// import GlobalStyles from '../../../Global/Branding/GlobalStyles';
// import { Entypo, Fontisto, MaterialIcons, Octicons } from '@expo/vector-icons';
// import { WindowHeight, WindowWidth } from '../../../Global/components/Dimensions';
// import Colors from '../../../Global/Branding/colors';
// import SmallbtnII from '../../../Global/components/SmallBtnII';
// import AddSessionMenu from '../../Modals/HeatMenu';
// import getAllHeatsData from '../../../Global/Calls/getHeat';
// import { useNavigation } from '@react-navigation/native';
// import { convertSecondsToTime } from '../../../Global/Calls/ConvertToSEconds';
// import launchHeat from '../../../Global/Calls/ChangeLaunch';
// import { TextInput } from 'react-native-gesture-handler';
// import { addOrUpdateTransition } from '../../../Global/Calls/addorUpdateTransition';
// import { getTimeSegmentsForTransition } from '../../../Global/Calls/getTransition';
// import LaunchBtton from '../../../Global/components/LaunchButton';



// export default function TransitionScreen({route}) {
// const [showMenu,setShowMenu]= useState(false)
// const navigation = useNavigation()
// const { trans_series } = route.params;
// const { id } = route.params;

// const[t_series,setT_series]=useState(trans_series)
// const [data,setData]=useState([])
// const [duration,setDUration]=useState("")
// const [cueTime,setCUeTime] =useState("")
// const [video,setVideo]=useState("cid-000")


// async function onlaunch(){
// await launchHeat(id)
// }
// useEffect(()=>{
// getTRansition(trans_series)
// },[])


// async function UpdateorAdd(){
//   const data = {
//     video_file:video,
//     cue_at:cueTime,
//     duration:duration
//   }
//   const res = await addOrUpdateTransition(t_series,data)
//   if (res){
  
//     setT_series(res)
//     getTRansition(res)
//   }

  
// }



// async function getTRansition(t_series){
//   const res = await getTimeSegmentsForTransition(t_series)
// if(res){
//   setData(res)
// }
// }
// const renderItems = ({item}) => (
//   <View style={DataListStyle.SessionWrapper}>
//   <Text style={DataListStyle.Sessiontxt}>
//    Custom Video Option
//   </Text>
//   <View style={GlobalStyles.RowMaker}>

//   <Text style={DataListStyle.Sessiontxt}>
//     Cue at 
//   </Text>
//   <Text style={DataListStyle.Sessiontxt}>
//     {convertSecondsToTime(item.cue_at)}
//   </Text> 
//   </View>

 

//   <Text style={DataListStyle.Sessiontxt}>
//     {convertSecondsToTime(item.duration)}
//   </Text>
 
//   <Text style={DataListStyle.Sessiontxt}>
//     Video 000
//   </Text>

//       </View>
// )

//   return (

// <View style={DataListStyle.container}>
//    <View
//    style={DataListStyle.TitleWrapper}
//    >
    
//     <SmallbtnII 
// OnPress={()=>console.log("dsds")}

// hide={true}
// />
// <Text style={DataListStyle.MainTitle}>
//     Add Transition
// </Text>

// <LaunchBtton 
// OnPress={()=> onlaunch()}
// />
// </View>
// <View style={DataListStyle.SessionWrapper}>
// <Text style={DataListStyle.Sessiontxt}>
//  Custom Video Option
// </Text>
// <View style={GlobalStyles.RowMaker}>

// <Text style={DataListStyle.Sessiontxt}>
//   Cue at
// </Text>
// <TextInput
// value={cueTime}
// placeholder='add cue'
// onChangeText={(e)=> setCUeTime(e)}
// placeholderTextColor={Colors.FontColorI}
// style={[DataListStyle.Sessiontxt,{marginLeft:5}]}
// />
// </View>
// <TextInput
// value={duration}
// placeholder='add duration'
// onChangeText={(e)=> setDUration(e)}
// placeholderTextColor={Colors.FontColorI}
// style={[DataListStyle.Sessiontxt,{marginLeft:5}]}
// />
// <View style={GlobalStyles.RowMaker}>

// {/* on clicking this icon let user upload video from gallery/ */}

// <Entypo name="upload" size={WindowHeight/24} color={Colors.lightTxt} />
// <TouchableOpacity
// // onPress={()=> addSOund()}
// >

// {/* on clicking this icon let user open camera and record a video  */}

// <Fontisto name="record" size={WindowHeight/24} style={{marginLeft:10}}color={Colors.danger} />

// </TouchableOpacity>
// {/* on pressing this button save the transition */}
// <TouchableOpacity 
// onPress={()=> UpdateorAdd()}
// >

// <Fontisto name="submit" size={WindowHeight/24} style={{marginLeft:10}}color={Colors.danger} />
// </TouchableOpacity>

// </View>
//     </View>


//     <FlatList 
//     data={data}
//     renderItem={renderItems}
//     />

//     </View>
//   );
// }


import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import DataListStyle from './DataListStyles';
import GlobalStyles from '../../../Global/Branding/GlobalStyles';
import { AntDesign, Entypo, Fontisto, MaterialIcons, Octicons } from '@expo/vector-icons';
import { WindowHeight, WindowWidth } from '../../../Global/components/Dimensions';
import Colors from '../../../Global/Branding/colors';
import SmallbtnII from '../../../Global/components/SmallBtnII';
import AddSessionMenu from '../../Modals/HeatMenu';
import getAllHeatsData from '../../../Global/Calls/getHeat';
import { useNavigation } from '@react-navigation/native';
import { convertSecondsToTime } from '../../../Global/Calls/ConvertToSEconds';
import launchHeat from '../../../Global/Calls/ChangeLaunch';
import { TextInput } from 'react-native-gesture-handler';
import { addOrUpdateTransition } from '../../../Global/Calls/addorUpdateTransition';
import { getTimeSegmentsForTransition } from '../../../Global/Calls/getTransition';
import LaunchButton from '../../../Global/components/LaunchButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TransitionScreen({ route }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation();
  const { trans_series } = route.params;
  const { id } = route.params;
  
  const [t_series, setT_series] = useState(trans_series);
  const [data, setData] = useState([]);
  const [duration, setDuration] = useState('');
  const [cueTime, setCueTime] = useState('');
  const [video, setVideo] = useState('');
  
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  // Request camera permission
  useEffect(() => {
    // AsyncStorage.clear()
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  // Handle launching the heat
  async function onLaunch() {
    // await launchHeat(id);
    navigation.goBack()
  }

  // Fetch the transition data
  useEffect(() => {
    getTransition(trans_series);
  }, []);

  async function updateOrAdd() {
    if(video && cueTime && duration){

    console.log(video)
    const data = {
      video_file: video,
      cue_at: cueTime,
      duration: duration,
    };
    const res = await addOrUpdateTransition(t_series, data);
    if (res) {
      setT_series(res);
      getTransition(res);
      setVideo('')
      setCueTime('')
      setDuration('')
    }
  }
else{
  Alert.alert("Error","PLease fill all information")
}
  }

  async function getTransition(t_series) {
    const res = await getTimeSegmentsForTransition(t_series);
    if (res) {
      setData(res);
    }
  }

  // Function to pick a video from the gallery
  async function pickVideoFromGallery() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
console.log(result)
    if (!result.canceled) {
      setVideo(result.assets[0].uri);
    }
  }

  // Function to record a video
  async function recordVideo() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
    
    if (!result.canceled) {
      console.log(result.canceled)
      setVideo(result.assets[0].uri);
    }
  }

  const renderItems = ({ item }) => (
    <View style={DataListStyle.SessionWrapper}>
      <Text style={DataListStyle.Sessiontxt}>Custom Video</Text>
      <View style={GlobalStyles.RowMaker}>
        <Text style={DataListStyle.Sessiontxt}>Cue at</Text>
        <Text style={DataListStyle.Sessiontxt}>{convertSecondsToTime(item.cue_at)}</Text>
      </View>
      <Text style={DataListStyle.Sessiontxt}>{convertSecondsToTime(item.duration)}</Text>
      <Text style={DataListStyle.Sessiontxt}>Video #000</Text>
    </View>
  );

  return (
    <View style={DataListStyle.container}>
      <View style={DataListStyle.TitleWrapper}>
        <SmallbtnII onPress={() => console.log("dsds")} hide={true} />
        <Text style={DataListStyle.MainTitle}>Add Transition</Text>
        <LaunchButton OnPress={() => onLaunch()} />
      </View>

      <View style={DataListStyle.SessionWrapper}>
        <Text style={DataListStyle.Sessiontxt}>Custom Video</Text>
        <View style={GlobalStyles.RowMaker}>
          <Text style={DataListStyle.Sessiontxt}>Cue at</Text>
          <TextInput
            value={cueTime}
            placeholder="Add cue"
            onChangeText={(e) => setCueTime(e)}
            placeholderTextColor={Colors.FontColorI}
            style={[DataListStyle.Sessiontxt, { marginLeft: 5 }]}
          />
        </View>
        <TextInput
          value={duration}
          placeholder="Add duration"
          onChangeText={(e) => setDuration(e)}
          placeholderTextColor={Colors.FontColorI}
          style={[DataListStyle.Sessiontxt, { marginLeft: 5 }]}
        />
        <View style={GlobalStyles.RowMaker}>
          {/* Upload video from gallery */}
          <TouchableOpacity onPress={pickVideoFromGallery}>
            <Entypo name="upload" size={WindowHeight / 28} color={Colors.lightTxt} />
          </TouchableOpacity>

          {/* Record video */}
          <TouchableOpacity onPress={recordVideo}>
            <Fontisto name="record" size={WindowHeight / 28} style={{ marginLeft: 10 }} color={Colors.danger} />
          </TouchableOpacity>

          {/* Submit the transition */}
          <TouchableOpacity onPress={updateOrAdd}>
            <AntDesign name="checkcircle" size={WindowHeight / 28} style={{ marginLeft: 10 }} color={Colors.send} />

          </TouchableOpacity>
        </View>
      </View>

      <FlatList data={data} renderItem={renderItems} />
    </View>
  );
}

