import react from "react";
import { Modal,View,Text,TouchableOpacity } from "react-native";
import { WindowHeight, WindowWidth } from "../../Global/components/Dimensions";
// import { Color, Padding } from "../GlobalStyles";
import Colors from "../../Global/Branding/colors";
import HeatStyles from "./HeatMenuStyles";
function AddSessionMenu(){

    return(
        <Modal
        transparent={true}
        animationType="fade"
        visible={true}
        >

        <View style={HeatStyles.container}>
        <View style={[HeatStyles.TextStyles,{paddingTop:0}]}>
        
        <Text style={HeatStyles.TextStyles}>
          Heat
        </Text>
        </View>
        
        <View style={HeatStyles.TextWrapper}>
        
        <Text style={HeatStyles.TextStyles}>
        Transition
        </Text>
        </View>
        
        <View style={HeatStyles.TextWrapper}>
        
        <Text style={HeatStyles.TextStyles}>
          Lane Assignments
        </Text>
        </View>
        </View>
        </Modal>
    )
}

export default AddSessionMenu