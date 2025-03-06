import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Function to delete a specific time segment from a specific transition using transition_series
export async function deleteTimeSegment(transitionSeries, timeSegmentIndex) {
    try {
        // Get existing transitions
        const storedTransitions = await AsyncStorage.getItem('heats');
        let transitions = storedTransitions ? JSON.parse(storedTransitions) : [];

        // Find the transition using the transition_series
        const transitionIndex = transitions.findIndex(t => t.type === "transition" && t.transition_series === transitionSeries);

        // Check if the transition with the given series exists
        if (transitionIndex !== -1) {
            const transition = transitions[transitionIndex];

            // Check if the timeSegmentIndex is valid
            if (timeSegmentIndex >= 0 && timeSegmentIndex < transition.time_segments.length) {
                // Remove the specific time segment from the time_segments array
                transition.time_segments.splice(timeSegmentIndex, 1);

                // Update total_duration after removing the time segment
                transition.total_duration = transition.time_segments.reduce((total, segment) => total + segment.duration, 0);

                // Save the updated transitions back to AsyncStorage
                await AsyncStorage.setItem('heats', JSON.stringify(transitions));
                await AsyncStorage.setItem('changings', "true");
    await AsyncStorage.setItem('changing_made',"Transition Segment deleted")
    await AsyncStorage.setItem('changed_id',String(transitionSeries))


                Alert.alert("Success", 'Time segment deleted successfully');
            } else {
                throw new Error('Time segment index out of range');
            }
        } else {
            throw new Error('Transition series not found');
        }
    } catch (error) {
        Alert.alert('Error', 'Error deleting time segment');
    }
}
