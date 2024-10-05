
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeStyles from './HomeStyles';
import Colors from '../../Global/Branding/colors';
import { EvilIcons, Fontisto, Ionicons } from '@expo/vector-icons';
import Slider from '../../Global/components/Slider';
import Controls_layout1 from './Controls_Layout1';
import Controls_layout2 from './Controls_Layout2';
import { WindowHeight, WindowWidth } from '../../Global/components/Dimensions';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { SwipeButton } from 'react-native-expo-swipe-button';
import { getLaunchedHeat } from '../DataMOdules/DataList/getLaunchedHeat';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNextHeat } from '../../Global/Calls/getNextHeat';
import { getPreviousHeat } from '../../Global/Calls/getPreviousHeatINdex';
import lanesData from '../DataMOdules/DataList/Lanes';

import Header_athletes from './Header_athletes';
import LckerSLide from '../Modals/LockMOdal';
export default function HomeScreen() {
  const navigation = useNavigation()
const [locked,setlocked]=useState(true)
const [temp_play,setTempPlay]=useState(false)
const [showVid,setShowVid]=useState(false)
const [heatData,setHeatData]=useState([])
const [heatData_lanes,setHeatData_lanes]=useState([])

const [currentIndex,setCUrrentHeatINdex]=useState(-1)

  
const focused = useIsFocused()
      useEffect(()=>{
//  AsyncStorage.clear()
     async function getData(){

      const edit= await AsyncStorage.getItem("changings")
      if(edit && edit === "true"){

      const data = await getLaunchedHeat()
      if(data){
        setHeatData(data.heat)
        setCUrrentHeatINdex(data.index)
        console.log(data)
        if(data.heat.type === "transition"){
          setShowVid(true)
        }
        else{
        setHeatData_lanes(data.heat?.lanes)

          setShowVid(false)
        }
        await AsyncStorage.setItem('changings',"false")
      }
    }

     }
     getData()
    //  AsyncStorage.clear()

      },[focused])

      useEffect(()=>{
//  AsyncStorage.clear()
     async function getData(){

      const data = await getLaunchedHeat()
      if(data){
        setHeatData(data.heat)
        setCUrrentHeatINdex(data.index)
        console.log(data)
        if(data.heat.type === "transition"){
        setShowVid(true)
        }
        else{
        setHeatData_lanes(data.heat?.lanes)
        setShowVid(false)
        }
        await AsyncStorage.setItem('changings',"false")
      }
    

     }
     getData()
    //  AsyncStorage.clear()

      },[])



      async function ongetNextHeat(){
        const data = await getNextHeat(currentIndex)
      if(data){
        setHeatData([])
        setHeatData(data.heat)
        setCUrrentHeatINdex(data.index)

        if(data.heat.type === "transition"){
          setShowVid(true)
        }
        else{
        setHeatData_lanes(data.heat?.lanes)

          setShowVid(false)
        }
        console.log(data)
      }
      else{
        Alert.alert("Sorry","No more/Transition heat found!")
      }
      }
      async function ongetPreviousHeat(){
        const data = await getPreviousHeat(currentIndex)
      if(data){
        setHeatData([])

        setHeatData(data.heat)
        setCUrrentHeatINdex(data.index)
        if(data.heat.type === "transition"){
          setShowVid(true)
        }
        else{
        setHeatData_lanes(data.heat?.lanes)

          setShowVid(false)
        }
        console.log(data)
      }
      }


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
    Lane {item.id}
</Text>
<Text style={HomeStyles.boxTitle}>
    {item.athlete_name}
</Text>
<Text style={HomeStyles.boxSubTitle}>
    {item.gym_name}
</Text>
            </TouchableOpacity>
        )
      }


function Slider(){
  return(<View style={{position:'absolute',bottom:WindowHeight/12,right:WindowHeight/10}}>
    {
      locked?
        <SwipeButton
                  Icon={
                  <Fontisto name={locked ? "locked":"unlocked"} size={WindowHeight/22} color={Colors.Dark} style={{}} />
                  }
                  width={WindowWidth/4.5}
                  height={WindowHeight/10}
                  onComplete={() => setlocked(false)}
                  title="Swipe to complete"
                  
                  borderRadius={1000}
                  circleBackgroundColor={Colors.FontColorI}
                  circleSize={WindowHeight/8}
                  underlayContainerGradientProps={{
                    colors: [Colors.BgColorII,Colors.BgColorII],
                    start: [0, 0.5],
                    end: [1.3, 0.5],
                  }}
                  titleStyle={{color:"white",fontSize:WindowHeight/40,marginLeft:50}}
                        containerStyle={{ backgroundColor: Colors.BgColorII }}
                  underlayTitle="Release to unlock"
                  underlayTitleStyle={Colors.BgColorII }
                />
    :
    <TouchableOpacity 
    onPress={()=> setlocked(true)}
    style={{padding:10,justifyContent:'center',alignItems:'center',backgroundColor:Colors.FontColorI,borderRadius:2000}}>
    
    <Fontisto name={locked ? "locked":"unlocked"} size={WindowHeight/22} color={Colors.Dark} style={{}} />
    
    
    
    </TouchableOpacity>
    }
    
          </View>)
}



  return (
    <View style={HomeStyles.container}>
      {
        heatData_lanes &&
//     <View style={HomeStyles.Header}>
// <FlatList 
// data={heatData_lanes}
// renderItem={({item})=> <HeaderItems item={item}/>}
// horizontal
// showsHorizontalScrollIndicator={false}
// />
//     </View>
<Header_athletes
heatData_lanes={heatData_lanes}
/>
      }

    <View style={{alignItems:'center'}}>
<View style={HomeStyles.TitleWrapper}>
<Ionicons name="menu" size={WindowHeight/12} color={"transparent"} />
{
  !showVid &&
    <Text style={HomeStyles.MainTitle}>HEAT {heatData?.heat_series || "0"}</Text>
}
   
    <Ionicons
    // onPress={()=>setShowVid((p)=> !p)}
    onPress={()=> navigation.navigate("Datalist")}

    name="menu" size={WindowHeight/12} color={Colors.FontColorI} />
</View>
{
  heatData && heatData.time_segments&&
<>

{
  !showVid ? 
  <Controls_layout1 
  locked={false}
  onPress={()=> setShowVid(true)}
  heatData={heatData}
ongetNextHeat={()=>ongetNextHeat()}
ongetPreviousHeat={()=>ongetPreviousHeat()}
  /> 
:
  <Controls_layout2
  locked={false}
  onPress={()=> setShowVid(true)}
  heatData={heatData}
  ongetNextHeat={()=>ongetNextHeat()}
  ongetPreviousHeat={()=>ongetPreviousHeat()}
  />
}
</>
}

</View>

<View style={HomeStyles.BottomWrapper}>
  {/* {
    locked ?
    <View>

    <SwipeButton
              Icon={
              <Fontisto name={locked ? "locked":"unlocked"} size={WindowHeight/22} color={Colors.Dark} style={{}} />
              }
              width={WindowWidth/4.5}
              height={WindowHeight/10}
              onComplete={() => setlocked(false)}
              title="Swipe to complete"
              
              borderRadius={1000}
              circleBackgroundColor={Colors.FontColorI}
              circleSize={WindowHeight/8}
              underlayContainerGradientProps={{
                colors: [Colors.BgColorII,Colors.BgColorII],
                start: [0, 0.5],
                end: [1.3, 0.5],
              }}
              titleStyle={{color:"white",fontSize:WindowHeight/40,marginLeft:50}}
                    containerStyle={{ backgroundColor: Colors.BgColorII }}
              underlayTitle="Release to unlock"
              underlayTitleStyle={Colors.BgColorII }
            />
      </View>:
      <TouchableOpacity 
      onPress={()=> setlocked(true)}
      style={{padding:10,justifyContent:'center',alignItems:'center',backgroundColor:Colors.FontColorI,borderRadius:2000}}>
      
      <Fontisto name={locked ? "locked":"unlocked"} size={WindowHeight/22} color={Colors.Dark} style={{}} />
      
      
      
      </TouchableOpacity>
  } */}
 

</View>
{/* <Modal  visible= {true} transparent={false}>
  <View style={{width:WindowWidth,height:WindowHeight,backgroundColor:'red'}}>

  </View>
</Modal> */}

{
  locked ?
<View style={lockWrapper}>
<Slider/>
</View>:
<Slider/>
}


    </View>
  );
}


const lockWrapper={width:WindowWidth,height:WindowHeight,backgroundColor:"rgba(0,0,0,0.4)",position:'absolute'}