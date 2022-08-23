LogBox.ignoreAllLogs();
import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import {decode, encode} from 'base-64';
import { NativeRouter, Route, Link } from 'react-router-native'
import { Text, View, Button ,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screen/Login';
import Home from './screen/Home';
import Register from './screen/Register';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Profile from './screen/Profile';
const Stack = createStackNavigator();

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

function HeaderApp(props) {
	const navigation = useNavigation(); 
	
	  return (

		<View style={{backgroundColor:'black', width:'100%', marginTop:20,flexDirection:'row'}}>
			<Text style={{padding:20,color:'white',flex:1,justifyContent:'flex-start'}}>{props.title}</Text>
			{
				props.type!==1 ?<TouchableOpacity style={{flex:1,flexDirection:'column',justifyContent:'center'}} onPress={()=>navigation.navigate('Login')}>
				<Text style={{ flex:1,textAlign:'right',padding:20,color:'#fff',height:'100%',  }}>Log out</Text>
			</TouchableOpacity> :null
			}
			
			
		</View>
	  )

   
  }

class StackNavigator extends Component{
	render(){

		return (
				
			<Stack.Navigator>
				<Stack.Screen name="Login" component={Login}options={{
				header:()=>(
					<HeaderApp type={1} title={'Đăng Nhập'}></HeaderApp>
				),
			  
			}} />
				<Stack.Screen name="Home" component={Home}  
				options={{
					header:()=>(
					<HeaderApp type={2} title={'Danh Sách Người Cao Tuổi'}></HeaderApp>
				),}}
			/>
			 
				{/* <Stack.Screen name="Notifications" component={Notifications} /> */}
				<Stack.Screen name="Profile" component={Profile} 
				options={{
					header:()=>(
					<HeaderApp type={2} title={'Thông tin cá nhân'}></HeaderApp>
				),}}
				/>
				<Stack.Screen name='Register' component={Register}
				options={{
					header:()=>(
					<HeaderApp type={2} title={'Tạo Thông Tin Người Cao Tuổi'}></HeaderApp>
				),}}
				/>
			{/* <Stack.Screen name="Settings" component={Settings} /> */}
		  </Stack.Navigator>
	
		)
	}
}

export default function RootApp() {
		// const Stack = createNativeStackNavigator();

		return(
			<>
			
			<NavigationContainer>
		
				<StackNavigator></StackNavigator>
			</NavigationContainer>
			</>
		)
		
	
}
