import react, { useState } from "react";
import { Modal,View,Text,TouchableOpacity, Alert } from "react-native";
import { WindowHeight, WindowWidth } from "../../Global/components/Dimensions";
// import { Color, Padding } from "../GlobalStyles";?
import Colors from "../../Global/Branding/colors";
import HeatStyles from "./HeatMenuStyles";
import { useNavigation } from "@react-navigation/native";
import { Switch } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import GlobalStyles from "../../Global/Branding/GlobalStyles";
import { TextInput } from "react-native-gesture-handler";
import { convertSecondsToTime } from "../../Global/Calls/ConvertToSEconds";
function AddHeatSegments({onPress}){
const naivgation = useNavigation()
const [isEnabled, setIsEnabled] = useState  
(false);
  const toggleSwitch = () =>{
    setIsEnabled(previousState => !previousState);}
      // const [duration,setDUration]=useState(60)
      const [duration,setDuration] = useState(60)
      const [Count_opt,setCount_opt] = useState("down")

      
      // const duration = 20
    function sendData(){
      if(duration){
        const segment = {
          duration: Number(duration), // duration in seconds
          play_sequence: 'down',
          preload: isEnabled, // true or false
          sounds: [] 
        }
        onPress(segment)
      }
      else{
        Alert.alert("Fill Info","Please add duration to proceed.")
      }
  
    }
    return(
        // <Modal
        // transparent={true}
        // animationType="fade"
        // visible={true}
        // >

        <View style={HeatStyles.container_heat}>
           <Text style={HeatStyles.TextStyles_heat}>
          Add Team Segments
        </Text>
              <View 
              // onPress={()=> naivgation.navigate("HeatList")}
              style={[HeatStyles.TextWrapper_heat]}>
   
     
        <Text style={HeatStyles.TextStyles_heat}>
          Duration
        </Text>
        <TextInput
        value={duration.toString()}
        onChangeText={(e)=> setDuration(e)}
        placeholder="Type"
        keyboardType="numeric"

        style={HeatStyles.TextStyles_heat}
        />
        <Text style={HeatStyles.TextStyles_heat}>
          {convertSecondsToTime(Number(duration))}
        </Text>
        </View>
        <View style={HeatStyles.TextWrapper_heat}>
        
        <Text style={HeatStyles.TextStyles_heat}>
        Preloaded Sound Option
        </Text>
        <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        
        value={isEnabled}
      />
        </View>
        
        <View style={HeatStyles.TextWrapper_heat}>
        
        <Text style={HeatStyles.TextStyles_heat}>
          Count Options
        </Text>
        <TouchableOpacity 
        onPress={()=> setCount_opt("down")}
        
        style={GlobalStyles.RowMaker}>
        <Text style={HeatStyles.TextStyles_heat}>
          Down
        </Text>
      

        <AntDesign name={Count_opt === "down"?"checkcircle": "checkcircleo"} size={WindowHeight/30} style={{marginLeft:5}}color={Colors.FontColorI} />
      

        </TouchableOpacity>
        <TouchableOpacity 
      
        onPress={()=> setCount_opt("up")}
        

        style={GlobalStyles.RowMaker}>
        <Text style={HeatStyles.TextStyles_heat}>
          Up
        </Text>
      
        <AntDesign name={Count_opt === "down"?"checkcircleo": "checkcircle"} size={WindowHeight/30} style={{marginLeft:5}}color={Colors.FontColorI} />
        </TouchableOpacity>
  


        </View>
        <Text
        onPress={()=> sendData()}
        style={[HeatStyles.TextStyles_heat,{marginTop:WindowHeight/35}]}>
          Make Segment
        </Text>
        </View>
        // </Modal>
    )
}

export default AddHeatSegments
