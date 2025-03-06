import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Function to add or update a transition and return the transition_series
export async function addOrUpdateTransition(transitionSeries , timeSegmentData) {
    try {
        // Get existing transitions
        const storedTransitions = await AsyncStorage.getItem('heats');
        let transitions = storedTransitions ? JSON.parse(storedTransitions) : [];

        let newTransitionSeries;

        if (transitionSeries === null) {
            // Create a new transition
            const lastTransition = transitions.filter(t => t.type === "transition").pop();
            newTransitionSeries = lastTransition ? lastTransition.transition_series + 1 : 1;
            const newId = transitions.length > 0 ? transitions[transitions.length - 1].id + 1 : 1;

            const newTransition = {
                id: newId,
                type: "transition",
                transition_series: newTransitionSeries,
                launched: false,
                total_duration: timeSegmentData.duration, // Start with the duration of the first time_segment
                time_segments: [timeSegmentData],
            };

            transitions.push(newTransition);
        } else {
            // Append to existing transition
            const transitionIndex = transitions.findIndex(t => t.type === "transition" && t.transition_series === transitionSeries);
            if (transitionIndex !== -1) {
                transitions[transitionIndex].time_segments.push(timeSegmentData);

                // Update total_duration by adding the new segment's duration
                transitions[transitionIndex].total_duration += timeSegmentData.duration;

                newTransitionSeries = transitions[transitionIndex].transition_series;
            } else {
                throw new Error('Transition series not found');
            }
        }

        // Save the updated transitions back to AsyncStorage
        await AsyncStorage.setItem('heats', JSON.stringify(transitions));
        await AsyncStorage.setItem('changings',"true")
        await AsyncStorage.setItem('changing_made',"Transition added")
        await AsyncStorage.setItem('changed_id',String(transitionSeries))


        console.log('Transition added or updated successfully');

        // Return the transition_series
        return newTransitionSeries;
    } catch (error) {
        console.error('Error adding or updating transition:', error);
        return null; // Return null in case of error
    }
}



// Function to update the total_duration of a specific transition using transition_series
export async function updateTotalDuration(transitionSeries, newTotalDuration) {
    try {
        // Get existing transitions
        const storedTransitions = await AsyncStorage.getItem('heats');
        let transitions = storedTransitions ? JSON.parse(storedTransitions) : [];
        // Find the transition using the transition_series
        const transitionIndex = transitions.findIndex(t => t.type === "transition" && t.transition_series === transitionSeries);
        // Check if the transition with the given series exists
        if (transitionIndex !== -1) {
            // Update the total_duration with the new value
            transitions[transitionIndex].total_duration = newTotalDuration;
            // Save the updated transitions back to AsyncStorage
            await AsyncStorage.setItem('heats', JSON.stringify(transitions));
            await AsyncStorage.setItem('changings', "true");
        await AsyncStorage.setItem('changing_made',"Transition Duration Updated")
        await AsyncStorage.setItem('changed_id',String(transitionSeries))

            Alert.alert('Success',`Total duration updated successfully!`);
        } else {
            Alert.alert('Error',`Transition series not found`);
            throw new Error('Transition series not found');
        }
    } catch (error) {
        Alert.alert('Error',`Error updating total duration`);
        console.error('Error updating total duration:', error);
    }
}

