import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import DataListStyle from './DataListStyles';
import GlobalStyles from '../../../Global/Branding/GlobalStyles';
import { Entypo, Fontisto } from '@expo/vector-icons';
import { WindowHeight } from '../../../Global/components/Dimensions';
import Colors from '../../../Global/Branding/colors';
import SmallbtnII from '../../../Global/components/SmallBtnII';
import AddHeatSegments from '../../Modals/AddHeatSegments';
import { dataSAmple } from '../../datasample';

export default function HeatList({ route, navigation }) {
  const [showMenu, setShowMenu] = useState(false);
  const [duration, setDuration] = useState("");
  const [pod, setPod] = useState(false);
  const [countDown, setCountDown] = useState("down");
  const [heatSeries, setHeatSeries] = useState(route.params?.heat_series || 1);
  const [timeSegments, setTimeSegments] = useState([]);

  useEffect(() => {
    if (heatSeries) {
      // Fetch time segments for the specific heat_series
      const heat = dataSAmple.find(heat => heat.id === heatSeries);
      if (heat) {
        setTimeSegments(heat.time_segments);
      }
    }
  }, [heatSeries]);

  function RenderItem({ item }) {
    function RenderSoundOptions({ item }) {
      return (
        <View style={DataListStyle.SessionWrapper_Inner}>
          <Text style={DataListStyle.Sessiontxt_inner}>Custom Sound Option</Text>
          <Text style={DataListStyle.Sessiontxt_inner}>CUE AT {item.cue_at}</Text>
          <Text style={[DataListStyle.Sessiontxt_inner, { color: "transparent" }]}>N/A</Text>
          <View style={{ flexDirection: 'row' }}>
            <Entypo name="upload" size={WindowHeight / 24} color={Colors.lightTxt} />
            <Fontisto name="record" size={WindowHeight / 24} style={{ marginLeft: 10 }} color={Colors.danger} />
          </View>
        </View>
      );
    }
    return (
      <View style={DataListStyle.SessionWrapper_parent}>
        <View style={DataListStyle.Segment_Wrapper}>
          <Text style={DataListStyle.Sessiontxt}>Time Segment {item.id}</Text>
          <Text style={DataListStyle.Sessiontxt}>{item.duration}</Text>
          <Text style={DataListStyle.Sessiontxt}>{item.play_sequence}</Text>
          <Text style={DataListStyle.Sessiontxt}>{item.preload === false ? "NO" : "YES"}</Text>
        </View>
        <FlatList
          data={item.sounds}
          renderItem={({ item }) => <RenderSoundOptions item={item} />}
        />
      </View>
    );
  }

  function SegmentHeader() {
    return (
      <View style={DataListStyle.SessionWrapper_Headings}>
        <Text style={DataListStyle.Session_heading_txt}>Title</Text>
        <Text style={DataListStyle.Session_heading_txt}>Duration</Text>
        <Text style={DataListStyle.Session_heading_txt}>Count</Text>
        <Text style={DataListStyle.Session_heading_txt}>PSO</Text>
      </View>
    );
  }

  function onOpenMenu() {
    setShowMenu(true);
  }

  function onSaveSegment(newSegment) {
    setShowMenu(false);
    if (heatSeries) {
      // Add the new segment to the existing heat
      const updatedHeat = dataSAmple.find(heat => heat.id === heatSeries);
      if (updatedHeat) {
        updatedHeat.time_segments.push(newSegment);
        setTimeSegments([...updatedHeat.time_segments]);
      }
    } else {
      // Create a new heat and add the segment
      const newHeatSeries = `heat_${Date.now()}`; // Generate a unique ID for the new heat
      const newHeat = {
        id: newHeatSeries,
        time_segments: [newSegment],
      };
      dataSAmple.push(newHeat);
      setHeatSeries(newHeatSeries);
      setTimeSegments([newSegment]);
    }
  }

  return (
    <View style={DataListStyle.container}>
      <View style={DataListStyle.TitleWrapper}>
        <SmallbtnII OnPress={() => console.log("Add New Heat")} hide={true} />
        <Text style={DataListStyle.MainTitle}>ADD HEAT</Text>
        <SmallbtnII OnPress={onOpenMenu} />
      </View>

      <SegmentHeader />
      <FlatList
        data={timeSegments}
        renderItem={({ item }) => <RenderItem item={item} />}
      />

      {showMenu && (
        <AddHeatSegments
          setDuration={setDuration}
          POD={setPod}
          setCountOption={setCountDown}
          onPress={(e)=>onSaveSegment(e)}
        />
      )}
    </View>
  );
}
