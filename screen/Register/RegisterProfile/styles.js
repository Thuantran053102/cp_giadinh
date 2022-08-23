import { Row } from 'native-base';
import { StyleSheet  } from 'react-native';
import React from 'react';

<item name="colorAccent">#dd00ff</item>
const styles = StyleSheet.create({
    main:{
          // width:'300%',
        height:'100%',
        marginLeft:0,
        // backgroundColor:'#fff',
        minWidth:400,
        position:'relative',
    },

    IDMemWrap:{
        flexDirection:'row',
        borderRadius:10,
        borderColor:'rgba(76,76,76,0.4)',
        borderWidth:2,
        paddingHorizontal:10,
        paddingVertical:5,
        backgroundColor:'#fff',
        width:'100%',
    },
    idEmty:{
        flex:1
        // borderRadius:10,
        // borderColor:'rgba(76,76,76,0.4)',
        // borderWidth:2,
        // paddingHorizontal:10,
        // paddingVertical:5,
        // backgroundColor:'#fff',
        // width:'100%',

    },
    namelocal:{
        borderRadius:10,
        borderColor:'rgba(76,76,76,0.4)',
        borderWidth:2,
        paddingHorizontal:10,
        paddingVertical:5,
        backgroundColor:'#fff',
        width:'100%',
       
    },
    container: {
        flex: 1,
        justifyContent: 'center',
      },
    hireDateWrap:{
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-start',
      
        borderRadius:10,
        borderColor:'rgba(76,76,76,0.4)',
        borderWidth:2,
        backgroundColor:'#fff',

    },
    terminationDateWrap:{
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-start',
        // width:'100%',
        borderRadius:10,
        borderColor:'rgba(76,76,76,0.4)',
        borderWidth:2,
        backgroundColor:'#fff',

    },
    hireDateText:{
        borderRadius:10,
      
        flex:3,
        paddingHorizontal:10,
        paddingVertical:5,
        
    },
    terminationDateText:{
        borderRadius:10,
       
        flex:3,
        paddingHorizontal:10,
        paddingVertical:5,
        
    },
    terminationDate:{
        backgroundColor:'red',
        color:'blue'
    },
    hireDate:{
      
    },
    iconHireDate:{
        color: '#5d5d5d',
        
    },
    wrapDatePiker:{
        position:'absolute',
        top:-50,
        left:-5,
        right:-5,
        bottom:-5,
        backgroundColor:'rgba(174,174,174,0.6)'
    },
    formDatePiker:{
        position:'absolute',
        top:150,
        left:-5,
        right:-5,
        paddingVertical:40,
        backgroundColor:'#fff'
    },


})
export default styles