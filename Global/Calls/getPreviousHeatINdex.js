
import AsyncStorage from "@react-native-async-storage/async-storage";
export const getPreviousHeat = async (currentHeatIndex) => {
    try {
      const storedHeats = await AsyncStorage.getItem('heats');
      const heats = storedHeats ? JSON.parse(storedHeats) : [];
  
      const previousHeatIndex = currentHeatIndex - 1;
  
      if (previousHeatIndex >= 0) {
        const previousHeat = heats[previousHeatIndex];
        return { heat: previousHeat, index: previousHeatIndex };
      } else {
        return null; // No previous heat
      }
    } catch (error) {
      console.error('Error fetching previous heat:', error);
      return null;
    }
  };
  