import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import DataListStyle from './DataListStyles';
import GlobalStyles from '../../../Global/Branding/GlobalStyles';
import { Entypo, Fontisto, MaterialIcons, Octicons } from '@expo/vector-icons';
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
import LaunchBtton from '../../../Global/components/LaunchButton';



export default function TransitionScreen({route}) {
const [showMenu,setShowMenu]= useState(false)
const navigation = useNavigation()
const { trans_series } = route.params;
const { id } = route.params;

const[t_series,setT_series]=useState(trans_series)
const [data,setData]=useState([])
const [duration,setDUration]=useState("")
const [cueTime,setCUeTime] =useState("")
const [video,setVideo]=useState("cid-000")


async function onlaunch(){
await launchHeat(id)
}
useEffect(()=>{
getTRansition(trans_series)
},[])


async function UpdateorAdd(){
  const data = {
    video_file:video,
    cue_at:cueTime,
    duration:duration
  }
  const res = await addOrUpdateTransition(t_series,data)
  if (res){
  
    setT_series(res)
    getTRansition(res)
  }

  
}



async function getTRansition(t_series){
  const res = await getTimeSegmentsForTransition(t_series)
if(res){
  setData(res)
}
}
const renderItems = ({item}) => (
  <View style={DataListStyle.SessionWrapper}>
  <Text style={DataListStyle.Sessiontxt}>
   Custom Video Option
  </Text>
  <View style={GlobalStyles.RowMaker}>

  <Text style={DataListStyle.Sessiontxt}>
    Cue at 
  </Text>
  <Text style={DataListStyle.Sessiontxt}>
    {convertSecondsToTime(item.cue_at)}
  </Text> 
  </View>

 

  <Text style={DataListStyle.Sessiontxt}>
    {convertSecondsToTime(item.duration)}
  </Text>
 
  <Text style={DataListStyle.Sessiontxt}>
    Video 000
  </Text>

      </View>
)

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
    Add Transition
</Text>

<LaunchBtton 
OnPress={()=> onlaunch()}
/>
</View>
<View style={DataListStyle.SessionWrapper}>
<Text style={DataListStyle.Sessiontxt}>
 Custom Video Option
</Text>
<View style={GlobalStyles.RowMaker}>

<Text style={DataListStyle.Sessiontxt}>
  Cue at
</Text>
<TextInput
value={cueTime}
placeholder='add cue'
onChangeText={(e)=> setCUeTime(e)}
placeholderTextColor={Colors.FontColorI}
style={[DataListStyle.Sessiontxt,{marginLeft:5}]}
/>
</View>
<TextInput
value={duration}
placeholder='add duration'
onChangeText={(e)=> setDUration(e)}
placeholderTextColor={Colors.FontColorI}
style={[DataListStyle.Sessiontxt,{marginLeft:5}]}
/>
<View style={GlobalStyles.RowMaker}>
<Entypo name="upload" size={WindowHeight/24} color={Colors.lightTxt} />
<TouchableOpacity
// onPress={()=> addSOund()}
>

<Fontisto name="record" size={WindowHeight/24} style={{marginLeft:10}}color={Colors.danger} />

</TouchableOpacity>
{/* on pressing this button save the transition */}
<TouchableOpacity 
onPress={()=> UpdateorAdd()}
>

<Fontisto name="submit" size={WindowHeight/24} style={{marginLeft:10}}color={Colors.danger} />
</TouchableOpacity>

</View>
    </View>


    <FlatList 
    data={data}
    renderItem={renderItems}
    />

    </View>
  );
}
