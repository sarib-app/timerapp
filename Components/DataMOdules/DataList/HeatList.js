import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View ,Modal} from 'react-native';

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
import TimeSelectorModal from '../../Modals/TimerPIcker';
import { convertSecondsToTime } from '../../../Global/Calls/ConvertToSEconds';
import { deleteSoundFromTimeSegment } from '../../../Global/Calls/deleteSoundOBject';
import { deleteTimeSegment } from '../../../Global/Calls/deleteTransition';
import { delete_time_segment_index } from '../../../Global/Calls/deleteTime_segment';
import { showDeleteConfirmationAlert } from '../../Modals/ShowDel';
import saveAudioToAppStorage from '../../../Global/Calls/SaveAudio_storage';
// import { Modal } from 'react-native-web';
export default function HeatList({route}) {
  const { heatSeries } = route.params;
  const navigation = useNavigation()
const [showMenu,setShowMenu]= useState(false)
const [heatData,setHeatData] = useState([])
const [sid,setSid]=useState(heatSeries)
const [duration,setDuration]=useState(60)
const [Newduration,setNewDuration]=useState(60)

const [showTimeMOdal,setShowTimeMOdal]=useState(false)

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


async function onSowTimeMOdal(val){
  await changeNewduration(val)
  setShowTimeMOdal(true)
}
async function changeNewduration(val){

  setNewDuration(val)
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
const [showDUrationTImer,setSHowDurationTImer]=useState(false)
const [show_CUeTimer,setShow_CueTimer]=useState(false)


const [id,setId]=useState(item.id)
const [duration,setduration]=useState(item.duration)
const [showTimeMOdal,setShowTimeMOdal]=useState(false)

const [play_sequence,setplay_sequence]=useState(item.play_sequence)
const [preload,setpreload]=useState(item.preload)


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
    if (!res) {
      return
    }
    const uri = await saveAudioToAppStorage(res)
    
    setAudioPath(uri);
    setRecording(null);
    setIsEdited(true)
  };
  // Function to start recording audio
  const startRecording = async () => {
   const res = await startRecordingasync()

   setRecording(res);

  };
  // Function to stop recording audio
  const stopRecording = async () => {
    const res = await stopRecordingasync(recording)

    const uri = await saveAudioToAppStorage(res)
    setRecording(null);
    setIsEdited(true)
    setAudioPath(uri);
  };


  function RenderSoundOPtions({item,audIdex}){

    const [showTimeMOdal,setShowTimeMOdal]=useState(false)

    const [cue_at,setCue_at]=useState(item.cue_at)
const [recording, setRecording] = useState(null);
const [audioPath, setAudioPath] = useState(item.audio);
const [isEdited,setIsEdited]=useState(false)
    const uploadAudio = async () => {
      const res = await uploadAudioasync()
      // setAudioPath(res);
      console.log("up",res)
      if (!res) {
        return
      }
      console.log("below",res)

      const uri = await saveAudioToAppStorage(res)
      setAudioPath(uri);
      setRecording(null);
      setIsEdited(true)
    };
    // Function to start recording audio
    const startRecording = async () => {
     const res = await startRecordingasync()
     setRecording(res);
  
    };
    // Function to stop recording audio
    const stopRecording = async () => {
      const res = await stopRecordingasync(recording)
      const uri = await saveAudioToAppStorage(res)
      setRecording(null);
      setAudioPath(uri);
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







async function deleteSOund(){
  await deleteSoundFromTimeSegment(sid,index,audIdex)
  getHeatData(sid)

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
{/* <TextInput
  value={cue_at.toString()}
  onChangeText={(e)=> changeVal(e)}
  placeholder='Type Cue Seconds'
  style={[DataListStyle.Sessiontxt_inner,{marginLeft:5}]}
  /> */}
  <Text
  style={[DataListStyle.Sessiontxt_inner,{marginLeft:5}]}
  onPress={()=> setShowTimeMOdal(true)}
  >
{convertSecondsToTime(cue_at)}
  </Text>
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


        <TouchableOpacity
onPress={()=> 
  // deleteSOund()
  showDeleteConfirmationAlert("this transition",deleteSOund,"null")
}
>

<AntDesign name="minuscircle" size={WindowHeight/32} style={{marginLeft:10}}color={Colors.danger} />
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
{
  showTimeMOdal && 
  <TimeSelectorModal
  showTimeMOdal={showTimeMOdal}
  onClose={()=>setShowTimeMOdal(false)}
  onTimeSelected={(e)=>{
    setShowTimeMOdal(false)
setCue_at(e)
setIsEdited(true)
  }}
  duration={cue_at}
  />
}

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


const flexed={
  // padding:20
}

function changeVal(val){
  setCue_at(val)
  setIsEdited(true)
}

async function ondeleteTimeSegment(){
  await delete_time_segment_index(sid,index)
  getHeatData(sid)
}

function setTimer(e){
  setShowTimeMOdal(false)
  if(showDUrationTImer){
    setduration(e)
    setSHowDurationTImer(false)

  }
  else{
    setCue_at(e)
    setShow_CueTimer(e)
    setIsEdited(true)
  }
}


  return(
    <View style={DataListStyle.SessionWrapper_parent}>

    <View style={DataListStyle.Segment_Wrapper}>
<Text style={DataListStyle.Sessiontxt}>
  Time Segment {id}
</Text>

{/* <TextInput
value= {duration.toString()}
keyboardType='numeric'
placeholder='add value'
placeholderTextColor={"white"}
onChangeText={(e)=> setduration(e)}
style={[DataListStyle.Sessiontxt,flexed]}
/> */}
<Text
style={[DataListStyle.Sessiontxt]}
onPress={()=> {
  setSHowDurationTImer(true)
  setShowTimeMOdal(true)}}
>
  {convertSecondsToTime(duration)}
</Text>


<TouchableOpacity
onPress={()=> setplay_sequence(play_sequence === "down"?"up":"down")}
>

<Text style={DataListStyle.Sessiontxt}>
  {play_sequence}
</Text>
</TouchableOpacity>


{/* <TouchableOpacity
onPress={()=> setpreload((p)=>!p)}
>
<Text style={DataListStyle.Sessiontxt}>
  {preload === false? "NO":"YES"}
</Text>
</TouchableOpacity> */}
<TouchableOpacity
onPress={()=>
  //  ondeleteTimeSegment()
   showDeleteConfirmationAlert("this transition",ondeleteTimeSegment,"null")



}
>

<AntDesign name="minuscircle" size={WindowHeight/32} style={{marginLeft:10}}color={Colors.danger} />
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
<TouchableOpacity style={GlobalStyles.RowMaker}>
<Text style={DataListStyle.Sessiontxt_inner}>
  CUE AT 
</Text>
{/* <TextInput
  value={cue_at.toString()}
  onChangeText={(e)=> changeVal(e)}
  placeholder='Type Cue Seconds'
  style={[DataListStyle.Sessiontxt_inner,{marginLeft:5}]}
  /> */}
  <Text
onPress={()=>{
  setShowTimeMOdal(true)
  setShow_CueTimer(true)
}}
    style={[DataListStyle.Sessiontxt_inner,{marginLeft:5}]}

  >
    {convertSecondsToTime(cue_at)}
  </Text>
</TouchableOpacity>

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
{
  showTimeMOdal && 
  <TimeSelectorModal
  showTimeMOdal={showTimeMOdal}
  onClose={()=>setShowTimeMOdal(false)}
  onTimeSelected={(e)=>{
    setTimer(e)
  }}
  duration={showDUrationTImer? duration:cue_at}
  />
}



    
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
{/* <Text style={DataListStyle.Session_heading_txt}>
  PSO
</Text> */}
<Text style={DataListStyle.Session_heading_txt}>
  Remove
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
onPressDuration={()=> onSowTimeMOdal(duration)}
duration={duration}
data={heatData}
/>
}


{
  showTimeMOdal && 
  <TimeSelectorModal
  showTimeMOdal={showTimeMOdal}
  onClose={()=>setShowTimeMOdal(false)}
  onTimeSelected={(e)=>{
   setShowTimeMOdal(false)
   setDuration(e)
  }}
  duration={Newduration}
  />
}
{/* <Modal
visible={true}
transparent={false}
animationType='slide'
supportedOrientations={['landscape', 'landscape-left', 'landscape-right']}
statusBarTranslucent={true}
>
  <View style={{width:WindowWidth,height:WindowHeight,backgroundColor:'yellow'}}>

  </View>

</Modal> */}


    </View>
  );
}