// import React, { useState ,useRef,useEffect} from 'react';
// import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View,PixelRatio } from 'react-native';
// import HomeStyles from './HomeStyles';
// import Colors from '../../Global/Branding/colors';
// import { EvilIcons, Fontisto, Ionicons } from '@expo/vector-icons';
// import { WindowHeight } from '../../Global/components/Dimensions';
// import { useVideoPlayer, VideoView } from 'expo-video';

// const videoSource =
//   'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';


// export default function Controls_layout2({locked, onPress, heatData ,ongetNextHeat,ongetPreviousHeat}) {

//     const ref = useRef(null);
//     const [isPlaying, setIsPlaying] = useState(true);
//     const player = useVideoPlayer(videoSource, player => {
//       player.loop = true;
//       player.play();
//     });
  
//     useEffect(() => {
//       const subscription = player.addListener('playingChange', isPlaying => {
//         setIsPlaying(isPlaying);
//       });
  
//       return () => {
//         subscription.remove();
//       };
//     }, [player]);

//   return (
    
   
// <View style={HomeStyles.control_two}>
//     {/* <Image 
//     style={HomeStyles.Image_wrapper}
//     source={{uri:"https://www.choosept.com/globalassets/choosept/assets/spotlight-images/runners-all-ages_sizes_750x419.jpg"}}
//     /> */}
//      <VideoView
//         ref={ref}
//         style={HomeStyles.Image_wrapper}
//         player={player}
//         allowsFullscreen
//         allowsPictureInPicture
        
//       />
//     <View style={HomeStyles.Image_wrapper}>

    
// <Text style={[HomeStyles.MainTitle,{fontSize:WindowHeight/12}]}>NEXT HEAT IN</Text>

//     <Text style={HomeStyles.Time_small}>09:54</Text>


//     <View style={HomeStyles.TimeWrapper}>
// <Ionicons name="play-back-outline" size={WindowHeight/9} color={Colors.FontColorI} />
// <EvilIcons
//  name="play" size={WindowHeight/9} color={Colors.FontColorI} />
// <EvilIcons 
//    onPress={() => {
//     console.log("pressed")
//     if (isPlaying) {
//       player.pause();
//     } else {
//       player.play();
//     }
//     setIsPlaying(!isPlaying);
//   }}
// name="play" size={WindowHeight/9} color={Colors.FontColorI} />

// <Ionicons name="play-forward-outline" size={WindowHeight/9} color={Colors.FontColorI} />

// </View>
//     </View>

    
// </View>

//   );
// }
import React, { useState, useRef, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import HomeStyles from './HomeStyles';
import Colors from '../../Global/Branding/colors';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { WindowHeight } from '../../Global/components/Dimensions';
import { convertSecondsToTime } from '../../Global/Calls/ConvertToSEconds';
import { useVideoPlayer, VideoView } from 'expo-video';

const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function Controls_layout2({ locked, onPress, heatData, ongetNextHeat, ongetPreviousHeat }) {
  const ref = useRef(null);
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  const [data, setData] = useState(heatData);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [timer, setTimer] = useState(1);
  const [timer_Saved, setTimer_Saved] = useState(0);
  const [timeSegment, setTimeSegment] = useState([]);
  const [play, setPlay] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimerInitial(currentSegmentIndex);
  }, [heatData]);

  async function setTimerInitial(currentSegmentIndex) {
    const i = Number(currentSegmentIndex);
    const d = await heatData?.time_segments;
    const filtereSegment = await d[i];
    const time = await filtereSegment.duration;
    setTimeSegment(d);
    setTimer(time);
    setTimer_Saved(time);
  }

  useEffect(() => {
    if (play) {
      startTimer();
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, [play]);

  useEffect(() => {
    if (timer !== undefined) {
      if (timer <= 0) {
        handleNextSegment();
      }
    }
  }, [timer]);

  const startTimer = () => {
    if (play) {
      intervalRef.current = setInterval(() => {
        setTimer(prevCount => prevCount - 1);
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }
  };

  function handleNextSegment() {
    clearInterval(intervalRef.current);
    setPlay(false);
    if (currentSegmentIndex + 1 < timeSegment.length) {
      setCurrentSegmentIndex(currentSegmentIndex + 1);
      setTimerInitial(currentSegmentIndex + 1);
    } else {
      console.log("call next heat from 2 ");
      ongetNextHeat();
    }
  }

  useEffect(() => {
    const subscription = player.addListener('playingChange', isPlaying => {
      setPlay(isPlaying);
    });
    return () => {
      subscription.remove();
    };
  }, [player]);

  return (
    <View style={HomeStyles.control_two}>
      <VideoView
        ref={ref}
        style={HomeStyles.Image_wrapper}
        player={player}
        
        allowsFullscreen
        allowsPictureInPicture
      />
      <View style={HomeStyles.Image_wrapper}>
        <Text style={[HomeStyles.MainTitle, { fontSize: WindowHeight / 12 }]}>NEXT HEAT IN</Text>
        <Text style={HomeStyles.Time_small}>{convertSecondsToTime(timer)}</Text>
        <View style={HomeStyles.TimeWrapper}>
          <Ionicons 
          onPress={()=> ongetPreviousHeat()}
          
          name="play-back-outline" size={WindowHeight / 9} color={Colors.FontColorI} />
          <TouchableOpacity onPress={() => setPlay(false)}>
            <EvilIcons name="play" size={WindowHeight / 9} color={Colors.FontColorI} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPlay(true)}>
            <EvilIcons name="play" size={WindowHeight / 9} color={Colors.FontColorI} />
          </TouchableOpacity>
          <Ionicons 
          onPress={()=> ongetNextHeat()}
          name="play-forward-outline" size={WindowHeight / 9} color={Colors.FontColorI} />
        </View>
      </View>
    </View>
  );
}
