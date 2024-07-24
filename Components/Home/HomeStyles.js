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
        fontSize:"14px",
        fontWeight:'bold',
        marginHorizontal:3,
        textAlign:"center"
      },
      
      boxSubTitle:{
        color:Colors.FontColorI,
        marginHorizontal:3,

        fontSize:"14px",
        textAlign:"center",
        fontWeight:'400'
      },
      MainTitle:{
        fontSize:"70px",
        fontWeight:'bold',
        color:Colors.FontColorI,
      },
      TitleWrapper:{
width:WindowWidth/1.09,
justifyContent:'space-between',
alignItems:'center',
marginVertical:20,
flexDirection:'row'

      },
      TimeBig:{
        fontSize:"280px",
        fontWeight:'bold',
        color:Colors.FontColorI,
        // margin:20,
        fontFamily:'impact'
      },
      TimeWrapper:{
        width:WindowWidth/2.8,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:"yellow"
      },
      BottomWrapper:{
        width:WindowWidth/1.09,

        alignItems:'flex-end',

        display:'flex'
      }



  })
  export default HomeStyles