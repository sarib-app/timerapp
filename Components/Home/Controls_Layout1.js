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
import { WindowHeight, WindowWidth } from '../../Global/components/Dimensions';
import { convertSecondsToTime } from '../../Global/Calls/ConvertToSEconds';
import { Audio } from 'expo-av';  // Import audio functionality
import prelaod_sound from '../../assets/audio/prelaod_sound.mp3'
export default function Controls_layout1({ locked, onPress, heatData ,ongetNextHeat,ongetPreviousHeat,autoPlay}) {
  const [data, setData] = useState(heatData);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timer_Saved, setTimer_Saved] = useState(0);
  const [timeSegment,setTImesegment]=useState([])
  const [preloadCOunt,setPreLoadCount]=useState(3);
  const [preTimer,setPreTimer] = useState(5)
  const [playPretime,setPlayPreTime]=useState(false)
  const [preLoad,setPreload]=useState(false);
  const [playPreLOad,setPlayProload]=useState(false);
  const [playPretimer_state,setPlay_preTimer_state]=useState(true);

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
    setTimer_Saved(filteredSegment.duration);
    prepareSoundsQueue(filteredSegment.sounds, sequence_filtered);  // Prepare sounds queue based on cue_at
    SetPLayer(currentSegmentIndex)
  }

//////
async function SetPLayer(val){

  console.log("should auto play!",val,autoPlay)

  if(autoPlay === true){
// console.log(val,"play now")
  const timer = setTimeout(() => {
    if(val === 0 && playPretimer_state){
      setPlayPreTime(true)
      // setPlay_preTimer_state(true)
    }else{

      setPlay(true);
    }
  }, 1000); // 1 second

  return () => clearTimeout(timer);
}
else if(val == 0 && !playPretimer_state){
  // setPlay_preTimer_state(true)
  setPlay(true);

}
else if(val != 0){
    setPlay(true);

}
  
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
        playSound(nextSound.audio);
        // playSound(item.audio);

        setSoundQueue(soundQueue.slice(1));  // Remove the played sound from the queue
      } else if (sequence === 'down' && timer <= nextSound.cue_at) {
        playSound(nextSound.audio);
        // playSound(item.audio);

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
      // console.log("loading")

      const { sound } = await Audio.Sound.createAsync(  {uri:audioFile}  );
      // console.log("loaded",sound)
      audioRef.current = sound;
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }
  async function playLocalSound(audioFile) {
    try {
      if (audioRef.current) {
        await audioRef.current.unloadAsync();  // Unload the previous sound
      }
      // console.log("loading")

      const { sound } = await Audio.Sound.createAsync( audioFile );
      // console.log("loaded",sound)
      audioRef.current = sound;
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  // Stop the sound when the component unmounts or timer changes
  useEffect(() => {
    return () => {
      // if (audioRef.current) {
      //   audioRef.current.stopAsync();
      // }
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
        if (timer >= timer_Saved && timer != 0) {
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
        // In the "up" sequence, stop the timer when it reaches the duration
        if (timer <timer_Saved) {
          intervalRef.current = setInterval(() => {
            setTimer(prevCount => prevCount + 1);
          }, 1000);
          return () => clearInterval(intervalRef.current);
        } else {
          // handleNextSegment();  // Move to the next segment or heat if available
        }
      }
    }
  };
  
  function handleNextSegment() {
    clearInterval(intervalRef.current);
    setPlay(false);
    console.log("NO i am working here and there")


    if (currentSegmentIndex + 1 < timeSegment.length) {

      console.log("i am working",currentSegmentIndex,timeSegment.length)
      setCurrentSegmentIndex(currentSegmentIndex + 1);
      setTimerINital(currentSegmentIndex + 1);
    } else {
      console.log("NO i am working")
      ongetNextHeat();
    }
  }


  function handlePrevSegment() {
    clearInterval(intervalRef.current);
    setPlay(false);

    if (currentSegmentIndex  > 0) {
      setCurrentSegmentIndex(currentSegmentIndex - 1);
      setTimerINital(currentSegmentIndex - 1);
    } else {
      ongetPreviousHeat();
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


  ///// HANDLE PRE TIMERE ///////////////////////

   useEffect(() => {
    if (preTimer > 1) {
      if (playPretime) {
        StartPre_big_timer();
      } else {
        clearInterval(intervalRef.current);
      }

      return () => clearInterval(intervalRef.current);
    }
  }, [playPretime]);

  useEffect(() => {
    if (playPretime) {
      if (preTimer <= 0) {
        // setPreload(false);
        setPlay_preTimer_state(false)
        setPlayPreTime(false);
        setPlay(true);
      }else if(preTimer === 3){
        playLocalSound(prelaod_sound)
      }
    }
  }, [preTimer]);

  function StartPre_big_timer() {
    if (playPretime) {
      intervalRef.current = setInterval(() => {
        setPreTimer(prevCount => prevCount - 1);
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }

  return (
    <>

{
  playPretimer_state ? 
 
    <Text style={HomeStyles.TimeBig}>{convertSecondsToTime(preTimer)}</Text>:
    preLoad ?  
    <Text style={HomeStyles.TimeBig}>{convertSecondsToTime(preloadCOunt)}</Text>
  :
  <Text style={HomeStyles.TimeBig}>{convertSecondsToTime(timer)}</Text>

}


      
 
        <Text style={[HomeStyles.TimeBig,{fontSize:WindowWidth/70}]}>{"ciurrent segment:"+ currentSegmentIndex + 1}</Text>
      {!locked && (
        <View style={HomeStyles.TimeWrapper}>
          <Ionicons 
            onPress={handlePrevSegment}
            name="play-back-outline" size={WindowHeight / 9} color={Colors.FontColorI} />
          
          {play || preLoad || playPretime? 
            <TouchableOpacity onPress={() => {
              playPretimer_state?setPlayPreTime(false): preLoad === true ? setPlayProload(false) : setPlay(false) }
              }
              >
              <AntDesign name="pausecircleo" size={WindowHeight / 12} color={Colors.FontColorI} />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => { playPretimer_state?setPlayPreTime(true): preLoad === true ? setPlayProload(true) : setPlay(true) }}>
              <EvilIcons name="play" size={WindowHeight / 9} color={Colors.FontColorI} />
            </TouchableOpacity>
          }

          <Ionicons onPress={handleNextSegment} name="play-forward-outline" size={WindowHeight / 9} color={Colors.FontColorI} />
        </View>
      )}
    </>
  );
}

