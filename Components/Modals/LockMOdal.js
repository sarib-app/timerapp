import React,{useState,useEffect} from "react";
import { Fontisto } from "@expo/vector-icons";
import { SwipeButton } from "react-native-expo-swipe-button";
import { WindowHeight, WindowWidth } from "../../Global/components/Dimensions";
import { View,Modal } from "react-native";
// import { View } from "react-native-web";


function LckerSLide({locked,setlocked}){
    return(
     <Modal
     visible={true}
     transparent={true}
     animationType='slide'
     >

            <View style={{width:WindowWidth,height:WindowHeight,backgroundColor:"pink"}}>


      

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

        </Modal>
     


    )
}

export default LckerSLide