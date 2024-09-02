// Function to get time segments for a specific transition series
import AsyncStorage from "@react-native-async-storage/async-storage";
export async function getTimeSegmentsForTransition(transitionSeries) {
    try {
        // Get all transitions
        const storedTransitions = await AsyncStorage.getItem('heats');
        const transitions = storedTransitions ? JSON.parse(storedTransitions) : [];

        if (transitionSeries === null) {
            return []; // Return an empty array if transitionSeries is null
        }

        // Filter to find the specific transition
        const transition = transitions.find(t => t.type === "transition" && t.transition_series === transitionSeries);

        if (transition) {
            return transition.time_segments; // Return the time segments
        } else {
            throw new Error('Transition series not found');
        }
    } catch (error) {
        console.error('Error getting time segments for transition:', error);
        return [];
    }
}
