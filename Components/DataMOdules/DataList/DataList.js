import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import DataListStyle from './DataListStyles';
import GlobalStyles from '../../../Global/Branding/GlobalStyles';
import { Fontisto, MaterialIcons, Octicons } from '@expo/vector-icons';
import { WindowHeight, WindowWidth } from '../../../Global/components/Dimensions';
import Colors from '../../../Global/Branding/colors';
import SmallbtnII from '../../../Global/components/SmallBtnII';
import AddSessionMenu from '../../Modals/HeatMenu';
import getAllHeatsData from '../../../Global/Calls/getHeat';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { convertSecondsToTime } from '../../../Global/Calls/ConvertToSEconds';
import launchHeat from '../../../Global/Calls/ChangeLaunch';
import removeHeatById from '../../../Global/Calls/deleteData';
import { showDeleteConfirmationAlert } from '../../Modals/ShowDel';


export default function Datalist() {
const [showMenu,setShowMenu]= useState(false)
const navigation = useNavigation()

const [data,setData]=useState([])
const focused = useIsFocused()
useEffect(()=>{

  fetchHeats()
},[focused])

async function fetchHeats() {
  const allHeats = await getAllHeatsData();
  console.log(allHeats);
  setData(allHeats) // This will log all the heats data
}

async function onremoveItem(id){
  await removeHeatById(id)
  fetchHeats()
}

function Btn({clr,icon,onpress}){
  return(
    <TouchableOpacity
    onPress={()=> onpress()}
style={[DataListStyle.IconWrapper,{backgroundColor:clr}]}
>
  {
    icon == "pencil" ? 
<Octicons name={icon} size={WindowHeight/32} color={Colors.FontColorI}/>
:
<Fontisto  name={icon}  size={WindowHeight/32} color={Colors.FontColorI} />

  }
</TouchableOpacity>
  )
}
function RenderItem({item}){

  async function onlaunchHeat(){
    console.log(item?.id)
    const n = await launchHeat(item?.id); // Launch the heat with ID 1
    if(n!=false){
      navigation.goBack()
  
    }
  }

 
  return(
    <>
    {
      item.type ==="heat"?
    <View style={DataListStyle.SessionWrapper}>
<Text style={[DataListStyle.Sessiontxt,{width:WindowWidth/7}]}>
  Heat {item.heat_series}
</Text>
<Text style={[DataListStyle.Sessiontxt,{width:WindowWidth/7}]}>
  {convertSecondsToTime(item.total_duration)}
</Text>
<View style={GlobalStyles.RowMaker}>
<Btn
clr={Colors.danger}
icon={"pencil"}
onpress={()=>navigation.navigate('HeatList', { heatSeries : item.heat_series})}
/>
<View
style={{marginHorizontal:5}}
>

<Btn
clr={Colors.send}
icon={"minus-a"}
onpress={() =>  
    showDeleteConfirmationAlert("this Heat",onremoveItem,item.id)
  // onremoveItem(item.id)

}

/>

</View>

<Btn
clr={Colors.bgIv}
icon={"rocket"}
onpress={()=> onlaunchHeat()}

/>
</View>
    </View>:
     <View style={DataListStyle.SessionWrapper}>
     <Text style={[DataListStyle.Sessiontxt,{width:WindowWidth/7}]}>
       Transition {item.transition_series}
     </Text>
     <Text style={[DataListStyle.Sessiontxt,{width:WindowWidth/7}]}>
       {convertSecondsToTime(item.total_duration)}
     </Text>
     <View style={GlobalStyles.RowMaker}>
     <Btn
     clr={Colors.danger}
     icon={"pencil"}
     onpress={()=>navigation.navigate('TransitionScreen', { trans_series : item.transition_series,id:item.id})}
     />
     <View
     style={{marginHorizontal:5}}
     >
     
     <Btn
     clr={Colors.send}
     icon={"minus-a"}
     onpress={() =>      showDeleteConfirmationAlert("this transition",onremoveItem,item.id)
     }
     
     />
     
     </View>
     
     <Btn
     clr={Colors.bgIv}
     icon={"rocket"}
     onpress={()=> onlaunchHeat()}
     
     />
     </View>
         </View>
    }

    </>

  )
}
function onOpenMENU(){
  setShowMenu((p)=> !p)
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
    HEAT & TRANSITIONS
</Text>

<SmallbtnII 
OnPress={onOpenMENU}
/>
</View>
<FlatList 
data={data}
renderItem={({item})=>{
  return(
    <RenderItem item={item}/>
  )
}}
/>
{
  showMenu && 
<AddSessionMenu 
/>
}

    </View>
  );
}
