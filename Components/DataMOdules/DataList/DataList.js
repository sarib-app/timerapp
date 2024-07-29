import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import DataListStyle from './DataListStyles';
import GlobalStyles from '../../../Global/Branding/GlobalStyles';
import { Fontisto, MaterialIcons, Octicons } from '@expo/vector-icons';
import { WindowHeight, WindowWidth } from '../../../Global/components/Dimensions';
import Colors from '../../../Global/Branding/colors';
import SmallbtnII from '../../../Global/components/SmallBtnII';
import AddSessionMenu from '../../Modals/HeatMenu';


export default function Datalist() {


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
  Heat 1
</Text>
<Text style={DataListStyle.Sessiontxt}>
  1:00
</Text>
<View style={GlobalStyles.RowMaker}>
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
</View>
    </View>
  )
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
OnPress={()=>console.log("dsds")}
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

<AddSessionMenu />

    </View>
  );
}
