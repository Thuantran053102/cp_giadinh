// import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorage } from 'react-native';
import { Input, Item, Button, Text, Picker, Icon } from 'native-base';
import React, { Component, Fragment } from 'react';
import { View, Dimensions, Image, Alert } from 'react-native';
import { ApiGetUserInfo, ApiLogin,ApiAuthority } from '../api/User';
// import { ApiLogin } from '../api/User';
//import { fireStore, firebaseApp } from '../Fire';
// import { NativeBaseConfigProvider } from 'native-base/lib/typescript/core/NativeBaseContext';

import { NativeBaseProvider, ColorMode } from 'native-base';

import { POST_DATA_TOKEN } from '../api/Fetch';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications'
import { CheckUserRule,CheckTOkenRule,ChecKAuthority } from '../func';
import Spinner from 'react-native-loading-spinner-overlay';
import { isEmpty, isEmptyMayPhat } from '../components/Validate';
import Constants from 'expo-constants';
import { Path } from '../api/Path';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const { height } = Dimensions.get("screen");


class Login extends Component {

    state = {
        films: [],
        query: '',
        username: "hunhthao",//vanthuan
        password: "cp123",//cp123
        step: 1,
        listBA: [{ db_name: "" ,
        code: "",
        nameth: ""}],
        db_name: null,
        token: "",
        spinner: false,

    }

    componentDidMount() {
        
        this.registerForPushNotificationsAsync();
   
        //this.handleLogin(1);
    }

    registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            return;
        }

        let token = await Notifications.getExpoPushTokenAsync();
        let tokenKey = token.data;

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        this.setState({ token: tokenKey })
    }

    handleLogin = async (s) => {
        let { username, password  } = this.state;
        this.setState({ spinner: true });
        let checkUser = isEmptyMayPhat(username, "tài khoản!");
        if(!checkUser)
        {
            this.setState({ spinner: false });
            return false;
        }
        let checkPass = isEmptyMayPhat(password, "mật khẩu!");
        if(!checkPass)
        {
            this.setState({ spinner: false });
            return false;
        }

        
        if ((username && password) !== null) {
            
            this.fnHandleLogin()
            this.setState({ spinner: false });

        } else {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin")
            
        }
        
    

    }

    handeSaveStore=async (type,value)=>{
            if(type==="token")
            {
                await AsyncStorage.setItem("token",JSON.stringify(value));
            }
            else if(type==="user"){
                await AsyncStorage.setItem("user",JSON.stringify(value)); 
            }
            else if(type==="authority"){
                await AsyncStorage.setItem("authority",JSON.stringify(value)); 
            }
            
            
            
    }
    

    fnHandShow=async()=>{
        let tokenRule = await CheckTOkenRule();
        let userRule = await CheckUserRule();
        const a =await c()
    
    }
    fnHandleAuthority=async()=>{
        // SP_NATIONALLITY_PROVINCE_GET
        const Token= await AsyncStorage.getItem("token");
        let { username, password } = this.state;
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
      
        ApiAuthority(username,password,JSON.parse(Token),formData,async res => {
            const authority=res.Data[0]
            this.handeSaveStore('authority',authority)
        })
    }
    fnHandleLogin = async (s)=>{
        let { username, password } = this.state;
        let valuef = {
            "DataBaseName":Path.DataBaseName,
            "Params":  [
                username,
                password
            ],
            "StoreProcedureName": "SP_TB_USER_CHECKACCOUNT",
        }
        let formData = new FormData();
        formData.append('data',JSON.stringify(valuef));
        ApiLogin(formData,async res => {
            if (res.Status === 200) {
                
                if (res.Token) {
                    let user = {"username":username,"password": password}
                    this.handeSaveStore('token',res.Token)
                    this.handeSaveStore('user',user)
                    this.fnHandleAuthority()
                    this.props.navigation.replace("Home");
                   
                
                }
                else {
                    Alert.alert("Thông báo", "Sai tài khoản")
                }
            }
            else {
            
            }
        });
    }
    handleInput = (key, value) => {
 
        let obj = [];
        obj[key] = value;
        this.setState(obj);
    }

    
    findFilm(query) {
        if (query === '') {
          return [];
        }
    
        const { films } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return films.filter(film => film.title.search(regex) >= 0);
    }
    render() {
        let { step, listBA, db_name} = this.state;

        // let viewBA = listBA.map((item, i) => {
        //     return <Picker.Item key={i} value={item.db_name} label={item.ba_name} />
        // })

        
       
      
        // const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        

        return (
            <NativeBaseProvider>
                <View style={{
                    flex: 1,
                    height
                }}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={''}
                    />

                    <View style={{
                        flex: 1,
                        padding: 45,
                        flexDirection: "column",
                        justifyContent: "center",
                        backgroundColor: "white",
                        alignItems: "center"
                    }}>
                        {/* <Image style={{ height: 150, marginBottom: 30 }} resizeMode="contain" source={require('../assets/logo.png')} /> */}
                        <Text style={{
                            fontSize: 24,
                            fontWeight: "600",
                            marginBottom: 20,
                            textAlign: "center"
                        }}>Đăng nhập</Text>
                        {
                            step===1 && <View style={{flexDirection:'column',width:'100%'}}>
                            
                        
                        
                            <View style={{}}>
                                <View style={{paddingVertical:2}}>
                                    <Input onChangeText={(value) => this.handleInput("username", value)} defaultValue={this.state.username} value={this.state.username}  placeholder="Username" autoCapitalize="none" />
                                </View>
                                <View style={{paddingVertical:2}}>
                                    
                                    <Input style={{ lex:1}} onChangeText={(value) => this.handleInput("password", value)} defaultValue={this.state.password} value={this.state.password} placeholder="Password" secureTextEntry />
                                </View>
                            </View>
                            <Button onPress={() => this.handleLogin(1)} full style={{ borderRadius: 30, marginTop: 20 }}><Text uppercase={false}>Đăng nhập</Text></Button>
                            <Button onPress={() => this.fnHandShow()} full style={{ borderRadius: 30, marginTop: 20 }}><Text uppercase={false}>Đăng nhập</Text></Button> 
                        </View> 
                        }
                        
                  
                         {/* <Button onPress={() => this.props.navigation.navigate("Register")} full style={{ borderRadius: 30, marginTop: 10, backgroundColor: "#DEEDFD" }}><Text style={{ color: "#2E6EF4" }} uppercase={false}>Đăng ký</Text></Button> */}
                        <Text style={{ fontSize: 12, textAlign: "center", marginTop: 10 }}>Không thể đăng nhập? Vui lòng liên hệ IT Helpdesk</Text>

                        <Image style={{ height: 50, marginTop: 60 }} resizeMode="contain" source={require('../assets/footer.png')} />
                    </View>
                    
                </View> 
                
                
            </NativeBaseProvider>

        );
    }
}


export default Login;
