import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'native-base';
import React, { Component } from 'react';
import { View, Text,ScrollView,TouchableOpacity } from 'react-native';
import { Path } from '../../api/Path';
import { ApiAuthority } from '../../api/User';
import moment from 'moment';
import { CheckUserRule,CheckTOkenRule } from '../../func';
import styles from "./styles";
import { FormControl, Select, Center, CheckIcon, WarningOutlineIcon, NativeBaseProvider } from "native-base";
import SelectBasic from '../../components/SelectBasic';
import Selectbase from '../../components/SelectBase';

class Home extends Component {
    
    state={
        provinceData:[],
        addtressProvince:[],
        ListMember:[],
        provall: [{"Full_Name": "",
        "Permission_ID": "ADM001",
        "Province_ID": '',
        "Province_Name": "Tất cả",
        "User_ID": "",}]
    }
    

    // load page
    componentDidMount=()=>{
        this.fnHandleGetAuthority()
        
    }

    // lấy quyền user
    fnHandleGetAuthority=async()=>{
        const {provall}= this.state
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=JSON.parse(User).username
        const password= JSON.parse(User).password
        const valuef={
            "DataBaseName": Path.DataBaseName,
            Params:  [
                username,
                password
            ],
            StoreProcedureName: "SP_NATIONALLITY_PROVINCE_GET",
            SchemaName:"SQL01UAT"
            }
        let formData = new FormData();
        formData.append('data',JSON.stringify(valuef))
        await ApiAuthority(username,password,JSON.parse(Token),formData,async res => {
        
            this.setState({provinceData:[...provall,...res.Data]})
           
            this.fnHandlegetMemall()
        })
    }
    // lấy danh sách 
    fnHandlegetMemall=async(prv_id)=>{
        if(!prv_id){
            prv_id=''
        }
        const {provinceData} = this.state
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=JSON.parse(User).username
        const password= JSON.parse(User).password
        const valuef={
            "DataBaseName": Path.DataBaseName,
            Params:  [
                provinceData[1].User_ID,
                prv_id
            ],
            StoreProcedureName: "SP_MEMBER_GETALL",
            SchemaName:"SQL01UAT"
            }
        let formData = new FormData();
        formData.append('data',JSON.stringify(valuef))
        ApiAuthority(username,password,JSON.parse(Token),formData,async res => {
       
            this.setState({ListMember:res.Data})
        })
        
    }


    


  

    render() {
        const {provinceData,addtressProvince,ListMember} = this.state
        let viewProvince = []
        viewProvince = provinceData.map((item, index)=>{
       
            
            return (
            <>
                <Text> {item.Province_ID}</Text>
                <Text> {item.Province_Name}</Text>
            </>
            )
        })

        var ViewListMem=[]
        ViewListMem= ListMember.map((item, index)=>{
            return (
                <>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Profile" , {
              data: item
            } )}>
                    <View style={styles.itemWrap}>
                        <View style={styles.itemWRight}>
                            <Text>Tên:{item.Name_Local} </Text>
                            <Text>Tuổi: {moment(item.BirthDate).format("DD/MM/YYYY")} </Text>
                        </View>
                        <View style={styles.itemWLeft}>

                            <Text>Số ĐT</Text>  
                            <Text>{item.Phone}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                
                </>
                )
        })
       
     
        // arrayUsers.map(function (item, index, arr) {
        //     return (
        
        return (
               <>
               
                    <ScrollView>
                   
                        <View style={styles.mainWrap}>
                            {/* {viewProvince.length > 0 ? viewProvince: null} */}
                            {/* <Button onPress={()=>{this.props.navigation.replace("Register");}}>click</Button> */}
                        
                            {/* <Selectbase /> */}
                            <View style={styles.searchWrap}>
                                {
                                    provinceData.length > 0 ? <Selectbase province={{provinceData}} fnHandlegetMemall={this.fnHandlegetMemall}/> :null 
                                }
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Register")}>
                                    <Text>Tạo</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.listMain}>
                                <View style={styles.listWrap}>
                                    {
                                        ListMember.length > 0 ? ViewListMem  : null
                                    }
                                    
                                
                                </View>
                            </View>
                            {/* <View style={{height:40,marginVertical:40}}>
                                {
                                    addtressProvince.length >0 ? <SelectBasic area={addtressProvince[0].Area_Name_Loc}/>  : null
                                }
                            </View>
                            <View style={{height:40,marginVertical:20}}>
                                {
                                    addtressProvince.length >0 ? <SelectBasic area={addtressProvince[0].Region_Name}/>  : null
                                }
                            </View>
                            <View style={{height:40,marginVertical:20}}>
                                {
                                    addtressProvince.length >0 ? <SelectBasic area={addtressProvince[0].Country_Name}/>  : null
                                }
                            </View> */}
                            <View>
                                
                            </View>
                        </View>
                    </ScrollView>
               </>
        );
    }
}

export default Home;
