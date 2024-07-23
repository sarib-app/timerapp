import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeStyles from './HomeStyles';
import Colors from '../../Global/Branding/colors';
import { EvilIcons, Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {


    const data = [
        {
          id: 1,
          title: "Lane 1",
          name: "John Dayn",
          gym: "XYZ Fitness"
        },
        {
          id: 2,
          title: "Lane 2",
          name: "Jane Smith",
          gym: "ABC Gym"
        },
        {
          id: 3,
          title: "Lane 3",
          name: "Mike Johnson",
          gym: "FitLife Center"
        },
        {
          id: 4,
          title: "Lane 4",
          name: "Emily Davis",
          gym: "PowerHouse Gym"
        },
        {
          id: 5,
          title: "Lane 5",
          name: "Chris Lee",
          gym: "Gold's Gym"
        },
        {
          id: 6,
          title: "Lane 6",
          name: "Anna Brown",
          gym: "Anytime Fitness"
        },
        {
          id: 7,
          title: "Lane 7",
          name: "James Wilson",
          gym: "Planet Fitness"
        },
        {
          id: 8,
          title: "Lane 8",
          name: "Sarah Martinez",
          gym: "Crunch Fitness"
        },
        {
          id: 9,
          title: "Lane 9",
          name: "David Garcia",
          gym: "24 Hour Fitness"
        },
        {
          id: 10,
          title: "Lane 10",
          name: "Laura Anderson",
          gym: "Equinox"
        }
      ];
      


      function HeaderItems  ({item}){
        const [seletion,setSelection]= useState(1)
        const clr = seletion === 1 ? Colors.BgColorII : seletion  === 2 ?  Colors.send  : Colors.danger
        function seletionHandler(){
            if(seletion === 1){
                setSelection(2)

            }
            else  if (seletion === 2){
                setSelection(3)

            }
            else{
                setSelection(1)
            }
        }
        return(
            <TouchableOpacity
            onPress={()=> seletionHandler()}
            style={[HomeStyles.HeadertItem,{backgroundColor:clr}]}>
<Text style={HomeStyles.boxTitle}>
    {item.title}
</Text>
<Text style={HomeStyles.boxTitle}>
    {item.name}
</Text>
<Text style={HomeStyles.boxSubTitle}>
    {item.gym}
</Text>
            </TouchableOpacity>
        )
      }
  return (
    <View style={HomeStyles.container}>
    <View style={HomeStyles.Header}>
<FlatList 
data={data}
renderItem={({item})=> <HeaderItems item={item}/>}
horizontal
showsHorizontalScrollIndicator={false}
/>
    </View>

    <Text style={HomeStyles.MainTitle}>HEAT 1</Text>
    <Text style={HomeStyles.TimeBig}>23:00</Text>
<View style={HomeStyles.TimeWrapper}>
<Ionicons name="play-back-outline" size={84} color={Colors.FontColorI} />
<EvilIcons name="play" size={84} color={Colors.FontColorI} />
<EvilIcons name="play" size={84} color={Colors.FontColorI} />

<Ionicons name="play-forward-outline" size={84} color={Colors.FontColorI} />
</View>
    </View>
  );
}
