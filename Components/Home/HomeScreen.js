import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeStyles from './HomeStyles';
import Colors from '../../Global/Branding/colors';
import { EvilIcons, Fontisto, Ionicons } from '@expo/vector-icons';
import Slider from '../../Global/components/Slider';
import Controls_layout1 from './Controls_Layout1';
import Controls_layout2 from './Controls_Layout2';
import { WindowHeight } from '../../Global/components/Dimensions';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
  const navigation = useNavigation()
const [locked,setlocked]=useState(true)
const [temp_play,setTempPlay]=useState(false)
const [showVid,setShowVid]=useState(false)

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
    <View style={{alignItems:'center'}}>
<View style={HomeStyles.TitleWrapper}>
<Ionicons name="menu" size={WindowHeight/12} color={"transparent"} />
{
  !showVid &&
    <Text style={HomeStyles.MainTitle}>HEAT 1</Text>
}
   
    <Ionicons
    // onPress={()=>setShowVid((p)=> !p)}
    onPress={()=> navigation.navigate("Datalist")}

    name="menu" size={WindowHeight/12} color={locked ? "transparent":Colors.FontColorI} />
</View>
{
  !showVid ? 
  <Controls_layout1 
  locked={locked}
  /> 
:
  <Controls_layout2/>
}

</View>

<View style={HomeStyles.BottomWrapper}>

<TouchableOpacity 
onPress={()=> setlocked((p)=>!p)}
style={{padding:10,justifyContent:'center',alignItems:'center',backgroundColor:Colors.FontColorI,borderRadius:2000}}>

<Fontisto name={locked ? "locked":"unlocked"} size={WindowHeight/22} color={Colors.Dark} style={{}} />

{/* <Slider/> */}
{/* <SwipeButton
          Icon={
            <MaterialIcons name="keyboard-arrow-right" size={50} color="white" />
          }
          width={320}
          height={55}
          onComplete={() => handleBookNow()}
          title="Swipe to complete"
          borderRadius={1000}
          circleBackgroundColor={theme3.secondaryColor}
          underlayContainerGradientProps={{
            colors: [theme3.primaryColor,theme3.secondaryColor],
            start: [0, 0.5],
            end: [1.3, 0.5],
          }}
          titleStyle={{color:"white"}}
                containerStyle={{ backgroundColor: 'gray' }}
          underlayTitle="Release to complete"
          underlayTitleStyle={{ color: theme3.light }}
        /> */}
</TouchableOpacity>
</View>

    </View>
  );
}
