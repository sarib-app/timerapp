import {
    StyleSheet,
   Dimensions
  } from 'react-native'
// import { Divider } from 'react-native-paper';
import Colors from '../../../Global/Branding/colors';
const WindowWidth = Dimensions.get('screen').width
  const WindowHeight = Dimensions.get('screen').height; 
  const DataListStyle = StyleSheet.create({ 
    
    container: {
        width:WindowWidth,
        height:WindowHeight,
        backgroundColor:Colors.Dark,
        flexDirection: 'column',
        justifyContent:"space-between",
        alignItems:'center',
      paddingBottom:40,
          },

          MainTitle:{
            fontSize:WindowHeight/10,
            fontWeight:'bold',
            color:Colors.FontColorI,
          },


  })
  export default DataListStyle