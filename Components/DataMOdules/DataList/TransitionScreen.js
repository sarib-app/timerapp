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
// const RenderTransitions = ({item}) => (
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
//     renderItem={RenderTransitions}
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
import { addOrUpdateTransition, updateTotalDuration } from '../../../Global/Calls/addorUpdateTransition';
import { getTimeSegmentsForTransition } from '../../../Global/Calls/getTransition';
import LaunchButton from '../../../Global/components/LaunchButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateTransitionSegment } from '../../../Global/Calls/UpdateTransition';
import TimeSelectorModal from '../../Modals/TimerPIcker';
import FullScreenVideoModal from '../../Modals/VIewVideoModal';
import { deleteTimeSegment } from '../../../Global/Calls/deleteTransition';
import saveVideoToAppStorage from '../../../Global/Calls/Create_vid_url';

export default function TransitionScreen({ route }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation();
  const { trans_series } = route.params;
  const { id } = route.params;
  
  const [t_series, setT_series] = useState(trans_series);
  const [data, setData] = useState([]);
  const [All_data, setAll_data] = useState(null);

  const [Totalduration, setTotalDuration] = useState(0);

  const [duration, setDuration] = useState(0);
  const [cueTime, setCueTime] = useState(0);
  const [video, setVideo] = useState(null);
const [showTimeMOdal,setShowTimeMOdal]=useState(false)
const [showCueModal,setShowCueModal]=useState(false)
const [showTotal_durationMOdal,setshowTotal_durationMOdal]=useState(false)

const [showDurationModal,setShowDurationMOdal]=useState(false)
const [showVideoModal,setShowVidModal]=useState(false)


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
if(data.length < 1){
  if(duration){

    submitFUnc() 
  }
else{
  Alert.alert("Error","Make sure you have added duration")
}

}else{

  if(cueTime && video){

    submitFUnc()
 
  }
else{
  Alert.alert("Error","Make sure you have added video and cue_at")
}

}

   
  }

 async function submitFUnc(){
    const data = {
      video_file: video,
      cue_at: cueTime,
      duration: duration,
    };
    const res = await addOrUpdateTransition(t_series, data);
    if (res) {
      setT_series(res);
      getTransition(res);
      setVideo(null)
      setCueTime(0)
      setDuration(0)
    }
  }

  async function getTransition(t_series) {
    const res = await getTimeSegmentsForTransition(t_series);
    if (res) {
      setData(res?.time_segments?res?.time_segments:data );
      setAll_data(res);
      setTotalDuration(res.total_duration)
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
      const uri_finalized= await saveVideoToAppStorage("idd",result.assets[0].uri)

      setVideo(uri_finalized);
    }
  }

  // Function to record a video
  async function recordVideo() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
    console.log(result)
    
    if (!result.canceled) {
      console.log(result.canceled)
      const uri_finalized= await saveVideoToAppStorage("idd",result.assets[0].uri)

      setVideo(uri_finalized);
    }
  }

function hadnleSUbmitTIme(e){
    setShowTimeMOdal(false)
    console.log("vv",e)

  if(showCueModal === true){
    console.log("aa",e)

    setShowCueModal(false)
    setCueTime(e)
  }
  else if(showDurationModal){
    console.log("bb",e)

    setDuration(e)
    setShowDurationMOdal(false)
  }
  else if(showTotal_durationMOdal){
    console.log("ss",e)
    setTotalDuration(e)
    setShowDurationMOdal(false)
  } 
}





async function deleteTransition (segment_index){
 await deleteTimeSegment(t_series,segment_index)
 getTransition(t_series)
}

  
async function updateDUration (){
  await updateTotalDuration(t_series, Totalduration)
  getTransition(t_series)
}

  ///////////////// TRANSITION LIST BELOW ///////////////////////////
 ///////////////// TRANSITION LIST BELOW /////////////////////////////
  ////////////////////////////////////////////////////////



  const RenderTransitions = ({ item ,index}) => {

    // const [duration, setDuration] = useState(item.duration);
    const [duration, setDuration] = useState(0);
    const [showTimeMOdal,setShowTimeMOdal]=useState(false)

    const [cueTime, setCueTime] = useState(item.cue_at);
    const [video, setVideo] = useState(item.video_file);
    const [showVideoModal,setShowVidModal]=useState(false)
    
    async function pickVideoFromGallery() {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      }); 
  console.log(result)
      if (!result.canceled) {

        setEdited(true)


        const uri_finalized= await saveVideoToAppStorage("idd",result.assets[0].uri)

        setVideo(uri_finalized);
      }
    }
  
    // Function to record a video
    async function recordVideo() {
      console.log("dsdd")
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });
      
      if (!result.canceled) {
        console.log(result.canceled)
        setEdited(true)
       const uri_finalized= await saveVideoToAppStorage("idd",result.assets[0].uri)
        setVideo(uri_finalized);
      }
    }
    // const [data]

const [edited,setEdited]=useState(false)
    async function updateTRansition() {
      if(video && cueTime ){
  
      console.log(video)
      const data = {
        video_file: video,
        cue_at: cueTime,
        duration: duration,
      };
      const res = await updateTransitionSegment(trans_series,index, data);
      if (res) {
        setEdited(false)
       
      }
    }
  else{
    Alert.alert("Error","PLease fill all information")
  }
    }


 






    return(
    <View style={DataListStyle.SessionWrapper}>
      <Text style={DataListStyle.Sessiontxt}>Custom Video {index}</Text>
      {/* <View style={GlobalStyles.RowMaker}>
        <Text style={DataListStyle.Sessiontxt}>Cue at</Text>
        <Text style={DataListStyle.Sessiontxt}>{convertSecondsToTime(item.cue_at)}</Text>
      </View> */}

      <View style={GlobalStyles.RowMaker}>
          <Text style={DataListStyle.Sessiontxt}>Cue at</Text>
          {/* <TextInput
            value={cueTime}
            placeholder="Add cue"
            onChangeText={(e) => {
              setCueTime(e)
            setEdited(true)
            }}
            placeholderTextColor={Colors.FontColorI}
            style={[DataListStyle.Sessiontxt, { marginLeft: 5 }]}
          /> */}
          <Text 
          onPress={()=>{
            setShowTimeMOdal(true)
          }}
          style={[DataListStyle.Sessiontxt, { marginLeft: 5 }]}
          >{convertSecondsToTime(cueTime)}</Text>

        </View>
      {/* <Text style={DataListStyle.Sessiontxt}>{convertSecondsToTime(item.duration)}</Text> */}
      {/* <View style={GlobalStyles.RowMaker}>
          <Text style={DataListStyle.Sessiontxt}>Duration </Text>
      <TextInput
          value={duration}
          placeholder="Add duration"
          onChangeText={(e) => {
          setDuration(e)
          setEdited(true)
          }}
          placeholderTextColor={Colors.FontColorI}
          style={[DataListStyle.Sessiontxt, { marginLeft: 5 }]}
        />
          <Text style={DataListStyle.Sessiontxt}> sec</Text>

        </View> */}
      <View style={GlobalStyles.RowMaker}>
      <Text 
        onPress={()=> setShowVidModal(true)}
        style={[DataListStyle.Sessiontxt,{fontWeight:'400',marginRight:5,color:Colors.SeconderyColor,textDecorationLine:'underline'}]}>View Video</Text>
          {/* Upload video from gallery */}
          <TouchableOpacity onPress={pickVideoFromGallery}>
            <Entypo name="upload" size={WindowHeight / 28} color={Colors.lightTxt} />
          </TouchableOpacity>

          {/* Record video */}
          <TouchableOpacity onPress={recordVideo}>
            <Fontisto name="record" size={WindowHeight / 28} style={{ marginLeft: 10 }} color={Colors.deposit} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>deleteTransition(index)}>
            <AntDesign name="minuscircle" size={WindowHeight / 28} style={{ marginLeft: 10 }} color={Colors.danger} />

          </TouchableOpacity>
          {/* Submit the transition */}
          {
            edited &&
          <TouchableOpacity onPress={updateTRansition}>
            <AntDesign name="checkcircle" size={WindowHeight / 28} style={{ marginLeft: 10 }} color={Colors.send} />

          </TouchableOpacity>
          }

        </View>
        {
  showTimeMOdal && 
  <TimeSelectorModal
  showTimeMOdal={showTimeMOdal}
  onClose={()=>setShowTimeMOdal(false)}
  onTimeSelected={(e)=>{
    setCueTime(e)
    setEdited(true)
setShowTimeMOdal(false)
  }}
  duration={cueTime}
  />
}
{
  showVideoModal && 
  <FullScreenVideoModal 
  videoUrl={video}
  isVisible={showVideoModal}
  onClose={()=>{
    setShowVidModal(false)
    
  }}
  />
}
    </View>
  );
  }


  ///////////////// TOTAL RECORD ///////////////////////////



 ///////////////// TOTAL RECORD /////////////////////////////


  ////////////////////////////////////////////////////////

  const Total_RecordInfo = () => {
    return(
      <View style={[DataListStyle.SessionWrapper,{backgroundColor:Colors.PrimaryColor}]}>
      <Text style={DataListStyle.Sessiontxt}>Total transitions: {data?.length - 1}</Text>
    
      <View style={GlobalStyles.RowMaker}>
     
      <Text
      onPress={()=> {
        setShowTimeMOdal(true)
        setshowTotal_durationMOdal(true)
      }}
      style={DataListStyle.Sessiontxt}>Total Duration: {Totalduration || "--"}</Text>

        {/* Submit the transition */}
        <TouchableOpacity onPress={updateDUration}>
          <AntDesign name="checkcircle" size={WindowHeight / 28} style={{ marginLeft: 10 }} color={Colors.send} />

        </TouchableOpacity>
      </View>
    </View>
    )
  }





  ///////////////// MAIN RETURN ///////////////////////////



 ///////////////// MAIN RETURN /////////////////////////////


  ////////////////////////////////////////////////////////



  return (
    <View style={DataListStyle.container}>
      <View style={DataListStyle.TitleWrapper}>
        <SmallbtnII onPress={() => console.log("dsds")} hide={true} />
        <Text style={DataListStyle.MainTitle}>Add Transition</Text>
        <LaunchButton OnPress={() => onLaunch()} />
      </View>
      {
        data?.length > 0 &&

<Total_RecordInfo/>
      }
      <View style={[DataListStyle.SessionWrapper,{backgroundColor:Colors.PrimaryColor}]}>
        <Text style={DataListStyle.Sessiontxt}>Add Transition</Text>
        {
          data.length > 0 &&
        <View style={GlobalStyles.RowMaker}>
          <Text style={DataListStyle.Sessiontxt}>Cue at</Text>
          <Text 
          onPress={()=> {
            setShowTimeMOdal(true)
            setShowCueModal(true)}}
          style={[DataListStyle.Sessiontxt, { marginLeft: 5 }]} >{cueTime}</Text>

          {/* <TextInput
            value={cueTime}
            placeholder="Add cue"
            onChangeText={(e) => setCueTime(e)}
            placeholderTextColor={Colors.FontColorI}
            style={[DataListStyle.Sessiontxt, { marginLeft: 5 }]}
          /> */}
        </View>
        }

        {
          data.length < 1 &&
        // <TextInput
        //   value={duration}
        //   placeholder="Add duration"
        //   onChangeText={(e) => setDuration(e)}
        //   placeholderTextColor={Colors.FontColorI}
        //   style={[DataListStyle.Sessiontxt, { marginLeft: 5 }]}
        // />
        <Text 
        onPress={()=> {
          setShowTimeMOdal(true)
          setShowDurationMOdal(true)}}
        style={[DataListStyle.Sessiontxt, { marginLeft: 5 }]} >{duration?duration:"Add duration"}</Text>

      }

        <View style={GlobalStyles.RowMaker}>
          {/* Upload video from gallery */}
          {
            video && 
        <Text 
        onPress={()=> setShowVidModal(true)}
        style={[DataListStyle.Sessiontxt,{fontWeight:'400',marginRight:5,color:Colors.SeconderyColor,textDecorationLine:'underline'}]}>View Video</Text>
            
          }
          {
          data.length >0 &&
          <>
          <TouchableOpacity onPress={pickVideoFromGallery}>
            <Entypo name="upload" size={WindowHeight / 28} color={Colors.lightTxt} />
          </TouchableOpacity>

          {/* Record video */}
          <TouchableOpacity onPress={recordVideo}>
            <Fontisto name="record" size={WindowHeight / 28} style={{ marginLeft: 10 }} color={Colors.danger} />
          </TouchableOpacity>
          </>
          }
          {/* Submit the transition */}
          <TouchableOpacity onPress={updateOrAdd}>
            <AntDesign name="checkcircle" size={WindowHeight / 28} style={{ marginLeft: 10 }} color={Colors.send} />

          </TouchableOpacity>
        </View>
      </View>

      <FlatList data={data} renderItem={({item,index})=>{

      if(index > 0)  {
          return(
            <RenderTransitions
            item={item}
            index={index}
            />
          )

          
        }
      }


      } />

{
  showTimeMOdal && 
  <TimeSelectorModal
  showTimeMOdal={showTimeMOdal}
  onClose={()=>setShowTimeMOdal(false)}
  onTimeSelected={(e)=>{
    hadnleSUbmitTIme(e)
  }}
  duration={showCueModal?cueTime: showDurationModal?duration: Totalduration}
  />
}

{
  showVideoModal && 
  <FullScreenVideoModal 
  videoUrl={video}
  isVisible={showVideoModal}
  onClose={()=>{
    setShowVidModal(false)
    
  }}
  />
}


    </View>
  );
}

