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
        // justifyContent:"space-between",
        alignItems:'center',
      paddingBottom:40,
          },
          TitleWrapper:{
            width:WindowWidth/1.12,
            justifyContent:'space-between',
            alignItems:'center',
            marginTop:0,
            flexDirection:'row'
            
                  },

          MainTitle:{
            fontSize:WindowHeight/18,
            fontWeight:'bold',
            color:Colors.FontColorI,
          },
          SessionWrapper:{  
            width:WindowWidth/1.09,
            padding:WindowHeight/34,
            backgroundColor:Colors.BgColorII,
            borderRadius:WindowHeight/40,
            justifyContent:"space-between",
            alignItems:'center',
            flexDirection:'row',margin:5
          },
          Segment_Wrapper:{  
            width:WindowWidth/1.12,
            // padding:WindowHeight/34,
            justifyContent:"space-between",
            alignItems:'center',
            flexDirection:'row',
            paddingBottom:WindowWidth/70,
            borderBottomWidth:1,
            borderBottomColor:Colors.lightTxt
          },
          SessionWrapper_parent:{  
            width:WindowWidth/1.09,
            padding:WindowHeight/34,
            backgroundColor:Colors.BgColorII,
            borderRadius:WindowHeight/40,
            alignItems:'center',
            margin:5
          },
          SessionWrapper_Inner:  {
          width:WindowWidth/1.2,
          // padding:WindowHeight/34,
          justifyContent:"space-between",
          alignItems:'center',
          flexDirection:'row',
          padding:WindowWidth/70,
          borderBottomWidth:1,
          borderBottomColor:Colors.lightTxt
        },
          SessionWrapper_Headings:{  
            width:WindowWidth/1.12,
            // padding:WindowHeight/34,
            // backgroundColor:Colors.BgColorII,
            borderRadius:WindowHeight/40,
            justifyContent:"space-between",
            alignItems:'center',
            flexDirection:'row',margin:5
          },
          Session_heading_txt:{
            fontSize:WindowHeight/23,
            fontWeight:'bold',
            color:Colors.FontColorI,
          },
          Sessiontxt:{
            fontSize:WindowHeight/25,
            fontWeight:'bold',
            color:Colors.FontColorI,
          
          },
          Sessiontxt_inner:{
            fontSize:WindowHeight/28,
            fontWeight:'bold',
            color:Colors.FontColorI,
          
          },
          CustomSoundTst:{
            fontSize:WindowHeight/30,
            fontWeight:'bold',
            color:"#487FD2",
          },
          IconWrapper:{
            borderRadius:1000,
            // padding:WindowHeight/60,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:Colors.danger,
            width:WindowHeight/15,
            height:WindowHeight/15
          }


  })
  export default DataListStyle