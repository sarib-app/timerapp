import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import DataListStyle from './DataListStyles';
import GlobalStyles from '../../../Global/Branding/GlobalStyles';
import { AntDesign, Fontisto, MaterialIcons, Octicons } from '@expo/vector-icons';
import { WindowHeight, WindowWidth } from '../../../Global/components/Dimensions';
import Colors from '../../../Global/Branding/colors';
import SmallbtnII from '../../../Global/components/SmallBtnII';
import AddSessionMenu from '../../Modals/HeatMenu';
import AddHeatSegments from '../../Modals/AddHeatSegments';


export default function HeatList() {
const [showMenu,setShowMenu]= useState(false)

const data = [
  {
    id:1,
    title:"Heat 1",
    time:"1:00"
  },
  {
    id:2,
    title:"Heat 1",
    time:"1:00"
  },
  
]


function Btn({clr,icon}){
  return(
    <TouchableOpacity
style={[DataListStyle.IconWrapper,{backgroundColor:clr}]}
>
  {
    icon == "pencil" ? 
<Octicons name={icon} size={WindowHeight/20} color={Colors.FontColorI}/>
:
<Fontisto  name={icon}  size={WindowHeight/20} color={Colors.FontColorI} />

  }
</TouchableOpacity>
  )
}
function RenderItem({item}){
  return(
    <View style={DataListStyle.SessionWrapper}>
<Text style={DataListStyle.Sessiontxt}>
  Time Segment 1
</Text>
<Text style={DataListStyle.Sessiontxt}>
  1:00
</Text>
<Text style={DataListStyle.Sessiontxt}>
  down
</Text>

<AntDesign name="checksquareo" size={WindowHeight/18} color={Colors.FontColorI}/>
<Text style={DataListStyle.CustomSoundTst}>
  2 Custom Sound {">"}
</Text>
{/* <View style={GlobalStyles.RowMaker}>
<Btn
clr={Colors.danger}
icon={"pencil"}
/>
<View
style={{marginHorizontal:5}}
>

<Btn
clr={Colors.send}
icon={"minus-a"}
/>

</View>

<Btn
clr={Colors.bgIv}
icon={"rocket"}
/>
</View> */}
    </View>
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
    ADD HEAT
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
<AddHeatSegments 
/>
}

    </View>
  );
}
