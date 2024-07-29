import {
    StyleSheet,
   Dimensions
  } from 'react-native'
// import { Divider } from 'react-native-paper';
import Colors from '../../Global/Branding/colors';
const WindowWidth = Dimensions.get('screen').width
  const WindowHeight = Dimensions.get('screen').height; 
  const HeatStyles = StyleSheet.create({ 

container:{padding:WindowHeight/20,backgroundColor:Colors.BgColorII,position:'absolute',top:WindowHeight/10,right:WindowWidth/15,shadowColor:Colors.Dark,shadowOpacity:0.5,borderRadius:10},

TextWrapper:{width:WindowWidth/5,borderBottomColor:Colors.FontColorI,borderBottomWidth:1,paddingVertical:WindowHeight/29,paddingTop:0},
TextStyles:{color:Colors.FontColorI,fontWeight:'bold',fontSize:WindowHeight/23}


  })
  export default HeatStyles