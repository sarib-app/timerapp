
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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


export default function HomeScreen() {
  const navigation = useNavigation()
const [locked,setlocked]=useState(true)
const [temp_play,setTempPlay]=useState(false)
const [showVid,setShowVid]=useState(false)
const [heatData,setHeatData]=useState([])
const [currentIndex,setCUrrentHeatINdex]=useState(-1)

  
const focused = useIsFocused()
      useEffect(()=>{
//  AsyncStorage.clear()
     async function getData(){
      const data = await getLaunchedHeat()
      if(data){
        setHeatData(data.heat)
        setCUrrentHeatINdex(data.index)
        console.log(data)
      }
     }
     getData()

      },[focused])


      async function ongetNextHeat(){
        const data = await getNextHeat(currentIndex)
      if(data){
        setHeatData([])
        setHeatData(data.heat)
        setCUrrentHeatINdex(data.index)
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
  return (
    <View style={HomeStyles.container}>
      {
        heatData &&
    <View style={HomeStyles.Header}>
<FlatList 
data={heatData?.lanes}
renderItem={({item})=> <HeaderItems item={item}/>}
horizontal
showsHorizontalScrollIndicator={false}
/>
    </View>
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
ongetNextHeat={ongetNextHeat}
ongetPreviousHeat={ongetPreviousHeat}
  /> 
:
  <Controls_layout2
  />
}
</>

}

</View>

<View style={HomeStyles.BottomWrapper}>
  {
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
              titleStyle={{color:"white",fontSize:10}}
                    containerStyle={{ backgroundColor: Colors.BgColorII }}
              underlayTitle="Release to complete"
              underlayTitleStyle={Colors.BgColorII }
            />
      </View>:
      <TouchableOpacity 
      onPress={()=> setlocked(true)}
      style={{padding:10,justifyContent:'center',alignItems:'center',backgroundColor:Colors.FontColorI,borderRadius:2000}}>
      
      <Fontisto name={locked ? "locked":"unlocked"} size={WindowHeight/22} color={Colors.Dark} style={{}} />
      
      
      
      </TouchableOpacity>
  }
 


</View>

    </View>
  );
}
