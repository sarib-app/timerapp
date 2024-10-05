import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to update a specific time segment of a transition and recalculate total_duration
export async function updateTransitionSegment(transitionSeries, segmentIndex, updatedSegmentData) {
    try {
        // Get existing transitions
        const storedTransitions = await AsyncStorage.getItem('heats');
        let transitions = storedTransitions ? JSON.parse(storedTransitions) : [];

        // Find the transition with the given transition_series
        const transitionIndex = transitions.findIndex(t => t.type === "transition" && t.transition_series === transitionSeries);
        if (transitionIndex === -1) {
            throw new Error('Transition series not found');
        }

        // Get the transition to update
        const transition = transitions[transitionIndex];

        // Check if the segmentIndex is valid
        if (segmentIndex < 0 || segmentIndex >= transition.time_segments.length) {
            throw new Error('Invalid segment index');
        }

        // Update the specific segment at the given index
        transition.time_segments[segmentIndex] = updatedSegmentData;

        // Recalculate the total_duration by summing all segment durations
        transition.total_duration = transition.time_segments.reduce((sum, segment) => sum + segment.duration, 0);

        // Save the updated transitions back to AsyncStorage
        transitions[transitionIndex] = transition; // Update the transition in the array
        await AsyncStorage.setItem('heats', JSON.stringify(transitions));
        await AsyncStorage.setItem('changings',"true")

        console.log('Transition segment updated successfully');

        return true; // Return success
    } catch (error) {
        console.error('Error updating transition segment:', error);
        return false; // Return failure in case of error
    }
}
