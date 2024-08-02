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
        justifyContent:"space-between",
        alignItems:'center',
      paddingBottom:40,
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
        // height:WindowHeight/8,
        paddingVertical:5,
        borderRadius:10,
        backgroundColor:Colors.BgColorII,
        margin:1.5,
        justifyContent:'center',
        alignItems:'center'
      },
      boxTitle:{
        color:Colors.FontColorI,
        fontSize:WindowHeight/50,
        fontWeight:'bold',
        marginHorizontal:3,
        textAlign:"center"
      },
      
      boxSubTitle:{
        color:Colors.FontColorI,
        marginHorizontal:3,

        fontSize:WindowHeight/50,
        textAlign:"center",
        fontWeight:'400'
      },
      MainTitle:{
        fontSize:WindowHeight/10,
        fontWeight:'bold',
        color:Colors.FontColorI,
      },
      TitleWrapper:{
width:WindowWidth/1.09,
justifyContent:'space-between',
alignItems:'center',
marginTop:0,
flexDirection:'row'

      },
      TimeBig:{
        fontSize:WindowHeight/3,
        fontWeight:'bold',
        color:Colors.FontColorI,
        // margin:20,
        fontFamily:'impact'
      },
      Time_small:{
        fontSize:WindowHeight/4,
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

        // display:'flex'
      },
      control_two:{
        width:WindowWidth,
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center'
      },
      Image_wrapper:{
        width:WindowWidth/2.2,
        height:WindowHeight/2.1,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:"pink"
      }


  })
  export default HomeStyles