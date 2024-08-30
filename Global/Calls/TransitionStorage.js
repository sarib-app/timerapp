import AsyncStorage from '@react-native-async-storage/async-storage';

const TRANSITION_STORAGE_KEY = '@transitions';

export const getAllTransitions = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TRANSITION_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error getting transitions:', e);
    return [];
  }
};

export const saveTransition = async (newTransition) => {
  try {
    const currentTransitions = await getAllTransitions();
    currentTransitions.push(newTransition);
    await AsyncStorage.setItem(TRANSITION_STORAGE_KEY, JSON.stringify(currentTransitions));
  } catch (e) {
    console.error('Error saving transition:', e);
  }
};

export const updateTransition = async (transitionSeries, newSegment) => {
  try {
    let currentTransitions = await getAllTransitions();
    const transitionIndex = currentTransitions.findIndex(
      (t) => t.transition_series === transitionSeries && t.type === 'transition'
    );

    if (transitionIndex !== -1) {
      currentTransitions[transitionIndex].time_segments.push(newSegment);
      await AsyncStorage.setItem(TRANSITION_STORAGE_KEY, JSON.stringify(currentTransitions));
    }
  } catch (e) {
    console.error('Error updating transition:', e);
  }
};
