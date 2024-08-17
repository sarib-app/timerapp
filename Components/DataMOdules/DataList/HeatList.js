import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

export default function HeatList() {
const [showMenu,setShowMenu]= useState(false)
const [duration,setDuration] = useState("")
const [heatData,setHeatData] = useState([])
const segmentID= null
const [sid,setSid]=useState(segmentID)
const [pod,setPod]=useState(false)
const [countDown,setCOuntDownn] = useState("down")
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

function RenderItem({item}){
  function RenderSoundOPtions({item}){
    return(
      <View style={DataListStyle.SessionWrapper_Inner}>
<Text style={DataListStyle.Sessiontxt_inner}>
  Custom Sound Option
</Text>
<Text style={DataListStyle.Sessiontxt_inner}>
  CUE AT {item.cue_at}
</Text>
<Text style={[DataListStyle.Sessiontxt_inner,{color:"transparent"}]}>
  N/A
</Text>

<View style={{flexDirection:'row'}}>

<Entypo name="upload" size={WindowHeight/24} color={Colors.lightTxt} />
<Fontisto name="record" size={WindowHeight/24} style={{marginLeft:10}}color={Colors.danger} />
</View>

    </View>
    )
  }
  return(
    <View style={DataListStyle.SessionWrapper_parent}>

    <View style={DataListStyle.Segment_Wrapper}>
<Text style={DataListStyle.Sessiontxt}>
  Time Segment {item.id}
</Text>
<Text style={DataListStyle.Sessiontxt}>
  {item.duration}
</Text>
<Text style={DataListStyle.Sessiontxt}>
  {item.play_sequence}
</Text>


<Text style={DataListStyle.Sessiontxt}>
  {item.preload === false? "NO":"YES"}
</Text>
    </View>
    

    <FlatList 
data={item.sounds}
renderItem={({item})=>{
  return(
    <RenderSoundOPtions item={item}/>
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

<SmallbtnII 
OnPress={onOpenMENU}
/>
</View>

<SegmentHeader/>
<FlatList 
data={heatData.time_segments}
renderItem={({item})=>{
  return(
    <RenderItem item={item}/>
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