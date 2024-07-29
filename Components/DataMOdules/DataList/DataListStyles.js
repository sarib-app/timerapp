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
          TitleWrapper:{
            width:WindowWidth/1.09,
            justifyContent:'space-evenly',
            alignItems:'center',
            marginTop:0,
            flexDirection:'row'
            
                  },

          MainTitle:{
            fontSize:WindowHeight/12,
            fontWeight:'bold',
            color:Colors.FontColorI,
          },
          SessionWrapper:{
            width:WindowWidth/1.09,
            padding:WindowHeight/15,
            backgroundColor:Colors.BgColorII,
            borderRadius:WindowHeight/22,
            justifyContent:"space-between",
            alignItems:'center',
            flexDirection:'row',margin:5
          },
          Sessiontxt:{
            fontSize:WindowHeight/17,
            fontWeight:'bold',
            color:Colors.FontColorI,
          },
          IconWrapper:{
            borderRadius:1000,
            // padding:WindowHeight/60,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:Colors.danger,
            width:WindowHeight/12,
            height:WindowHeight/12
          }


  })
  export default DataListStyle