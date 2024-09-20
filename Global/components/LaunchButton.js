import React, { useState } from 'react';
import {Text, TouchableOpacity, View } from 'react-native';

import GlobalStyles from '../Branding/GlobalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { WindowHeight } from './Dimensions';
import Colors from '../Branding/colors';

export default function LaunchBtton({OnPress,hide}) {





    return(
    
<TouchableOpacity 
onPress={()=> OnPress()}
style={[GlobalStyles.SmallBtn, {backgroundColor:Colors.send}]}>
{/* <MaterialIcons name="star-purple500" size={WindowHeight/24} color={Colors.FontColorI} /> */}
<Text style={GlobalStyles.SmallBtnText}>
Go Back
</Text>
</TouchableOpacity>
)

}
