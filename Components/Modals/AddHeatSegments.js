import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, Switch } from "react-native";
import { WindowHeight } from "../../Global/components/Dimensions";
import Colors from "../../Global/Branding/colors";
import HeatStyles from "./HeatMenuStyles";
import { AntDesign } from "@expo/vector-icons";

function AddHeatSegments({ onPress }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    // POD(prev => !prev);
    setIsEnabled(prev => !prev);
  };

  const handleSave = () => {
    const newSegment = {
      id: `segment_${Date.now()}`,
      duration: "1:00",
      play_sequence: "some_sequence",
      preload: isEnabled,
      sounds: [], // Add sounds data if necessary
    };
    onPress(newSegment);
  };

  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={HeatStyles.container_heat}>
        <Text style={HeatStyles.TextStyles_heat}>Add Time Segments</Text>
        <TouchableOpacity style={HeatStyles.TextWrapper_heat}>
          <Text style={HeatStyles.TextStyles_heat}>Duration</Text>
          <Text style={HeatStyles.TextStyles_heat}>1:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={HeatStyles.TextWrapper_heat}>
          <Text style={HeatStyles.TextStyles_heat}>Preloaded Sound Option</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </TouchableOpacity>
        <TouchableOpacity style={HeatStyles.TextWrapper_heat}>
          <Text style={HeatStyles.TextStyles_heat}>Count Options</Text>
          <View style={HeatStyles.RowMaker}>
            <Text style={HeatStyles.TextStyles_heat}>Down</Text>
            <AntDesign name="checkcircleo" size={WindowHeight / 30} color={Colors.FontColorI} />
          </View>
          <View style={HeatStyles.RowMaker}>
            <Text style={HeatStyles.TextStyles_heat}>Up</Text>
            <AntDesign name="checkcircleo" size={WindowHeight / 30} color={Colors.FontColorI} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> handleSave()} style={HeatStyles.Button}>
          <Text style={HeatStyles.ButtonText}>Make Segment</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default AddHeatSegments;
