import React, { useEffect, useState, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import HomeStyles from './HomeStyles';
import Colors from '../../Global/Branding/colors';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { WindowHeight } from '../../Global/components/Dimensions';
import { convertSecondsToTime } from '../../Global/Calls/ConvertToSEconds';

export default function Controls_layout1({ locked, onPress, heatData }) {
  const [data, setData] = useState(heatData);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timer_Saved, setTimer_Saved] = useState(0);
  const [timeSegment,setTImesegment]=useState([])

  
  const [play, setPlay] = useState(false);
  const [sequence, setSequence] = useState(0);

  const intervalRef = useRef(null);

  useEffect(()=>{
    setTimerINital(currentSegmentIndex)
  },[])
  async function setTimerINital(currentSegmentIndex){

  const i = Number(currentSegmentIndex)
  const d = await data?.time_segments
  const filtereSegment = await d[i]
  const sequence_filtered = await filtereSegment?.play_sequence
  const time = await sequence_filtered === "down" ? filtereSegment.duration : 0
  setTImesegment(d)
  setSequence(sequence_filtered)
  setTimer(time)
  setTimer_Saved(time)
  console.log('seq',sequence_filtered,  time)

  }

  useEffect(() => {
    if (play) {
      StartTimer();
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, [play]);

  useEffect(() => {
    if (timer !== undefined) {

      if(sequence=== "down" ){
        if (timer <=0) {
          handleNextSegment()
          // Handle next segment or heat logic here
        }
      }else{
        if (timer >= timer_Saved.duration) {
          handleNextSegment()
          // Handle next segment or heat logic here
        }
      }
      
    }
  }, [timer]);

  const StartTimer = () => {
    if(play){
      if(sequence=== "down" ){
        intervalRef.current = setInterval(() => {
          setTimer(prevCount => prevCount - 1);
        }, 1000);
        return () => clearInterval(intervalRef.current);
      }else{
        intervalRef.current = setInterval(() => {
          setTimer(prevCount => prevCount + 1);
        }, 1000);
        return () => clearInterval(intervalRef.current);
      }
  
    }
   
   

  };
  
  function handleNextSegment(){
    clearInterval(intervalRef.current);
    setPlay(false);
    // console.log(currentSegmentIndex+1)
    if(currentSegmentIndex+1 < timeSegment.length){
      setCurrentSegmentIndex(currentSegmentIndex+1)
      setTimerINital(currentSegmentIndex+1)
    }
    else{
      console.log("call next heat")
    }
   
  }

  return (
    <>
      <Text style={HomeStyles.TimeBig}>{convertSecondsToTime(timer)}</Text>

      {!locked && (
        <View style={HomeStyles.TimeWrapper}>
          <Ionicons name="play-back-outline" size={WindowHeight / 9} color={Colors.FontColorI} />
          <TouchableOpacity onPress={() => handleNextSegment()}>
            <EvilIcons name="play" size={WindowHeight / 9} color={Colors.FontColorI} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPlay(true)}>
            <EvilIcons name="play" size={WindowHeight / 9} color={Colors.FontColorI} />
          </TouchableOpacity>
          <Ionicons onPress={() => onPress()} name="play-forward-outline" size={WindowHeight / 9} color={Colors.FontColorI} />
        </View>
      )}
    </>
  );
}
