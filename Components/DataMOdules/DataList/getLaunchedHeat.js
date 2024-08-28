import AsyncStorage from '@react-native-async-storage/async-storage';

// Global function to get the launched heat and its index
export const getLaunchedHeat = async () => {
  try {
    const storedHeats = await AsyncStorage.getItem('heats');
    const heats = storedHeats ? JSON.parse(storedHeats) : [];

    const launchedHeatIndex = heats.findIndex(heat => heat.launched === true);

    if (launchedHeatIndex !== -1) {
      const launchedHeat = heats[launchedHeatIndex];
      return { heat: launchedHeat, index: launchedHeatIndex };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching launched heat:', error);
    return null;
  }
};
