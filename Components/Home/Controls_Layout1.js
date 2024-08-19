import React from 'react';
import { Text, View } from 'react-native';
import HomeStyles from './HomeStyles';
import Colors from '../../Global/Branding/colors';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { WindowHeight } from '../../Global/components/Dimensions';

export default function Controls_layout1({ locked, onPress, timeLeft, onPlayPause, onNext, onPrev }) {
  return (
    <>
      <Text style={HomeStyles.TimeBig}>{timeLeft > 0 ? `${Math.floor(timeLeft / 60)} : ${timeLeft % 60}` : "00 : 00"}</Text>
      {!locked &&
        <View style={HomeStyles.TimeWrapper}>
          <Ionicons name="play-back-outline" size={WindowHeight / 9} color={Colors.FontColorI} onPress={onPrev} />
          <View style={{ paddingHorizontal: 25 }}>
            <EvilIcons name="play" size={WindowHeight / 5} color={Colors.FontColorI} onPress={onPlayPause} />
          </View>
          <Ionicons name="play-forward-outline" size={WindowHeight / 9} color={Colors.FontColorI} onPress={onNext} />
        </View>
      }
    </>
  );
}
