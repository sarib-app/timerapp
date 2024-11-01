import AsyncStorage from '@react-native-async-storage/async-storage';

async function findHeatAfterTransition(transitionSeries) {
    try {
        // Retrieve the data from AsyncStorage
        const storedHeats = await AsyncStorage.getItem('heats');
        const heats = storedHeats ? JSON.parse(storedHeats) : [];

        // Find the index of the transition object with the specific transition_series
        const transitionIndex = heats.findIndex(t => t.type === 'transition' && t.transition_series === transitionSeries);

        if (transitionIndex === -1) {
            throw new Error(`Transition with series ${transitionSeries} not found`);
        }

        // Loop through the rest of the array, starting from the index after the transition object
        for (let i = transitionIndex + 1; i < heats.length; i++) {
            if (heats[i].type === 'heat') {
                return heats[i]; // Return the heat object once found
            }
        }

        throw new Error(`No heat object found after the transition series ${transitionSeries}`);
    } catch (error) {
        console.error('Error finding heat after transition:', error);
        return null; // Return null in case of an error
    }
}

export default findHeatAfterTransition;
