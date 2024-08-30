// import React, { useEffect, useState } from 'react';
// import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
// import { Entypo, Fontisto } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { WindowHeight } from '../../../Global/components/Dimensions';
// import Colors from '../../../Global/Branding/colors';
// import DataListStyle from './DataListStyles';
// import GlobalStyles from '../../../Global/Branding/GlobalStyles';
// import SmallbtnII from '../../../Global/components/SmallBtnII';
// // import { saveTransition, updateTransition, getAllTransitions } from '../../../Global/Calls/TransitionStorage';
// // import { saveTransition ,updateTransition, getAllTransitions } from '../../../Global/Calls/TransitionStorage';
// import { saveTransition,updateTransition, getAllTransitions  } from '../../../Global/Calls/TransitionStorage';


// export default function TransitionScreen({ route }) {
//   const [cueTime, setCueTime] = useState('');
//   const [videoDuration, setVideoDuration] = useState('');
//   const [videoFile, setVideoFile] = useState('vid 00'); // Assume the video file is a string, adjust as needed
//   const [segments, setSegments] = useState([]);
//   const [transitionSeries, setTransitionSeries] = useState(null);

//   const navigation = useNavigation();
  
//   useEffect(() => {
//     if (route.params?.transition_series) {
//       fetchSegments(route.params.transition_series);
//     } else {
//       initializeNewTransition();
//     }
//   }, [route.params]);

//   const initializeNewTransition = async () => {
//     const transitions = await getAllTransitions();
//     const lastTransition = transitions.filter(t => t.type === 'heat').pop();
//     const newTransitionSeries = lastTransition ? lastTransition.transition_series + 1 : 1;
//     setTransitionSeries(newTransitionSeries);
//   };

//   const fetchSegments = async (series) => {
//     const transitions = await getAllTransitions();
//     const transition = transitions.find(t => t.transition_series === series && t.type === 'transition');
//     if (transition) {
//       setSegments(transition.time_segments);
//       setTransitionSeries(transition.transition_series);
//     }
//   };

//   const handleSaveSegment = async () => {
//     const newSegment = {
//       video_file: videoFile,
//       cue_at: cueTime,
//       duration: videoDuration,
//     };

//     if (segments.length === 0) {
//       // New Transition
//       const newTransition = {
//         id: segments.length + 1,
//         type: 'transition',
//         transition_series: transitionSeries,
//         launched: false,
//         total_duration: videoDuration, // Update as needed
//         time_segments: [newSegment],
//       };
//       await saveTransition(newTransition);
//     } else {
//       // Update existing Transition
//       await updateTransition(transitionSeries, newSegment);
//     }

//     // Reset form and update UI
//     setCueTime('');
//     setVideoDuration('');
//     setVideoFile('');
//     fetchSegments(transitionSeries); // Refresh the segments list
//   };

//   return (
//     <View style={DataListStyle.container}>
//       <View style={DataListStyle.TitleWrapper}>
//         <SmallbtnII OnPress={() => console.log('Clicked')} hide={true} />
//         <Text style={DataListStyle.MainTitle}>Add Transition</Text>
//         <SmallbtnII OnPress={() => console.log('Clicked')} />
//       </View>

//       <View style={DataListStyle.SessionWrapper}>
//         <Text style={DataListStyle.Sessiontxt}>Custom Video Option</Text>

//         <View style={GlobalStyles.RowMaker}>
//           <Text style={DataListStyle.Sessiontxt}>Cue at</Text>
//           <TextInput
//             value={cueTime}
//             onChangeText={setCueTime}
//             placeholder="Add cue time here"
//           placeholderTextColor={"white"}

//             style={[DataListStyle.Sessiontxt, { marginLeft: 5 }]}
//           />
//         </View>

//         <TextInput
//           value={videoDuration}
//           onChangeText={setVideoDuration}
//           placeholder="Add Video duration"
        //   placeholderTextColor={"white"}
//           style={[DataListStyle.Sessiontxt, { marginLeft: 5 }]}
//         />

//         <View style={GlobalStyles.RowMaker}>
//           <Entypo name="upload" size={WindowHeight / 24} color={Colors.lightTxt} />
//           <TouchableOpacity>
//             <Fontisto name="record" size={WindowHeight / 24} style={{ marginLeft: 10 }} color={Colors.danger} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleSaveSegment}>
//             <Fontisto name="submit" size={WindowHeight / 24} style={{ marginLeft: 10 }} color={Colors.danger} />
//           </TouchableOpacity>
//         </View>

   
//       </View>
//       <FlatList
//           data={segments}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({ item }) => (
//             <View style={GlobalStyles.RowMaker}>
//               <Text>{`Cue at: ${item.cue_at} sec, Duration: ${item.duration} sec, File: ${item.video_file}`}</Text>
//             </View>
//           )}
//         />
//     </View>
//   );
// }


import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Entypo, Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { WindowHeight } from '../../../Global/components/Dimensions';
import Colors from '../../../Global/Branding/colors';
import DataListStyle from './DataListStyles';
import GlobalStyles from '../../../Global/Branding/GlobalStyles';
import SmallbtnII from '../../../Global/components/SmallBtnII';
import { saveTransition,updateTransition, getAllTransitions  } from '../../../Global/Calls/TransitionStorage';

export default function TransitionScreen({ route }) {
  const [cueTime, setCueTime] = useState('');
  const [videoDuration, setVideoDuration] = useState('');
  const [videoFile, setVideoFile] = useState(''); // Assume the video file is a string, adjust as needed
  const [segments, setSegments] = useState([]);
  const [transitionSeries, setTransitionSeries] = useState(null);

  const navigation = useNavigation();
  
  useEffect(() => {
    if (route.params?.transition_series) {
      fetchSegments(route.params.transition_series);
    } else {
      initializeNewTransition();
    }
  }, [route.params]);

  const initializeNewTransition = async () => {
    const transitions = await getAllTransitions();
    const lastTransition = transitions.filter(t => t.type === 'transition').pop(); // Correcting to 'transition'
    const newTransitionSeries = lastTransition ? lastTransition.transition_series + 1 : 1;
    setTransitionSeries(newTransitionSeries);
  };

  const fetchSegments = async (series) => {
    console.log(series)
    const transitions = await getAllTransitions();
    const transition = transitions.find(t => t.transition_series === series && t.type === 'transition');
    if (transition) {
        console.log(transition)
      setSegments(transition.time_segments);
      setTransitionSeries(transition.transition_series);
    }

  };

  const handleSaveSegment = async () => {
    const newSegment = {
      video_file: videoFile,
      cue_at: cueTime,
      duration: videoDuration,
    };

    if (segments.length === 0) {
      // New Transition
      const newTransition = {
        id: segments.length + 1,
        type: 'transition',
        transition_series: transitionSeries,
        launched: false,
        total_duration: videoDuration, // Update as needed
        time_segments: [newSegment],
      };
      await saveTransition(newTransition);
    } else {
      // Update existing Transition
      await updateTransition(transitionSeries, newSegment);
    }

    // Reset form and update UI
    setCueTime('');
    setVideoDuration('');
    setVideoFile('');
    fetchSegments(transitionSeries); // Fetch and update the segments list
  };

  return (
    <View style={DataListStyle.container}>
      <View style={DataListStyle.TitleWrapper}>
        <SmallbtnII OnPress={() => console.log('Clicked')} hide={true} />
        <Text style={DataListStyle.MainTitle}>Add Transition</Text>
        <SmallbtnII OnPress={() => console.log('Clicked')} />
      </View>

      <View style={DataListStyle.SessionWrapper}>
        <Text style={DataListStyle.Sessiontxt}>Custom Video Option</Text>

        <View style={GlobalStyles.RowMaker}>
          <Text style={DataListStyle.Sessiontxt}>Cue at</Text>
          <TextInput
            value={cueTime}
            onChangeText={setCueTime}
            placeholder="Add cue time here"
          placeholderTextColor={"white"}

            style={[DataListStyle.Sessiontxt, { marginLeft: 5 }]}
          />
        </View>

        <TextInput
          value={videoDuration}
          onChangeText={setVideoDuration}
          placeholder="Add Video duration"
          placeholderTextColor={"white"}

          style={[DataListStyle.Sessiontxt, { marginLeft: 5 }]}
        />

        <View style={GlobalStyles.RowMaker}>
          <Entypo name="upload" size={WindowHeight / 24} color={Colors.lightTxt} />
          <TouchableOpacity>
            <Fontisto name="record" size={WindowHeight / 24} style={{ marginLeft: 10 }} color={Colors.danger} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSaveSegment}>
            <Fontisto name="submit" size={WindowHeight / 24} style={{ marginLeft: 10 }} color={Colors.danger} />
          </TouchableOpacity>
        </View>

     
      </View>
      <FlatList
          data={segments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={GlobalStyles.RowMaker}>
              <Text style={{color:"white"}}>{`Cue at: ${item.cue_at} sec, Duration: ${item.duration} sec, File: ${item.video_file}`}</Text>
            </View>
          )}
        />
    </View>
  );
}
