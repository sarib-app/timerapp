import {
    StyleSheet,
   Dimensions
  } from 'react-native'
// import { Divider } from 'react-native-paper';
import Colors from '../../Global/Branding/colors';
const WindowWidth = Dimensions.get('screen').width
  const WindowHeight = Dimensions.get('screen').height; 
  const HomeStyles = StyleSheet.create({ 
    
    container: {
        width:WindowWidth,
        height:WindowHeight,
        backgroundColor:Colors.Dark,
        flexDirection: 'column',
        alignItems:'center'
      },
      Header:{
        width:WindowWidth,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:5
        // height:WindowHeight/6,
        // backgroundColor:Colors.danger,
        // paddingVertical:5
      },
      HeadertItem:{
        width:WindowWidth/10.5,
        height:WindowHeight/8,
        borderRadius:20,
        backgroundColor:Colors.BgColorII,
        margin:1.5,
        justifyContent:'center',
        alignItems:'center'
      },
      boxTitle:{
        color:Colors.FontColorI,
        fontWeight:'bold'
      },
      
      boxSubTitle:{
        color:Colors.FontColorI,
        fontWeight:'400'
      },
      MainTitle:{
        fontSize:68,
        fontWeight:'bold',
        color:Colors.FontColorI,
        margin:20
      },
      TimeBig:{
        fontSize:280,
        fontWeight:'bold',
        color:Colors.FontColorI,
        // margin:20,
        fontFamily:'impact'
      },
      TimeWrapper:{
        width:WindowWidth/5,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
      }



  })
  export default HomeStyles