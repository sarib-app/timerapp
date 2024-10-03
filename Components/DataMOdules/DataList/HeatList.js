import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';

import DataListStyle from './DataListStyles';
import GlobalStyles from '../../../Global/Branding/GlobalStyles';
import { AntDesign, Entypo, Fontisto, MaterialIcons, Octicons } from '@expo/vector-icons';
import { WindowHeight, WindowWidth } from '../../../Global/components/Dimensions';
import Colors from '../../../Global/Branding/colors';
import SmallbtnII from '../../../Global/components/SmallBtnII';
import AddSessionMenu from '../../Modals/HeatMenu';
import AddHeatSegments from '../../Modals/AddHeatSegments';
import { dataSAmple } from '../../datasample';
import saveHeatData from '../../../Global/Calls/SaveHeat';
import fetchHeatData from '../../../Global/Calls/getHeats';
import RoundBtn from '../../../Global/Branding/RoundBtn';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import addSoundToTimeSegment from '../../../Global/Calls/SaveSounds';
import launchHeat from '../../../Global/Calls/ChangeLaunch';
import updateSegmentInHeatByIndex from '../../../Global/Calls/UpdateHeat';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import { Recording } from 'expo-av/build/Audio';
import { startRecordingasync, stopRecordingasync, uploadAudioasync } from '../../../Global/REcordings/Recording_controller';
import updateSoundInTimeSegment from '../../../Global/Calls/UpdateAudioData';
export default function HeatList({route}) {
  const { heatSeries } = route.params;
  const navigation = useNavigation()
const [showMenu,setShowMenu]= useState(false)
const [heatData,setHeatData] = useState([])
const [sid,setSid]=useState(heatSeries)

function onSaveSegment_record(val){
  setShowMenu(false)
  // saveHeatData(segmentID,val)


saveHeatData(sid,val).then(heatSeries => {
    if (heatSeries !== null) {
        console.log(`Data saved for heat_series: ${heatSeries}`);
        setSid(heatSeries)
        getHeatData(heatSeries)

    } else {
        console.log('Failed to save heat data.');
    }
});

}



useEffect(()=>{

  getHeatData(sid)

},[sid])

async function onlaunchHeat(){
  console.log(heatData?.id)
  const n = await launchHeat(heatData?.id); // Launch the heat with ID 1
  if(n!=false){
    navigation.goBack()

  }
}
function getHeatData(sid){
  fetchHeatData(sid).then(heatData => {
    if (heatData) {
        console.log('Fetched Heat Data:', heatData);
        setHeatData(heatData)
    } else {
        console.log('No heat data found.');
    }
});
}

function RenderItem({item,index}){

const [cue_at,setCue_at]=useState(10)
const [recording, setRecording] = useState(null);
const [audioPath, setAudioPath] = useState(null);
const [isEdited,setIsEdited]=useState(false)

 async function addSOund(){
  if(cue_at && audioPath){
    const soundData = {
      cue_at: Number(cue_at), // in seconds
      audio: audioPath // replace with actual audio file path or identifier
  };
  
  await addSoundToTimeSegment(sid, index, soundData);

  setAudioPath(null)
  setRecording(null)
setCue_at(10)
  getHeatData(sid)
  setIsEdited(false)

  }
  else{
    Alert.alert("Required", "Make sure you have added both the cue_at value and the audio")
  }
 
  }






  const uploadAudio = async () => {
    const res = await uploadAudioasync()
    setAudioPath(res);
  };
  // Function to start recording audio
  const startRecording = async () => {
   const res = await startRecordingasync()
   setRecording(res);

  };
  // Function to stop recording audio
  const stopRecording = async () => {
    const res = await stopRecordingasync(recording)
    setRecording(null);
    setIsEdited(true)
    setAudioPath(res);
  };


  function RenderSoundOPtions({item,audIdex}){


    const [cue_at,setCue_at]=useState(item.cue_at)
const [recording, setRecording] = useState(null);
const [audioPath, setAudioPath] = useState(item.audio);
const [isEdited,setIsEdited]=useState(false)
    const uploadAudio = async () => {
      const res = await uploadAudioasync()
      setAudioPath(res);
    };
    // Function to start recording audio
    const startRecording = async () => {
     const res = await startRecordingasync()
     setRecording(res);
  
    };
    // Function to stop recording audio
    const stopRecording = async () => {
      const res = await stopRecordingasync(recording)
      setRecording(null);
      setAudioPath(res);
      setIsEdited(true)
    };


    async function updateSound(){
      if(cue_at && audioPath){
        const soundData = {
          cue_at: Number(cue_at), // in seconds
          audio: audioPath // replace with actual audio file path or identifier
      };
      
      await updateSoundInTimeSegment(sid, index,audIdex, soundData);
      setRecording(null)
      setIsEdited(false)

      }
      else{
    Alert.alert("Required", "Make sure you have added both the cue_at value and the audio")
      }
     
      }

      function changeVal(val){
        setCue_at(val)
        setIsEdited(true)
      }


    return(
      <View style={DataListStyle.SessionWrapper_Inner}>
<Text style={DataListStyle.Sessiontxt_inner}>
  Custom Sound {audIdex+1}
</Text>

<View style={GlobalStyles.RowMaker}>
<Text style={DataListStyle.Sessiontxt_inner}>
  CUE AT 
</Text>
<TextInput
  value={cue_at.toString()}
  onChangeText={(e)=> changeVal(e)}
  placeholder='Type Cue Seconds'
  style={[DataListStyle.Sessiontxt_inner,{marginLeft:5}]}
  />
</View>

<Text style={[DataListStyle.Sessiontxt_inner,{color:"transparent"}]}>
  N/A
</Text>

<View style={{flexDirection:'row'}}>
<Text style={[DataListStyle.Sessiontxt_inner]}>
  {/* {item.audio} */}
  Aud file
</Text>
{/* <View style={{flexDirection:'row'}}> */}


    <TouchableOpacity 
    style={{marginLeft:10}}
    onPress={uploadAudio}>
          <Entypo name="upload" size={WindowHeight/32} color={Colors.lightTxt} />
        </TouchableOpacity>

        {/* Record Audio */}
        <TouchableOpacity
          onPress={recording ? stopRecording : startRecording}
          style={{ marginLeft: 10 }}
        >
          <Fontisto name={recording? "pause":"record"} size={WindowHeight/32} color={recording ? Colors.danger : Colors.lightTxt} />
        </TouchableOpacity>
        {
          isEdited &&
          <TouchableOpacity
onPress={()=> updateSound()}
>

<AntDesign name="checkcircle" size={WindowHeight/32} style={{marginLeft:10}}color={Colors.send} />
</TouchableOpacity>
        }
        

{/* </View> */}
{/* <Entypo name="upload" size={WindowHeight/24} color={Colors.lightTxt} />
<Fontisto name="record" size={WindowHeight/24} style={{marginLeft:10}}color={Colors.danger} /> */}
</View>

    </View>
    )
  }


async function updateSegment(){

const updatedSegmentData = {

       duration: Number(duration), // duration in seconds
       play_sequence: play_sequence,
       preload: preload, // true or false
      //  sounds: [] 
};

await updateSegmentInHeatByIndex(heatSeries, index, updatedSegmentData);

Alert.alert("Success","Ipdated successfully")
}
const [id,setId]=useState(item.id)
const [duration,setduration]=useState(item.duration)

const [play_sequence,setplay_sequence]=useState(item.play_sequence)
const [preload,setpreload]=useState(item.preload)


const flexed={
  // padding:20
}

function changeVal(val){
  setCue_at(val)
  setIsEdited(true)
}
  return(
    <View style={DataListStyle.SessionWrapper_parent}>

    <View style={DataListStyle.Segment_Wrapper}>
<Text style={DataListStyle.Sessiontxt}>
  Time Segment {id}
</Text>

<TextInput
value= {duration.toString()}
keyboardType='numeric'
placeholder='add value'
placeholderTextColor={"white"}
onChangeText={(e)=> setduration(e)}
style={[DataListStyle.Sessiontxt,flexed]}
/>


<TouchableOpacity
onPress={()=> setplay_sequence(play_sequence === "down"?"up":"down")}
>

<Text style={DataListStyle.Sessiontxt}>
  {play_sequence}
</Text>
</TouchableOpacity>


<TouchableOpacity
onPress={()=> setpreload((p)=>!p)}
>
<Text style={DataListStyle.Sessiontxt}>
  {preload === false? "NO":"YES"}
</Text>
</TouchableOpacity>
<TouchableOpacity
onPress={()=> updateSegment()}
>

<AntDesign name="checkcircle" size={WindowHeight/32} style={{marginLeft:10}}color={Colors.send} />
</TouchableOpacity>

    </View>
    <View style={[DataListStyle.SessionWrapper_Inner,{backgroundColor:Colors.bgIII}]}>
<Text style={DataListStyle.Sessiontxt_inner}>
  Add cue audio
</Text>
<View style={GlobalStyles.RowMaker}>
<Text style={DataListStyle.Sessiontxt_inner}>
  CUE AT 
</Text>
<TextInput
  value={cue_at.toString()}
  onChangeText={(e)=> changeVal(e)}
  placeholder='Type Cue Seconds'
  style={[DataListStyle.Sessiontxt_inner,{marginLeft:5}]}
  />
</View>

<Text style={[DataListStyle.Sessiontxt_inner,{color:"transparent"}]}>
  N/A
</Text>

<View style={{flexDirection:'row'}}>


    <TouchableOpacity onPress={uploadAudio}>
          <Entypo name="upload" size={WindowHeight/32} color={Colors.lightTxt} />
        </TouchableOpacity>

        {/* Record Audio */}
        <TouchableOpacity
          onPress={recording ? stopRecording : startRecording}
          style={{ marginLeft: 10 }}
        >
          <Fontisto name={recording? "pause":"record"} size={WindowHeight/32} color={recording ? Colors.danger : Colors.lightTxt} />
        </TouchableOpacity>
        {
          isEdited &&
          <TouchableOpacity
onPress={()=> addSOund()}
>

<AntDesign name="checkcircle" size={WindowHeight/32} style={{marginLeft:10}}color={Colors.send} />
</TouchableOpacity>
        }
        

</View>

    </View>

    <FlatList 
data={item.sounds}
renderItem={({item,index})=>{
  return(
    <RenderSoundOPtions item={item} audIdex={index}/>
  )
}}
/>


    
    </View>

  )
}


function SegmentHeader(){
return(
  <View style={DataListStyle.SessionWrapper_Headings}>
<Text style={DataListStyle.Session_heading_txt}>
  Title
</Text>
<Text style={DataListStyle.Session_heading_txt}>
  Duration
</Text>
<Text style={DataListStyle.Session_heading_txt}>
  Count
</Text>
<Text style={DataListStyle.Session_heading_txt}>
  PSO
</Text>
<Text style={DataListStyle.Session_heading_txt}>
  Save
</Text>

</View>
)
}
function onOpenMENU(){
  setShowMenu((p)=> !p)
}
function onSaveSegment(){
  setShowMenu(false)
}

  return (
    <View style={DataListStyle.container}>
   <View
   style={DataListStyle.TitleWrapper}
   >
    
    <SmallbtnII 
OnPress={()=>console.log("dsds")}

hide={true}
/>
<Text style={DataListStyle.MainTitle}>
    ADD HEAT
</Text>

<View style={{flexDirection:'row',alignItems:'center'}}>
  <RoundBtn 
  icon={"plus"}
  onpress={()=>onOpenMENU()}
  />
    <RoundBtn 
  icon={"user"}
  onpress={()=> navigation.navigate("LaneScreen",{heatSeries:sid})}
  />
    <RoundBtn 
  icon={"rocket-launch"}
  onpress={()=> onlaunchHeat()}
  />
</View>
{/* <SmallbtnII 
OnPress={onOpenMENU}
/> */}
</View>

<SegmentHeader/>
<FlatList 
data={heatData.time_segments}
renderItem={({item,index})=>{
  return(
    <RenderItem item={item} index={index}/>
  )
}}
/>
{
  showMenu && 
<AddHeatSegments 

onPress={(e)=>onSaveSegment_record(e)}
/>
}

    </View>
  );
}