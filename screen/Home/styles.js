import { Row } from 'native-base';
import { StyleSheet  } from 'react-native';
const styles = StyleSheet.create({
    mainWrap:{
        flexDirection:'column',
        width:'100%',
        flex:1,
        //backgroundColor:'blue'
    },
    searchWrap:{
        flex:1,
        flexDirection:'row',
      
        // backgroundColor:'red'
    },
    listMain:{
        flex:0,
       
        // backgroundColor:'#8ef4d1'
    },
    listWrap:{
        flexDirection:'column',
        paddingHorizontal:20,
        borderRadius:10,
        borderStartColor:'#d18ef4',
    },
    itemWrap:{
        marginVertical:10,
        flex:1,
        flexDirection:'row',
        backgroundColor:'#8ef4d1'
    },
    itemWRight:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    itemWLeft:{
        flex:1,
        alignItems:'flex-end',
        justifyContent:'center',
    }

    // testText:{
    //     color:'blue'
    // }
    
})
export default styles;