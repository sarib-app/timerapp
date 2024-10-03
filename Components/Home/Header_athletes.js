import React, { useState, useCallback } from 'react';
import HomeStyles from "./HomeStyles";
import Colors from "../../Global/Branding/colors";
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

function HeaderItems({ item }) {
    const [seletion, setSelection] = useState(1);
    const clr = seletion === 1 ? Colors.BgColorII : seletion === 2 ? Colors.send : Colors.danger;

    const seletionHandler = useCallback(() => {
        setSelection(prev => (prev === 3 ? 1 : prev + 1));
    }, []);

    return (
        <TouchableOpacity
            onPress={seletionHandler}
            style={[HomeStyles.HeadertItem, { backgroundColor: clr }]}>
            <Text style={HomeStyles.boxTitle}>
                Lane {item.id}
            </Text>
            <Text style={HomeStyles.boxTitle}>
                {item.athlete_name}
            </Text>
            <Text style={HomeStyles.boxSubTitle}>
                {item.gym_name}
            </Text>
        </TouchableOpacity>
    );
}

const Athletes = ({ heatData_lanes }) => {
    return (
        <View style={HomeStyles.Header}>
            <FlatList 
                data={heatData_lanes}
                renderItem={({ item }) => <HeaderItems item={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default React.memo(Athletes);
