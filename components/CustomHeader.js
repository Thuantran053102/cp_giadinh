import React, { Component } from 'react';
import { View, Dimensions, AsyncStorage, Platform } from 'react-native';
import { Header, Left, Body, Right, Title, Button, Icon, Badge, Text, Item, Input } from 'native-base';

//redux
import { connect } from 'react-redux';

import { LinearGradient } from 'expo-linear-gradient';



const { width } = Dimensions.get('screen');

class CustomHeader extends Component {
	state = {
		cart: [],
		keyword: ""
	}
	


	

	render() {
		let { cart, keyword } = this.state;

		//define button go back
		let btnGoBack = this.props.goBack ? <Left><Button  transparent>
			<Icon name='md-arrow-back' size={25} style={{ color: "#fff" }} />
		</Button></Left> : null;

		//define title
		let viewTitle = this.props.isHome ?
			<Item rounded style={{ marginLeft: 25,justifyContent: 'center', alignItems: 'center', flex: 16, backgroundColor: "white", height: 30 }}>

				</Item> :
			<Body style={{ flex: 4 }}>
				<Title style={{ color: "white" }}>{this.props.title}</Title>
			</Body>

		// define cart icon this.props.showCart
		let cartIcon = (this.props.isHome || (this.props.showCart === false) ) ? 
			 null : <Button style={{
				backgroundColor: "white",
				borderRadius: 30,
				height: 40,
				width: 40
			}} light small iconLeft >
				<Badge style={{
					width: 20, height: 20,
					position: "absolute", right: 10, top: 1,
					zIndex: 9, paddingTop: 0, paddingLeft: 0,
					paddingBottom: 0, paddingRight: 0, flexDirection: "column",
					justifyContent: "center",
					borderWidth: 0.3,
					borderColor: "#fff"
				}}><Text style={{ fontSize: 10 }}>{cart.length}</Text></Badge>
				<Icon style={{ marginLeft: 5, marginTop: 10 }} name='cart' />
			</Button>;

		return (
			<LinearGradient
				start={{ x: 0, y: 1 }}
				end={{ x: 1, y: 10 }}
				colors={['#019D96', '#14B087', '#1DB08C', '#388DA8', '#1DB08C']}
			>
				{/* colors={['#019D36', '#14B087', '#1DB08C', '#388DA8', '#1DB08C']} */}
				{/* {Platform.OS === "android" && <StatusBar hidden #019D96 />} */}
				{/* <StatusBar style={{backgroundColor:"transparent"}}/> */}
				<Header
					iosBarStyle="light-content"
					androidStatusBarColor="transparent"
					noShadow
					searchBar
					rounded
					transparent
					style={{ height: Platform.OS === "ios" ? 50 : 75 }}
				>
					{btnGoBack}
					{viewTitle}
					<Right>
						{cartIcon}
					</Right>
				</Header>
			</LinearGradient>
		);
	}
}

function shareState(state) {
	return {
		cart: state.cart
	}
}

CustomHeader.defaultProps = {
	title: null,
	goBack: true,
	isHome: false,
	bg: "#00964d",
	showCart: true
}

export default connect(shareState)(CustomHeader);

