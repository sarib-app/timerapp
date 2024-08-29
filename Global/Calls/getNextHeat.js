export const getNextHeat = async (currentHeatIndex) => {
    try {
      const storedHeats = await AsyncStorage.getItem('heats');
      const heats = storedHeats ? JSON.parse(storedHeats) : [];
  
      const nextHeatIndex = currentHeatIndex + 1;
  
      if (nextHeatIndex < heats.length) {
        const nextHeat = heats[nextHeatIndex];
        return { heat: nextHeat, index: nextHeatIndex };
      } else {
        return null; // No next heat
      }
    } catch (error) {
      console.error('Error fetching next heat:', error);
      return null;
    }
  };
  