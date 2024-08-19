import { AntDesign, FontAwesome, Fontisto, MaterialCommunityIcons, Octicons } from "@expo/vector-icons"
import react from "react"
import { View,TouchableOpacity } from "react-native"
import Colors from "./colors"
import { WindowHeight } from "../components/Dimensions"

function RoundBtn({icon,onpress}){
    return(
      <TouchableOpacity
      onPress={()=> onpress()}
  style={[{
    borderRadius:1000,
    // padding:WindowHeight/60,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.danger,
    width:WindowHeight/15,
    height:WindowHeight/15,margin:1
  },{backgroundColor:Colors.BgColorII}]}
  >
    {
      icon == "user" &&
  <FontAwesome name={icon} size={WindowHeight/27} color={Colors.FontColorI}/>
    }
    { icon === "plus" &&
  <AntDesign name={icon}  size={WindowHeight/27} color={Colors.FontColorI} />
  
    }

    {
      icon === "rocket-launch" &&
  <MaterialCommunityIcons name={icon}  size={WindowHeight/27} color={Colors.FontColorI} />

    }
  </TouchableOpacity>
    )
  }
  export default RoundBtn