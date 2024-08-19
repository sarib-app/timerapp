import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DataListStyle from './DataListStyles';
import GlobalStyles from '../../../Global/Branding/GlobalStyles';
import { WindowHeight, WindowWidth } from '../../../Global/components/Dimensions';
import Colors from '../../../Global/Branding/colors';
import SmallbtnII from '../../../Global/components/SmallBtnII';
import getAllHeatsData from '../../../Global/Calls/getHeat';
import { useNavigation } from '@react-navigation/native';
import fetchHeatData from '../../../Global/Calls/getHeats';
import UpdateBtn from '../../../Global/components/UpdateBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RenderItem = React.memo(({ item, onEdit }) => {
    const [athleteName, setAthleteName] = useState(item.athlete_name);
    const [gymName, setGymName] = useState(item.gym_name);

    useEffect(() => {
        setAthleteName(item.athlete_name);
        setGymName(item.gym_name);
    }, [item]);

    const handleAthleteChange = (text) => {
        setAthleteName(text);
        onEdit(item.id, 'athlete_name', text);
    };

    const handleGymChange = (text) => {
        setGymName(text);
        onEdit(item.id, 'gym_name', text);
    };

    return (
        <View style={DataListStyle.SessionWrapper}>
            <Text style={DataListStyle.Sessiontxt}>Lane {item.id}</Text>
            <TextInput
                style={DataListStyle.Sessiontxt}
                value={athleteName}
                onChangeText={handleAthleteChange}
            />
            <TextInput
                style={DataListStyle.Sessiontxt}
                value={gymName}
                onChangeText={handleGymChange}
            />
        </View>
    );
});

export default function LaneScreen({ route }) {
    const { heatSeries } = route.params;
    const [showMenu, setShowMenu] = useState(false);
    const [sid, setSid] = useState(heatSeries);
    const [lanes, setLanes] = useState([]);
    const [editedLanes, setEditedLanes] = useState({});

    const navigation = useNavigation();

    useEffect(() => {
        getHeatData(sid);
    }, [sid]);

    const getHeatData = async (sid) => {
        const heatData = await fetchHeatData(sid);
        if (heatData) {
            console.log('Fetched Heat Data:', heatData);
            setLanes(heatData?.lanes || []);
        } else {
            console.log('No heat data found.');
        }
    };

    const handleEdit = useCallback((laneId, field, value) => {
        setEditedLanes(prevState => ({
            ...prevState,
            [laneId]: {
                ...prevState[laneId],
                [field]: value,
            },
        }));
    }, []);

    const onUpdateLanesData = async () => {
        try {
            const updatedLanes = lanes.map(lane => {
                const editedLane = editedLanes[lane.id];
                if (editedLane) {
                    return { ...lane, ...editedLane };
                }
                return lane;
            });

            const storedHeats = await AsyncStorage.getItem('heats');
            const heats = storedHeats ? JSON.parse(storedHeats) : [];

            const existingHeatIndex = heats.findIndex(h => h.heat_series === sid);
            if (existingHeatIndex !== -1) {
                heats[existingHeatIndex].lanes = updatedLanes;
                await AsyncStorage.setItem('heats', JSON.stringify(heats));
                console.log('Lanes data updated successfully.');
                setLanes(updatedLanes);
                setEditedLanes({});
            } else {
                console.warn('Heat object with the provided heat_series not found.');
            }
        } catch (error) {
            console.error('Error updating lanes data:', error);
        }
    };

    return (
        <View style={DataListStyle.container}>
            <View style={DataListStyle.TitleWrapper}>
                <SmallbtnII OnPress={() => console.log("dsds")} hide={true} />
                <Text style={DataListStyle.MainTitle}>Lanes</Text>
                <UpdateBtn OnPress={onUpdateLanesData} />
            </View>
            <FlatList 
                data={lanes}
                renderItem={({ item }) => (
                    <RenderItem
                        item={item}
                        onEdit={handleEdit}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                extraData={editedLanes}
            />
        </View>
    );
}
