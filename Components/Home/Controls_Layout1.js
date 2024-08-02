import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeStyles from './HomeStyles';
import Colors from '../../Global/Branding/colors';
import { EvilIcons, Fontisto, Ionicons } from '@expo/vector-icons';
import { WindowHeight } from '../../Global/components/Dimensions';



export default function Controls_layout1({locked,onPress}) {

  return (
    
   
<>
    <Text style={HomeStyles.TimeBig}>23 : 00</Text>

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
