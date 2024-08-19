import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import HomeStyles from './HomeStyles';
import Colors from '../../Global/Branding/colors';
import { EvilIcons, Fontisto, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SwipeButton } from 'react-native-expo-swipe-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Controls_layout1 from './Controls_Layout1';
import Controls_layout2 from './Controls_Layout2';
import { WindowHeight, WindowWidth } from '../../Global/components/Dimensions';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [locked, setlocked] = useState(true);
  const [temp_play, setTempPlay] = useState(false);
  const [showVid, setShowVid] = useState(false);
  const [data, setData] = useState([]);
  const [currentHeat, setCurrentHeat] = useState(null);
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    async function fetchLaunchedHeat() {
      try {
        const storedHeats = await AsyncStorage.getItem('heats');
        const heats = storedHeats ? JSON.parse(storedHeats) : [];
        const launchedHeat = heats.find(h => h.launched === true);

        if (launchedHeat) {
          setCurrentHeat(launchedHeat);
          setData(launchedHeat.lanes || []);
          setTimeLeft(launchedHeat.total_duration || 0);
        } else {
          Alert.alert('No heat launched', 'Please launch a heat first.');
        }
      } catch (error) {
        console.error('Error fetching launched heat:', error);
      }
    }

    fetchLaunchedHeat();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      setTimer(timerId);
    } else if (timeLeft === 0 && currentHeat) {
      handleNextHeat();
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const launchHeat = async (heatId) => {
    try {
      const storedHeats = await AsyncStorage.getItem('heats');
      const heats = storedHeats ? JSON.parse(storedHeats) : [];

      const updatedHeats = heats.map(heat => ({
        ...heat,
        launched: heat.id === heatId,
      }));

      await AsyncStorage.setItem('heats', JSON.stringify(updatedHeats));
      const launchedHeat = updatedHeats.find(h => h.id === heatId);

      if (launchedHeat) {
        setCurrentHeat(launchedHeat);
        setData(launchedHeat.lanes || []);
        setTimeLeft(launchedHeat.total_duration || 0);
      }
    } catch (error) {
      console.error('Error launching heat:', error);
    }
  };

  const handleNextHeat = async () => {
    try {
      const storedHeats = await AsyncStorage.getItem('heats');
      const heats = storedHeats ? JSON.parse(storedHeats) : [];
      const currentIndex = heats.findIndex(h => h.id === currentHeat.id);

      if (currentIndex < heats.length - 1) {
        const nextHeat = heats[currentIndex + 1];
        await launchHeat(nextHeat.id);
      } else {
        Alert.alert('End of heats', 'No more heats left.');
      }
    } catch (error) {
      console.error('Error handling next heat:', error);
    }
  };

  const handlePrevHeat = async () => {
    try {
      const storedHeats = await AsyncStorage.getItem('heats');
      const heats = storedHeats ? JSON.parse(storedHeats) : [];
      const currentIndex = heats.findIndex(h => h.id === currentHeat.id);

      if (currentIndex > 0) {
        const prevHeat = heats[currentIndex - 1];
        await launchHeat(prevHeat.id);
      } else {
        Alert.alert('Start of heats', 'No previous heats available.');
      }
    } catch (error) {
      console.error('Error handling previous heat:', error);
    }
  };

  const handlePlayPause = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    } else {
      setTimeLeft(timeLeft - 1);
    }
  };

  return (
    <View style={HomeStyles.container}>
      <View style={HomeStyles.Header}>
        <FlatList 
          data={data}
          renderItem={({item}) => <HeaderItems item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={HomeStyles.TitleWrapper}>
          <Ionicons name="menu" size={WindowHeight / 12} color={"transparent"} />
          {!showVid && <Text style={HomeStyles.MainTitle}>{currentHeat ? `HEAT ${currentHeat.id}` : 'No Heat'}</Text>}
          <Ionicons
            onPress={() => navigation.navigate("Datalist")}
            name="menu" size={WindowHeight / 12} color={Colors.FontColorI}
          />
        </View>
        {!showVid ? 
          <Controls_layout1 
            locked={false}
            onPress={() => setShowVid(true)}
            timeLeft={timeLeft}
            onPlayPause={handlePlayPause}
            onNext={handleNextHeat}
            onPrev={handlePrevHeat}
          /> 
          : <Controls_layout2 />
        }
      </View>
      <View style={HomeStyles.BottomWrapper}>
        {locked ? 
          <View>
            <SwipeButton
              Icon={
                <Fontisto name={locked ? "locked":"unlocked"} size={WindowHeight/22} color={Colors.Dark} />
              }
              width={WindowWidth/4.5}
              height={WindowHeight/10}
              onComplete={() => setlocked(false)}
              title="Swipe to complete"
              borderRadius={1000}
              circleBackgroundColor={Colors.FontColorI}
              circleSize={WindowHeight/8}
              underlayContainerGradientProps={{
                colors: [Colors.BgColorII, Colors.BgColorII],
                start: [0, 0.5],
                end: [1.3, 0.5],
              }}
              titleStyle={{color: "white", fontSize: 10}}
              containerStyle={{ backgroundColor: Colors.BgColorII }}
              underlayTitle="Release to complete"
            />
          </View> :
          <TouchableOpacity 
            onPress={() => setlocked(true)}
            style={{padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.FontColorI, borderRadius: 2000}}
          >
            <Fontisto name={locked ? "locked":"unlocked"} size={WindowHeight/22} color={Colors.Dark} />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
}

function HeaderItems({ item }) {
  const [selection, setSelection] = useState(1);
  const clr = selection === 1 ? Colors.BgColorII : selection === 2 ? Colors.send : Colors.danger;

  function selectionHandler() {
    if (selection === 1) {
      setSelection(2);
    } else if (selection === 2) {
      setSelection(3);
    } else {
      setSelection(1);
    }
  }

  return (
    <TouchableOpacity
      onPress={() => selectionHandler()}
      style={[HomeStyles.HeadertItem, { backgroundColor: clr }]}
    >
      <Text style={HomeStyles.boxTitle}>{item.title}</Text>
      <Text style={HomeStyles.boxTitle}>{item.name}</Text>
      <Text style={HomeStyles.boxSubTitle}>{item.gym}</Text>
    </TouchableOpacity>
  );
}
