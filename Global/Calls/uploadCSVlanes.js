// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as FileSystem from 'expo-file-system';
// import * as DocumentPicker from 'expo-document-picker';
// import { Alert } from 'react-native';

// export const uploadAndUpdateLanesFromCSV = async (heatSeries) => {
//     try {
//         // Step 1: Pick the CSV file
//         const file = await DocumentPicker.getDocumentAsync({ type: 'text/csv' });
//         console.log("data",file)
//         if (file.canceled ) {
//             console.log('File picking was canceled.');
//             return;
//         }

//         // Step 2: Read the file content
//         const fileContent = await FileSystem.readAsStringAsync(file.assets[0].uri);

//         // Step 3: Parse the CSV content into JSON
//         const csvRows = fileContent.split('\n');
//         const parsedLanes = csvRows.slice(1).map(row => {
//             const [id, athlete_name, gym_name] = row.split(',');
//             return {
//                 id: parseInt(id.trim(), 10),
//                 athlete_name: athlete_name.trim(),
//                 gym_name: gym_name.trim(),
//             };
//         });

//         // Step 4: Fetch existing heats from AsyncStorage
//         const storedHeats = await AsyncStorage.getItem('heats');
//         const heats = storedHeats ? JSON.parse(storedHeats) : [];

//         // Step 5: Find and update the heat series
//         const heatIndex = heats.findIndex(h => h.heat_series === heatSeries);
//         if (heatIndex !== -1) {
//             heats[heatIndex].lanes = parsedLanes;
//             await AsyncStorage.setItem('heats', JSON.stringify(heats));
//             console.log('Lanes updated successfully.');
//             Alert.alert('Success', 'Lanes data updated successfully from CSV.');
//         } else {
//             console.warn(`Heat series ${heatSeries} not found.`);
//         }
//     } catch (error) {
//         console.error('Error uploading or updating lanes:', error);
//         Alert.alert('Error', 'Failed to update lanes data from CSV.');
//     }
// };
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { Alert } from 'react-native';

export const uploadAndUpdateLanesFromCSV = async (heatSeries) => {
    try {
        // Step 1: Pick the CSV file
        const file = await DocumentPicker.getDocumentAsync({ type: 'text/csv' });
        console.log("File data:", file);
        if (file.canceled) {
            console.log('File picking was canceled.');
            return;
        }

        // Step 2: Read the file content
        const fileContent = await FileSystem.readAsStringAsync(file.assets[0].uri);

        // Step 3: Parse the CSV content into JSON
        const csvRows = fileContent.split('\n');
        const parsedLanes = csvRows.slice(1).map(row => {
            const [id, athlete_name, gym_name] = row.split(',');
            return {
                id: parseInt(id.trim(), 10),
                athlete_name: athlete_name.trim(),
                gym_name: gym_name.trim(),
            };
        });

        // Step 4: Fetch existing heats from AsyncStorage
        const storedHeats = await AsyncStorage.getItem('heats');
        const heats = storedHeats ? JSON.parse(storedHeats) : [];

        // Step 5: Find and update the heat series
        const heatIndex = heats.findIndex(h => h.heat_series === heatSeries);
        if (heatIndex !== -1) {
            const existingLanes = heats[heatIndex].lanes;

            // Step 6: Update lanes based on parsed CSV data
            const updatedLanes = existingLanes.map(lane => {
                const updatedLane = parsedLanes.find(item => item.id === lane.id);
                return updatedLane ? { ...lane, ...updatedLane } : lane;
            });

            heats[heatIndex].lanes = updatedLanes;
            await AsyncStorage.setItem('heats', JSON.stringify(heats));
            console.log('Lanes updated successfully.');
            Alert.alert('Success', 'Lanes data updated successfully from CSV.');
            return "200"
        } else {
            console.warn(`Heat series ${heatSeries} not found.`);
            return null
        }
    } catch (error) {
        console.error('Error uploading or updating lanes:', error);
        Alert.alert('Error', 'Failed to update lanes data from CSV.');
        return null
    }
};
