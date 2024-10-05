import AsyncStorage from '@react-native-async-storage/async-storage';

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

        console.log('Transition added or updated successfully');

        // Return the transition_series
        return newTransitionSeries;
    } catch (error) {
        console.error('Error adding or updating transition:', error);
        return null; // Return null in case of error
    }
}
