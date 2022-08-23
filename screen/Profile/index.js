import { View,Text } from "native-base";
import React, { Component } from "react";
import { NativeBaseProvider } from "native-base";
import { CheckTOkenRule,CheckUserRule } from "../../func";
import { Path } from "../../api/Path";
import { ApiAuthority } from "../../api/User";

class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            dataProfile:[],
            addtressProvince:[]
        }
    }
    componentDidMount=async()=>{
        // this.fnHandleGetProfile()
        // conso
        await this.props.route ?this.setState({dataProfile:this.props.route.params.data}) :null
        const {dataProfile} = this.state
        await this.fnHandleGetLocation(dataProfile.Province_ID) 
    }

    // vị trí địa lý
    fnHandleGetLocation= async (prv_id)=>{
        console.log("prv_id",prv_id)
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=JSON.parse(User).username
        const password= JSON.parse(User).password
        const valuef={
            "DataBaseName": Path.DataBaseName,
            Params:  [
                prv_id
            ],
            StoreProcedureName: "SP_ADDRESS_GETINSERT",
            SchemaName:"SQL01UAT"
            }
        let formData = new FormData();
        formData.append('data',JSON.stringify(valuef))
        ApiAuthority(username,password,JSON.parse(Token),formData,async res => {
            console.log("res.Data addtresaass",res.Data)
        //    this.setState({addtressProvince:res.Data})
        //    console.log('res.Dataddddddddddddddddddd',res.Data[0].Area_Name_Eng)
        })
    }
    render(){
        const {dataProfile} = this.state
   
    
        return(
            <NativeBaseProvider>
                
                <View>
                    <Text>{dataProfile.Address}</Text>
                </View>
            </NativeBaseProvider>
        )
    }
}
export default Profile