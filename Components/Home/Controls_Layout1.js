// import React, { useEffect, useState, useRef } from 'react';
// import { Text, TouchableOpacity, View } from 'react-native';
// import HomeStyles from './HomeStyles';
// import Colors from '../../Global/Branding/colors';
// import { AntDesign, EvilIcons, Ionicons } from '@expo/vector-icons';
// import { WindowHeight } from '../../Global/components/Dimensions';
// import { convertSecondsToTime } from '../../Global/Calls/ConvertToSEconds';

// export default function Controls_layout1({ locked, onPress, heatData ,ongetNextHeat,ongetPreviousHeat}) {
//   const [data, setData] = useState(heatData);
//   const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
//   const [timer, setTimer] = useState(0);
//   const [timer_Saved, setTimer_Saved] = useState(0);
//   const [timeSegment,setTImesegment]=useState([])
//   const [preloadCOunt,setPreLoadCount]=useState(3)
// const [preLoad,setPreload]=useState(false)
// const [playPreLOad,setPlayProload]=useState(false)
  
//   const [play, setPlay] = useState(false);
//   const [sequence, setSequence] = useState(0);

//   const intervalRef = useRef(null);

//   useEffect(()=>{
//     setTimerINital(currentSegmentIndex)
//   },[heatData])
//   async function setTimerINital(currentSegmentIndex){

//   const i = Number(currentSegmentIndex)
//   const d = await heatData?.time_segments
//   const filtereSegment = await d[i]
//   const sequence_filtered = await filtereSegment?.play_sequence
//   const time = await sequence_filtered === "down" ? filtereSegment.duration : 0
//   const preLoad_val= await filtereSegment?.preload
//   setPreload(preLoad_val)
//   setPreLoadCount(3)
//   setTImesegment(d)
//   setSequence(sequence_filtered)
//   setTimer(time)
//   setTimer_Saved(time)
//   console.log('seq',sequence_filtered,  time)

//   }

//   useEffect(() => {
//     if (play) {
//       StartTimer();
//     } else {
//       clearInterval(intervalRef.current);
//     }

//     return () => clearInterval(intervalRef.current); // Cleanup on unmount
//   }, [play]);

//   useEffect(() => {
//     if (timer !== undefined) {

//       if(sequence=== "down" ){
//         if (timer <=0) {
//           handleNextSegment()
//           // Handle next segment or heat logic here
//         }
//       }else{
//         if (timer >= timer_Saved.duration) {
//           handleNextSegment()
//           // Handle next segment or heat logic here
//         }
//       }
      
//     }
//   }, [timer]);

//   const StartTimer = () => {
//     if(play){
//       if(sequence=== "down" ){
//         if(timer>0){

//         intervalRef.current = setInterval(() => {
//           setTimer(prevCount => prevCount - 1);
//         }, 1000);
//         return () => clearInterval(intervalRef.current);
//       }

//       }else{
//         intervalRef.current = setInterval(() => {
//           setTimer(prevCount => prevCount + 1);
//         }, 1000);
//         return () => clearInterval(intervalRef.current);
//       }
  
//     }
   
   

//   };
  
//   function handleNextSegment(){
//     clearInterval(intervalRef.current);
//     setPlay(false);
//     // console.log(currentSegmentIndex+1)
//     if(currentSegmentIndex+1 < timeSegment.length){
//       setCurrentSegmentIndex(currentSegmentIndex+1)
//       setTimerINital(currentSegmentIndex+1)
//     }
//     else{
//       console.log("call next heat")
//       ongetNextHeat()
      
//     }
   
//   }

// ////////////////// Hnalde preload sounds

// useEffect(() => {
//   if(preloadCOunt >1 ){

//   if (playPreLOad) {
//     StartPreload_Timer();
//   } else {
//     clearInterval(intervalRef.current);
//   }

//   return () => clearInterval(intervalRef.current); // Cleanup on unmount
//   }

// }, [playPreLOad]);

// useEffect(() => {
//   if (playPreLOad) {

//       if (preloadCOunt <=0) {
//         // handleNextSegment()
//         setPreload(false)
//         setPlay(true)
//       setPlayProload(false)
      
        
//       }
//   }
// }, [preloadCOunt]);


// function StartPreload_Timer(){
//   if(playPreLOad && preLoad){
//     intervalRef.current = setInterval(() => {
//       setPreLoadCount(prevCount => prevCount - 1);
//     }, 1000);
//     return () => clearInterval(intervalRef.current);
//   }
// }




//   return (
//     <>
//     {
//       preLoad === true ?
//       <Text style={HomeStyles.TimeBig}>{convertSecondsToTime(preloadCOunt)}</Text>
// :
// <Text style={HomeStyles.TimeBig}>{convertSecondsToTime(timer)}</Text>

//     }

//       {!locked && (
//         <View style={HomeStyles.TimeWrapper}>
//           <Ionicons 
//           onPress={()=> ongetPreviousHeat()}
          
//           name="play-back-outline" size={WindowHeight / 9} color={Colors.FontColorI} />
//           {
//             play ? 
//           <TouchableOpacity onPress={() => setPlay(false)}>
//             <AntDesign name="pausecircleo" size={WindowHeight / 12} color={Colors.FontColorI} />
//           </TouchableOpacity>
//           :
//           <TouchableOpacity onPress={() => { preLoad === true ? setPlayProload(true): setPlay(true)}}>
//             <EvilIcons name="play" size={WindowHeight / 9} color={Colors.FontColorI} />
//           </TouchableOpacity>
//           }

//           <Ionicons onPress={() => ongetNextHeat()} name="play-forward-outline" size={WindowHeight / 9} color={Colors.FontColorI} />
//         </View>
//       )}
//     </>
//   );
// }






import React, { useEffect, useState, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import HomeStyles from './HomeStyles';
import Colors from '../../Global/Branding/colors';
import { AntDesign, EvilIcons, Ionicons } from '@expo/vector-icons';
import { WindowHeight } from '../../Global/components/Dimensions';
import { convertSecondsToTime } from '../../Global/Calls/ConvertToSEconds';
import { Audio } from 'expo-av';  // Import audio functionality
import sample from '../../assets/audio/sample.mp3'
export default function Controls_layout1({ locked, onPress, heatData ,ongetNextHeat,ongetPreviousHeat}) {
  const [data, setData] = useState(heatData);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timer_Saved, setTimer_Saved] = useState(0);
  const [timeSegment,setTImesegment]=useState([])
  const [preloadCOunt,setPreLoadCount]=useState(3);
  const [preLoad,setPreload]=useState(false);
  const [playPreLOad,setPlayProload]=useState(false);
  const [play, setPlay] = useState(false);
  const [sequence, setSequence] = useState(0);
  const [currentSound, setCurrentSound] = useState(null); // Track the current sound to play
  const [soundQueue, setSoundQueue] = useState([]); // Track the sound queue based on cue_at

  const intervalRef = useRef(null);
  const audioRef = useRef(null); // To track the sound object

  useEffect(() => {
    setTimerINital(currentSegmentIndex)
  }, [heatData]);

  async function setTimerINital(currentSegmentIndex) {
    const i = Number(currentSegmentIndex);
    const d = await heatData?.time_segments;
    const filteredSegment = await d[i];
    const sequence_filtered = await filteredSegment?.play_sequence;
    const time = await sequence_filtered === "down" ? filteredSegment.duration : 0;
    const preLoad_val = await filteredSegment?.preload;

    setPreload(preLoad_val);
    setPreLoadCount(3);
    setTImesegment(d);
    setSequence(sequence_filtered);
    setTimer(time);
    setTimer_Saved(time);

    prepareSoundsQueue(filteredSegment.sounds, sequence_filtered);  // Prepare sounds queue based on cue_at
  }

  // Prepare the sounds queue based on cue_at and sequence (up/down)
  function prepareSoundsQueue(sounds, sequence) {
    const sortedSounds = [...sounds].sort((a, b) => sequence === 'up' ? a.cue_at - b.cue_at : b.cue_at - a.cue_at);
    setSoundQueue(sortedSounds);
  }

  // Check for sound to be played based on current timer
  useEffect(() => {
    if (play && soundQueue.length > 0) {
      const nextSound = soundQueue[0];

      // If the timer matches the next cue_at, play the sound
      if (sequence === 'up' && timer >= nextSound.cue_at) {
        // playSound(nextSound.audio);
        playSound(sample);

        setSoundQueue(soundQueue.slice(1));  // Remove the played sound from the queue
      } else if (sequence === 'down' && timer <= nextSound.cue_at) {
        // playSound(nextSound.audio);
        playSound(sample);

        setSoundQueue(soundQueue.slice(1));  // Remove the played sound from the queue
      }
    }
  }, [timer, play, soundQueue]);

  // Play the audio file
  async function playSound(audioFile) {
    try {
      if (audioRef.current) {
        await audioRef.current.unloadAsync();  // Unload the previous sound
      }

      const { sound } = await Audio.Sound.createAsync({ audioFile });
      audioRef.current = sound;
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  // Stop the sound when the component unmounts or timer changes
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.stopAsync();
      }
    };
  }, [timer]);

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
      if (sequence === "down") {
        if (timer <= 0) {
          handleNextSegment();
        }
      } else {
        if (timer >= timer_Saved.duration) {
          handleNextSegment();
        }
      }
    }
  }, [timer]);

  const StartTimer = () => {
    if (play) {
      if (sequence === "down") {
        if (timer > 0) {
          intervalRef.current = setInterval(() => {
            setTimer(prevCount => prevCount - 1);
          }, 1000);
          return () => clearInterval(intervalRef.current);
        }
      } else {
        intervalRef.current = setInterval(() => {
          setTimer(prevCount => prevCount + 1);
        }, 1000);
        return () => clearInterval(intervalRef.current);
      }
    }
  };

  function handleNextSegment() {
    clearInterval(intervalRef.current);
    setPlay(false);

    if (currentSegmentIndex + 1 < timeSegment.length) {
      setCurrentSegmentIndex(currentSegmentIndex + 1);
      setTimerINital(currentSegmentIndex + 1);
    } else {
      ongetNextHeat();
    }
  }

  ////////////////// Handle preload sounds
  useEffect(() => {
    if (preloadCOunt > 1) {
      if (playPreLOad) {
        StartPreload_Timer();
      } else {
        clearInterval(intervalRef.current);
      }

      return () => clearInterval(intervalRef.current);
    }
  }, [playPreLOad]);

  useEffect(() => {
    if (playPreLOad) {
      if (preloadCOunt <= 0) {
        setPreload(false);
        setPlay(true);
        setPlayProload(false);
      }
    }
  }, [preloadCOunt]);

  function StartPreload_Timer() {
    if (playPreLOad && preLoad) {
      intervalRef.current = setInterval(() => {
        setPreLoadCount(prevCount => prevCount - 1);
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }

  return (
    <>
      {
        preLoad === true ?
          <Text style={HomeStyles.TimeBig}>{convertSecondsToTime(preloadCOunt)}</Text>
          :
          <Text style={HomeStyles.TimeBig}>{convertSecondsToTime(timer)}</Text>
      }

      {!locked && (
        <View style={HomeStyles.TimeWrapper}>
          <Ionicons 
            onPress={ongetPreviousHeat}
            name="play-back-outline" size={WindowHeight / 9} color={Colors.FontColorI} />
          
          {play ? 
            <TouchableOpacity onPress={() => setPlay(false)}>
              <AntDesign name="pausecircleo" size={WindowHeight / 12} color={Colors.FontColorI} />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => { preLoad === true ? setPlayProload(true) : setPlay(true) }}>
              <EvilIcons name="play" size={WindowHeight / 9} color={Colors.FontColorI} />
            </TouchableOpacity>
          }

          <Ionicons onPress={ongetNextHeat} name="play-forward-outline" size={WindowHeight / 9} color={Colors.FontColorI} />
        </View>
      )}
    </>
  );
}

