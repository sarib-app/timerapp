
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeStyles from './HomeStyles';
import Colors from '../../Global/Branding/colors';
import { EvilIcons, Fontisto, Ionicons } from '@expo/vector-icons';
import { WindowHeight } from '../../Global/components/Dimensions';
import { convertSecondsToTime } from '../../Global/Calls/ConvertToSEconds';



export default function Controls_layout1({locked,onPress,heatData}) {
  const [data,setData]=useState(heatData)
  const [currentSegmentIndex,setCurrentSegmentIndex]=useState(0)

  return (
    
   
<>
    <Text style={HomeStyles.TimeBig}>{convertSecondsToTime(data?.time_segments[currentSegmentIndex]?.duration || 0)}</Text>

{
    !locked&&
<View style={HomeStyles.TimeWrapper}>
<Ionicons name="play-back-outline" size={WindowHeight/9} color={Colors.FontColorI} />
<EvilIcons
 name="play" size={WindowHeight/9} color={Colors.FontColorI} />
<EvilIcons name="play" size={WindowHeight/9} color={Colors.FontColorI} />

<Ionicons
onPress={() =>  onPress()}
name="play-forward-outline" size={WindowHeight/9} color={Colors.FontColorI} />

</View>
}
    
</>

  );
}
