// import React, { useState } from 'react';
// import { View, Text, Modal, Button, TouchableOpacity } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// import { WindowHeight, WindowWidth } from '../../Global/components/Dimensions';

// const TimeSelectorModal = ({ visible, onClose, onTimeSelected }) => {
//   const [time, setTime] = useState(new Date(0)); // Start with 00:00

//   const onChange = (event, selectedTime) => {
//     const currentTime = selectedTime || time;
//     setTime(currentTime);
//   };

//   // Function to handle when user selects time
//   const handleTimeSelected = () => {
//     const hours = time.getUTCHours();
//     const minutes = time.getUTCMinutes();
//     const totalSeconds = hours * 3600 + minutes * 60;
//     onTimeSelected(totalSeconds); // Return time in seconds
//     onClose(); // Close modal
//   };

//   return (
//     // <Modal
//     //   transparent={true}
//     //   visible={visible}
//     //   onRequestClose={onClose}
//     //   animationType="slide"
//     // >
//       <View style={{ width:WindowWidth,height:WindowHeight, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)',position:'absolute' }}>
//         <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: 300 ,alignSelf:'center'}}>
//           <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Time</Text>

//           {/* DateTimePicker for time selection */}
//           <DateTimePicker
//             value={time}
//             mode="time"
//             display="spinner"
//             onChange={onChange}
//             is24Hour={true} // 24-hour format
//           />

//           {/* Button to confirm time selection */}
//           <Button title="Select Time" onPress={handleTimeSelected} />
//           <TouchableOpacity onPress={onClose} style={{ marginTop: 10 }}>
//             <Text style={{ color: 'red', textAlign: 'center' }}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     // </Modal>
//   );
// };

// export default TimeSelectorModal;





import React, { cloneElement, useEffect, useState } from 'react';
import { View, Text, Modal, Button, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { WindowHeight, WindowWidth } from '../../Global/components/Dimensions';
import Colors from '../../Global/Branding/colors';

const TimeSelectorModal = ({ showTimeMOdal,onClose, onTimeSelected,duration }) => {
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedSecond, setSelectedSecond] = useState(0);

  const hours = [...Array(24).keys()];  // [0, 1, 2, ..., 23]
  const minutes = [...Array(60).keys()];  // [0, 1, 2, ..., 59]
  const seconds = [...Array(60).keys()];  // [0, 1, 2, ..., 59]

  // Function to handle when user selects time

  useEffect(()=>{
function convertToFOrmat(){
  // const duration = 200; // Example: duration in seconds

  // Convert seconds into hours, minutes, and seconds
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  // Set the values in the hooks
  setSelectedHour(hours);
  setSelectedMinute(minutes);
  setSelectedSecond(seconds);}

  convertToFOrmat()
  },[])
  const handleTimeSelected = () => {
    const totalSeconds = selectedHour * 3600 + selectedMinute * 60 + selectedSecond;
    onTimeSelected(totalSeconds); // Return time in seconds
    console.log(totalSeconds)
    // onClose(); // Close modal
  };

  // Render FlatList items
  const RenderItem = ({ item, onPress }) => {
    
    return(
    <TouchableOpacity style={[styles.item,{backgroundColor:selectedHour == item ? Colors.PrimaryColor:Colors.inActive}]} onPress={() => setSelectedHour(item)}>
      <Text style={styles.itemText}>{item < 10 ? '0' + item : item}</Text>
    </TouchableOpacity>
  )};
  const RenderMIn = ({ item, onPress }) => {
    
    return(
    <TouchableOpacity style={[styles.item,{backgroundColor:selectedMinute == item ? Colors.PrimaryColor:Colors.inActive}]}onPress={() => setSelectedMinute(item)}>
      <Text style={styles.itemText}>{item < 10 ? '0' + item : item}</Text>
    </TouchableOpacity>
  )};
  const RenderSec = ({ item, onPress }) => {
    
    return(
    <TouchableOpacity style={[styles.item,{backgroundColor:selectedSecond == item ? Colors.PrimaryColor:Colors.inActive}]} onPress={() => setSelectedSecond(item)}>
      <Text style={styles.itemText}>{item < 10 ? '0' + item : item}</Text>
    </TouchableOpacity>
  )};

  return (
    <Modal
      // transparent={true}
      visible={showTimeMOdal}
      // onRequestClose={onClose}
      transparent={true}
      animationType='slide'
      supportedOrientations={['landscape', 'landscape-left', 'landscape-right']}
      statusBarTranslucent={true}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select Time (HH:MM:SS)</Text>
          
          <View style={styles.timePickerContainer}>
            {/* Hours FlatList */}
            <FlatList
              data={hours}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => {
                return(
                  <RenderItem
                  item={item}
                  />
                )
              }}
              // horizontal={true}
              // showsHorizontalScrollIndicator={false}
            />

            {/* Minutes FlatList */}
            <FlatList
              data={minutes}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => {
                return(
                  <RenderMIn
                  item={item}
                  />
                )
              }}
              // horizontal={true}
              // showsHorizontalScrollIndicator={false}
            />

            {/* Seconds FlatList */}
            <FlatList
              data={seconds}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => {
                return(
                  <RenderSec
                  item={item}
                  />
                )
              }}
              // horizontal={true}
              // showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Button to confirm time selection */}
          <Button title="Select Time" onPress={handleTimeSelected} />
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    width: WindowWidth,
    height: WindowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // position: 'absolute',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  timePickerContainer: {
    flexDirection: 'row',
    height:WindowHeight/2.8,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  item: {
    // padding: WindowHeight,
    height:WindowHeight/10,
    width:WindowHeight/6,
    justifyContent:'center',
    alignItems:'center',
    // marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
   
    margin:WindowHeight/50
  },
  itemText: {
    fontSize: 18,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default TimeSelectorModal;
