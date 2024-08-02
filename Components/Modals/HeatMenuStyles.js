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

TextWrapper:{width:WindowWidth/6,borderBottomColor:Colors.FontColorI,borderBottomWidth:1,paddingVertical:WindowHeight/29},
TextStyles:{color:Colors.FontColorI,fontWeight:'bold',fontSize:WindowHeight/32},


container_heat:{padding:WindowHeight/20,backgroundColor:Colors.BgColorII,position:'absolute',top:WindowHeight/10,right:WindowWidth/15,shadowColor:Colors.Dark,shadowOpacity:0.5,borderRadius:10,alignItems:'center'},

TextWrapper_heat:{width:WindowWidth/4,borderBottomColor:Colors.FontColorI,borderBottomWidth:1,paddingVertical:WindowHeight/29,flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
TextStyles_heat:{color:Colors.FontColorI,fontWeight:'bold',fontSize:WindowHeight/32}

  })
  export default HeatStyles