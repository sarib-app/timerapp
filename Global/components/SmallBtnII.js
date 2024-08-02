import React, { useState } from 'react';
import {Text, TouchableOpacity, View } from 'react-native';

import GlobalStyles from '../Branding/GlobalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { WindowHeight } from './Dimensions';
import Colors from '../Branding/colors';

export default function SmallbtnII({OnPress,hide}) {




if(hide)
    return(
    
<TouchableOpacity 
onPress={()=> OnPress()}
style={[GlobalStyles.SmallBtn, {opacity:0}]}>
<MaterialIcons name="star-purple500" size={WindowHeight/24} color={Colors.FontColorI} />
<Text style={GlobalStyles.SmallBtnText}>
Add New
</Text>
</TouchableOpacity>
)
else
  return (
    
<TouchableOpacity 
onPress={()=> OnPress()}
style={[GlobalStyles.SmallBtn]}>
<MaterialIcons name="star-purple500" size={WindowHeight/24} color={Colors.FontColorI} />
<Text style={GlobalStyles.SmallBtnText}>
Add New
</Text>
</TouchableOpacity>

  );
}
