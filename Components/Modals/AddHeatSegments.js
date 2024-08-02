import react, { useState } from "react";
import { Modal,View,Text,TouchableOpacity } from "react-native";
import { WindowHeight, WindowWidth } from "../../Global/components/Dimensions";
// import { Color, Padding } from "../GlobalStyles";?
import Colors from "../../Global/Branding/colors";
import HeatStyles from "./HeatMenuStyles";
import { useNavigation } from "@react-navigation/native";
import { Switch } from "react-native";
function AddHeatSegments(){
const naivgation = useNavigation()
const [isEnabled, setIsEnabled] = useState
(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
              onPress={()=> naivgation.navigate("HeatList")}
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
        </TouchableOpacity>
        </View>
        // </Modal>
    )
}

export default AddHeatSegments