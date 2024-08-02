import react from "react";
import { Modal,View,Text,TouchableOpacity } from "react-native";
import { WindowHeight, WindowWidth } from "../../Global/components/Dimensions";
// import { Color, Padding } from "../GlobalStyles";?
import Colors from "../../Global/Branding/colors";
import HeatStyles from "./HeatMenuStyles";
import { useNavigation } from "@react-navigation/native";
function AddSessionMenu(){
const naivgation = useNavigation()
    return(
        // <Modal
        // transparent={true}
        // animationType="fade"
        // visible={true}
        // >

        <View style={HeatStyles.container}>
              <TouchableOpacity 
              onPress={()=> naivgation.navigate("HeatList")}
              style={[HeatStyles.TextWrapper,{paddingTop:0}]}>
   
        
        <Text style={HeatStyles.TextStyles}>
          Heat
        </Text>
        
        </TouchableOpacity>
        <TouchableOpacity style={HeatStyles.TextWrapper}>
        
        <Text style={HeatStyles.TextStyles}>
        Transition
        </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={HeatStyles.TextWrapper}>
        
        <Text style={HeatStyles.TextStyles}>
          Lane Assignments
        </Text>
        </TouchableOpacity>
        </View>
        // </Modal>
    )
}

export default AddSessionMenu