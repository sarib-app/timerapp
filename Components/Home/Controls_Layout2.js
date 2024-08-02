import React, { useState ,useRef,useEffect} from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View,PixelRatio } from 'react-native';
import HomeStyles from './HomeStyles';
import Colors from '../../Global/Branding/colors';
import { EvilIcons, Fontisto, Ionicons } from '@expo/vector-icons';
import { WindowHeight } from '../../Global/components/Dimensions';
import { useVideoPlayer, VideoView } from 'expo-video';

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';


export default function Controls_layout2({onPress}) {

    const ref = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const player = useVideoPlayer(videoSource, player => {
      player.loop = true;
      player.play();
    });
  
    useEffect(() => {
      const subscription = player.addListener('playingChange', isPlaying => {
        setIsPlaying(isPlaying);
      });
  
      return () => {
        subscription.remove();
      };
    }, [player]);

  return (
    
   
<View style={HomeStyles.control_two}>
    {/* <Image 
    style={HomeStyles.Image_wrapper}
    source={{uri:"https://www.choosept.com/globalassets/choosept/assets/spotlight-images/runners-all-ages_sizes_750x419.jpg"}}
    /> */}
     <VideoView
        ref={ref}
        style={HomeStyles.Image_wrapper}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        
      />
    <View style={HomeStyles.Image_wrapper}>

    
<Text style={[HomeStyles.MainTitle,{fontSize:WindowHeight/12}]}>NEXT HEAT IN</Text>

    <Text style={HomeStyles.Time_small}>09:54</Text>


    <View style={HomeStyles.TimeWrapper}>
<Ionicons name="play-back-outline" size={WindowHeight/9} color={Colors.FontColorI} />
<EvilIcons
 name="play" size={WindowHeight/9} color={Colors.FontColorI} />
<EvilIcons 
   onPress={() => {
    console.log("pressed")
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  }}
name="play" size={WindowHeight/9} color={Colors.FontColorI} />

<Ionicons name="play-forward-outline" size={WindowHeight/9} color={Colors.FontColorI} />

</View>
    </View>

    
</View>

  );
}
