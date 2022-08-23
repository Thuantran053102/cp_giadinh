import React, { useEffect, useState } from 'react';
import {
StyleSheet,
View,
Text,
Dimensions,
Image
} from 'react-native';
import ViewSlider from 'react-native-view-slider'
import RegisterProfile from './RegisterProfile';
import RegisterChildrent from './RegisterChildrent';
import RegisterWorkplace from './RegisterWorkplace';
import { ScrollView } from 'react-native';
const { width, height } = Dimensions.get('window');

function Register() {
  const arrDateProfile={
    EMPL_ID: "",
    Name_Local: "",
    Sex: "M", // m là nam , f là nữ
    BirthDate: "",
    Hire_DT: "",
    Termination_DT: "",
    Service_Year:1 ,
    Performance: "0",// 1 là tham gia , 2 là không tham gia
    Phone: "",
    Email: "",
    Address: "",
    Status: 0 ,// 1 là còn sống, 2 là đã mất
    JobStatus: 0,// 1 laf đang làm / 2 là đã nghỉ
    Situation: "",
    HealthStatus: "",
    Remark: "",
    Image: "",
  }
  const arrWorkplace={
    Company_Code: "",
    DEPT_ID:"",
    Position_ID: '',
    National_ID: '',
    Province_ID: '',
    BUGRP_ID:'',
    BU_Unit:'',
  }
  const [stateProfile, setStateProfile]= useState([arrDateProfile])
  const [stateWorkplace, setStateWorkplace]= useState([arrWorkplace])

  return (
   
    <ScrollView >
      <ViewSlider 

        renderSlides = {
          <>
          <View style={styles.viewBox}><RegisterProfile state={[stateProfile, setStateProfile]}/></View>
          <View style={styles.viewBox}><RegisterWorkplace/></View>
          {/* <View style={styles.viewBox}><RegisterChildrent/></View> */}
          
          
            {/* <View style={styles.viewBox}>
              <Image source={{uri: 'https://image.shutterstock.com/image-photo/beautiful-autumn-scene-hintersee-lake-260nw-747646759.jpg'}} style={{height: 200, width}}/>
              </View>
              <View style={styles.viewBox}><Text>TWO</Text></View>
              <View style={styles.viewBox}><Text>THREE</Text></View>
            <View style={styles.viewBox}><Text>FOUR</Text></View> */}
         </>
      }
      style={styles.slider}     //Main slider container style
      // height = {200}    //Height of your slider
      slideCount = {2}    //How many views you are adding to slide
      dots = {true}     // Pagination dots visibility true for visibile 
      dotActiveColor = '#aeaeae'     //Pagination dot active color
      dotInactiveColor = 'rgba(174,174,174,0.5)'    // Pagination do inactive color
      dotsContainerStyle={styles.dotContainer}     // Container style of the pagination dots
      autoSlide = {false}    //The views will slide automatically
      slideInterval = {1000}    //In Miliseconds
     />
      </ScrollView>
     
   
  );
};

const styles = StyleSheet.create({
  viewBox: {
      flexDirection:'column',
      flex:1,
      paddingHorizontal: 20,
      justifyContent: 'center',
      width: width,
      padding: 10,
      alignItems: 'center',
      // height:1200
      
  },
  slider: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'pink'
  },
  dotContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 10
  }
});

export default Register;