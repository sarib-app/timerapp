import react, { useState } from "react";
import { Modal,View,Text,TouchableOpacity } from "react-native";
import { WindowHeight, WindowWidth } from "../../Global/components/Dimensions";
// import { Color, Padding } from "../GlobalStyles";?
import Colors from "../../Global/Branding/colors";
import HeatStyles from "./HeatMenuStyles";
import { useNavigation } from "@react-navigation/native";
import { Switch } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import GlobalStyles from "../../Global/Branding/GlobalStyles";
function AddHeatSegments({onPress}){
const naivgation = useNavigation()
const [isEnabled, setIsEnabled] = useState  
(false);
  const toggleSwitch = () =>{
    setIsEnabled(previousState => !previousState);}

    function sendData(){
      const segment = {
        duration: 60, // duration in seconds
        play_sequence: 'down',
        preload: false, // true or false
        sounds: [] 
      }
      onPress(segment)
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
              <TouchableOpacity 
              // onPress={()=> naivgation.navigate("HeatList")}
              style={[HeatStyles.TextWrapper_heat]}>
   
        
        <Text style={HeatStyles.TextStyles_heat}>
          Duration
        </Text>
        <Text style={HeatStyles.TextStyles_heat}>
          1:00
        </Text>
        </TouchableOpacity>
        <TouchableOpacity style={HeatStyles.TextWrapper_heat}>
        
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
        </TouchableOpacity>
        
        <TouchableOpacity style={HeatStyles.TextWrapper_heat}>
        
        <Text style={HeatStyles.TextStyles_heat}>
          Count Options
        </Text>
        <View style={GlobalStyles.RowMaker}>
        <Text style={HeatStyles.TextStyles_heat}>
          Down
        </Text>
        <AntDesign name="checkcircleo" size={WindowHeight/30} style={{marginLeft:5}}color={Colors.FontColorI} />
        </View>
        <View style={GlobalStyles.RowMaker}>
        <Text style={HeatStyles.TextStyles_heat}>
          Up
        </Text>
        <AntDesign name="checkcircleo" size={WindowHeight/30} style={{marginLeft:5}}color={Colors.FontColorI} />
        </View>
        </TouchableOpacity>
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
