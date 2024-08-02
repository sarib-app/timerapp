import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Components/Home/HomeScreen';
import Datalist from './Components/DataMOdules/DataList/DataList';
import HeatList from './Components/DataMOdules/DataList/HeatList';


// import 'expo-dev-client'
const Stack = createStackNavigator();

const App = () => {

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName={"HomeScreen"}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Datalist" component={Datalist} options={{ headerShown: false }} />
        <Stack.Screen name="HeatList" component={HeatList} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
