import { Text } from "native-base";
import { View ,TextInput,TouchableOpacity,Button,Image,ScrollView} from "react-native";
import React, { useEffect } from "react";
import styles from "./styles";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
// import { Path } from "../../../api/Path";
import { postManagerImageOpenSale } from "../../../api/User";
import moment from "moment";
import { CheckTOkenRule ,CheckUserRule} from "../../../func";
import { Ionicons } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { ViewStyle } from "react-native";
// import DatePicker from 'react-native-datepicker'
import DatePicker from "react-native-styled-datepicker";


import {TextArea, Select, Box, CheckIcon,Input, Stack, Avatar, HStack, Center, NativeBaseProvider } from "native-base";

function RegisterProfile(props){

    const [stateProfile, setStateProfile]=props.state
    const [image, setImage] = useState({uri:''});
    const [imgname,setImgname]=useState('')
    // const [date, setDate] = useState(new Date(1598051730000)); // 
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(
        {
            showModalPick:false,
            showHire:false,
            showTermination:false,
            showBirthDate:false,
        }
    );
    const [check,setCheck]= useState({
        chID:true,
    })


    useEffect(()=>{
        console.log(stateProfile.Service_Year) 
    },[stateProfile.Service_Year])
   useEffect(()=>{
      
        if(stateProfile.Termination_DT && stateProfile.Hire_DT)
        {
            console.log(stateProfile.Termination_DT)
            console.log(stateProfile.Hire_DT)
            const a = stateProfile.Termination_DT.slice(0,stateProfile.Termination_DT.indexOf('-'))
            const b =stateProfile.Hire_DT.slice(0,stateProfile.Hire_DT.indexOf('-'))
            setStateProfile({...stateProfile,Service_Year:a-b})
        }
      
      
    // if(stateProfile.Termination_DT && stateProfile.Hire_DT)
    // {
    //     Termination=Number(Termination.slice(0,Termination.indexOf('-')))
    //     Hire=Number(Hire.slice(0,Hire.indexOf('-')))
    //     setStateProfile({...stateProfile,Service_Year:Number(Termination)-Number(Hire)}) 
    //     console.log(stateProfile)
    //     //     Number((stateProfile.Hire_DT).slice(0,stateProfile.Hire_DT.indexOf('-'))) 
    // }
    // console.log(valueService_Year)
    // 
    // stateProfile.Hire_DT
   },[stateProfile.Termination_DT,stateProfile.Hire_DT])

    const handleChangtext=(type,value)=>{
        // if( type==='id')
        // Number.i
        // if (Number.isFinite(Number(value))) {
        //     setStateProfile(Number({...stateProfile,EMPL_ID:value}))

        // }
        type==='id' && setStateProfile({...stateProfile,EMPL_ID:value})
        type==='namelocal' && setStateProfile({...stateProfile,Name_Local:value})
        type==='email' && setStateProfile({...stateProfile,Email:value})
        type==='phone' && setStateProfile({...stateProfile,Phone:value})
        type==='address' && setStateProfile({...stateProfile,Address:value})
    }
    //check
    useEffect(()=>{


        // if(stateProfile.EMPL_ID && stateProfile.EMPL_ID.length===10)
        // {
        //     if(stateProfile.EMPL_ID.slice(0,2)=='VN' && Number.isInteger(Number(stateProfile.EMPL_ID.slice(2))))
        //     {
        //         a= true
        //     } 
        // }
        // if(a)
        // {
        //     setCheck({...check,chID:false})
        //     // a= false
        // }
        // else{
        //     setCheck({...check,chID:true})
        // }
        (stateProfile.EMPL_ID && stateProfile.EMPL_ID.length===10 && (stateProfile.EMPL_ID.slice(0,2)=='VN')&& (Number.isInteger(Number(stateProfile.EMPL_ID.slice(2)))))?setCheck({...check,chID:false}):setCheck({...check,chID:true})
        
    },[stateProfile.EMPL_ID])

    // load hinh ảnh lên gia diện,...
    const pickImage = async () => {
        const images=[]
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });
        if (!result.cancelled) {
            let uri = result.uri;
            let name = (result.uri).split('/').pop();
            let match = /\.(\w+)$/.exec(name);
            let type = match ? `image/${match[1]}` : `image`;
            let obj = { uri, name, type }
            setImgname(obj.name)
            await setImage(obj);
        }
    };
    // đẩy ảnh lên api
    const fnhandleUploadimg=async()=>{
        console.log('images',image)
        const images=[]
        await images.push(image)
        let Token = await CheckTOkenRule();
        let User = await CheckUserRule();
        const username=JSON.parse(User).username
        const password= JSON.parse(User).password
        const Body = {
            "DataBaseName": "0x02000000D505990DD8B558F00E1D1155C043F2097810A8F545AAD8E44A06E422B6D2F182",
                "Params":  [
                    "VN00070534"
                ],
                "StoreProcedureName": "SP_MEMBER_INSERT",
            "SchemaName":"SQL01UAT"
            }
            const formData = new FormData();
            formData.append('data',JSON.stringify(Body));
            // formData.append("files[]", image);
            if(images.length>0)
            {
                for(let i =0 ;i< images.length; i++)
                {
                    formData.append("files[]", images[i]);
                }
            }else{
            }
            postManagerImageOpenSale(username,password,JSON.parse(Token),formData,async res => {
        })
    }
    
    // show datepicker
    const showDatepicker = (type) => {
        if (Platform.OS === 'android') {
            if(type==='hire'){
                setShow({...show,showModalPick:true,showHire:true})
            }else if(type==='termination'){
                setShow({...show,showModalPick:true,showTermination:true})
            }else if(type==='BirthDate'){
                // await setShow({...show,showBirthDate:true});
                setShow({...show,showModalPick:true,showBirthDate:true})
            }
        }
        setMode('date');
      };

    const onChange = (value) => {
       
        if(show.showHire)
        {
            // setShow({...show,showHire:false});
            setStateProfile({...stateProfile,Hire_DT:value})
        }
        else if(show.showTermination){
            // setShow({...show,showTermination:false});
            setStateProfile({...stateProfile,Termination_DT:value})
        }
        else if(show.showBirthDate){
            // setShow({...show,showBirthDate:false});
            setStateProfile({...stateProfile,BirthDate:value})
        }
    };




    return(
            <ScrollView style={styles.main}>
        <NativeBaseProvider style={styles.main}>
       
            <View style={styles.main}>
                
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={()=>fnhandleUploadimg()}>
                            <Text>ddđ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>pickImage()}>
                            <HStack justifyContent="center" space={2}>
                                {/* <Avatar bg="green.500" size="xl" source={{uri: `file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fvpmswine-a0dfb15d-a9fc-4a0f-8f49-c2b12b328345/ImagePicker/2aaade19-eda9-4cf1-b484-d83a025e154a.png`}}/> */}
                                {/* { uri:`${ !image.uri? '' :image.uri }` } */}
                                <Image source={ image.uri  ?{uri:`${image.uri }`}: require('../../../assets/img_avatar_default.png')} style={{ width: 100, height: 100, borderRadius:100 }} />
                            </HStack>
                        </TouchableOpacity>
                    </View>
                    <Text>ID thành viên {
                        check.chID &&(   <Text>:<Text style={{fontSize:10, color:'red'}}>  Không hợp lệ</Text></Text> )
                    }</Text>
                    <View style={styles.IDMemWrap}>
                        {/* <Text style={{fontSize:14}}>VN</Text> */}
                        <TextInput value={stateProfile.EMPL_ID} onChangeText={(e)=>{handleChangtext('id',e)}} style={styles.idEmty }placeholder={'VN00000789'}/>
                    </View>
                    
                    <Text>Tên thành viên</Text>
                    <TextInput style={styles.namelocal} value={stateProfile.Name_Local} onChangeText={(e)=>{handleChangtext('namelocal',e)}}   placeholder={'Tên thành viên'}/>
                    <View style={{flexDirection:'row',flex:2,justifyContent:'space-between'}}>
                        <View style={{flex:1, }}>
                            <Text>Giới tính</Text>
                            <NativeBaseProvider textAlign={"left"}>
                                <Center textAlign={"left"}>
                                        <Center textAlign={"left"} >
                                            <Box w="3/4" maxW="300" textAlign={"left"} >
                                                <Select  backgroundColor="#fff" borderRadius='10' borderColor='rgba(76,76,76,0.4)' borderWidth='2' 
                                                selectedValue={stateProfile.Sex} minWidth="190" textAlign={"left"} accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                                                bg: "#fff", endIcon: <CheckIcon size="5" />
                                                }} mt={1} onValueChange={itemValue => setStateProfile({...stateProfile,Sex:itemValue})}>
                                               
                                                <Select.Item label='Nam' value='M' />
                                                <Select.Item label='Nữ' value='F' />
                                                </Select>
                                            </Box>
                                        </Center>
                                </Center>
                            </NativeBaseProvider>
                        </View>
                        <View style={{flex:1}}>
                            <Text>Tham gia/không tham gia</Text>
                            <NativeBaseProvider textAlign={"left"}>
                                <Center textAlign={"left"}>
                                        <Center textAlign={"left"} >
                                            <Box w="3/4" maxW="300" textAlign={"left"} >
                                                <Select  backgroundColor="#fff" borderRadius='10' borderColor='rgba(76,76,76,0.4)' borderWidth='2' 
                                                selectedValue={stateProfile.Performance} minWidth="190" textAlign={"left"} accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                                                bg: "#fff", endIcon: <CheckIcon size="5" />
                                                }} mt={1} onValueChange={itemValue => setStateProfile({...stateProfile,Performance:itemValue})}>
                                                <Select.Item label='Tham gia' value='1' />
                                                <Select.Item label='Không tham gia' value='2' />
                                                </Select>
                                            </Box>
                                        </Center>
                                </Center>
                            </NativeBaseProvider>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',flex:2,justifyContent:'space-between'}}>
                        <View style={{flex:1, }}>
                            <Text>Còn sống/Đã mất</Text>
                            <NativeBaseProvider textAlign={"left"}>
                                <Center textAlign={"left"}>
                                        <Center textAlign={"left"} >
                                            <Box w="3/4" maxW="300" textAlign={"left"} >
                                                <Select  backgroundColor="#fff" borderRadius='10' borderColor='rgba(76,76,76,0.4)' borderWidth='2' 
                                                selectedValue={stateProfile.Status} minWidth="190" textAlign={"left"} accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                                                bg: "#fff", endIcon: <CheckIcon size="5" />
                                                }} mt={1} onValueChange={itemValue => setStateProfile({...stateProfile,Status:itemValue})}>
                                               
                                                <Select.Item label='Còn sống' value='1' />
                                                <Select.Item label='Đã mất' value='2' />
                                                </Select>
                                            </Box>
                                        </Center>
                                </Center>
                            </NativeBaseProvider>
                        </View>
                        <View style={{flex:1}}>
                            <Text>Tình trạng công việc</Text>
                            <NativeBaseProvider textAlign={"left"}>
                                <Center textAlign={"left"}>
                                        <Center textAlign={"left"} >
                                            <Box w="3/4" maxW="300" textAlign={"left"} >
                                                <Select  backgroundColor="#fff" borderRadius='10' borderColor='rgba(76,76,76,0.4)' borderWidth='2' 
                                                    selectedValue={stateProfile.JobStatus} minWidth="190" textAlign={"left"} accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                                                    bg: "#fff", endIcon: <CheckIcon size="5" />
                                                    }} mt={1} onValueChange={itemValue => setStateProfile({...stateProfile,JobStatus:itemValue})}>
                                                    <Select.Item label='Có việc làm' value='1' />
                                                    <Select.Item label='Không có việc làm' value='2' />
                                                </Select>
                                            </Box>
                                        </Center>
                                </Center>
                            </NativeBaseProvider>
                        </View>
                    </View>

                    {/* <View style={{flexDirection:'row',flex:2,justifyContent:'flex-start'}}>
                        
                        <View style={{flex:1}}>
                            
                        </View>
                    </View> */}

                    
                    
                    <Text>Email</Text>
                    <TextInput style={styles.namelocal} value={stateProfile.Email} onChangeText={(e)=>{handleChangtext('email',e)}}   placeholder={'Email'}/>
                    <Text>Số điện thoại</Text>
                    <TextInput style={styles.namelocal} value={stateProfile.Phone} onChangeText={(e)=>{handleChangtext('phone',e)}}   placeholder={'Số điện thoại'}/>
                    <Text>Địa chỉ</Text>
                    <TextInput style={styles.namelocal} value={stateProfile.Address} onChangeText={(e)=>{handleChangtext('address',e)}}   placeholder={'Số nhà/hẻm/đường/xã'}/>
    
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flex:1, marginEnd:10}}>
                            <Text style={{  marginTop:10}}>Ngày vào làm</Text>
                            <View style={styles.hireDateWrap}>
                                <Text style={styles.hireDateText}>{moment(stateProfile.Hire_DT).format("DD/MM/YYYY")}</Text>
                                    {/* {show.showHire && (
                                    <DateTimePicker
                                        style={styles.hireDate}
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        onChange={onChange}
                                    />
                                )} */}
                                <Ionicons style={styles.iconHireDate} onPress={()=>showDatepicker('hire')} name="md-calendar-sharp" size={36} />
                            </View>
                        </View>
                        <View style={{flex:1}}>

                            <Text style={{  marginTop:10}}>Ngày nghỉ làm</Text>
                            <View style={styles.terminationDateWrap}>
                                <Text style={styles.terminationDateText}>{moment(stateProfile.Termination_DT).format("DD/MM/YYYY")}</Text>
                                    {/* {show.showTermination && (
                                    <DateTimePicker
                                        style={{flex: 1, backgroundColor:'red'}}
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        onChange={onChange}
                                    />
                                )} */}
                                <Ionicons style={styles.iconHireDate} onPress={()=>showDatepicker('termination')} name="md-calendar-sharp" size={36} />
                            </View>
                        </View>
                        
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flex:1, marginEnd:10}}>

                            <Text>Số năm đã phục: {stateProfile.Service_Year}</Text>
                            {/* <TextInput style={styles.namelocal} value={stateProfile.Service_Year} onChangeText={(e)=>{handleChangtext('namelocal',e)}}   placeholder={'Năm'}/> */}
                                        
                        </View>
                        <View style={{flex:1}}>

                            <Text>Ngày thánh năm sinh</Text>
                            <View style={styles.terminationDateWrap}>
                                <Text style={styles.terminationDateText}>{moment(stateProfile.BirthDate).format("DD/MM/YYYY")}</Text>
                                    {/* {show.showBirthDate && (
                                        <>
                                    <DateTimePicker
                                        // themeVariant="light"
                                        // positiveButtonLabel="sss!"
                                    
                                    // positiveButtonLabel="Negative"
                                        textColor="red"
                                        display="spinner"
                                        style={styles.terminationDate}
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        onChange={onChange}
                                        // isVisible={isDatePickerVisible}
                                        
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                    />
                                    <Button title="OK"> <Text>ok</Text></Button>
                                        </>
                                )} */}
                                <Ionicons style={styles.iconHireDate} onPress={()=>showDatepicker('BirthDate')} name="md-calendar-sharp" size={36} />
                            </View>   
                        </View>
                   </View>
                    <View style={{width:'100%'}}>
                        <NativeBaseProvider style={{width:'100%'}}>
                            <Center flex={1} px="3" width={"100%"}>
                                <Text>Ghi chú</Text>
                                <Box alignItems="center" w="100%">
                                {/* maxW="300" */}
                                    {/* <Textarea ={this.handleNote} placeholder="Nhập ghi chú" rowSpan={3}></Textarea> */}
                                    <TextArea backgroundColor="#fff" borderRadius='10' borderColor='rgba(76,76,76,0.4)'
                                     borderWidth='2'  h={20} placeholder="ghi chú" w="100%"  
                                     value={stateProfile.Remark} onChangeText={(e)=>setStateProfile({...stateProfile,Remark:e})}/>
                                </Box>
                            </Center>
                        </NativeBaseProvider>
                    </View>
                    <View style={{width:'100%'}}>
                        <NativeBaseProvider style={{width:'100%'}}>
                            <Center flex={1} px="3" width={"100%"}>
                                <Text>Hoàn cảnh gia đình</Text>
                                <Box alignItems="center" w="100%">
                                {/* maxW="300" */}
                                    {/* <Textarea ={this.handleNote} placeholder="Nhập ghi chú" rowSpan={3}></Textarea> */}
                                    <TextArea backgroundColor="#fff" borderRadius='10' borderColor='rgba(76,76,76,0.4)'
                                     borderWidth='2'  h={20} placeholder="Hoàn cảnh gia đình" w="100%"  
                                     value={stateProfile.Situation} onChangeText={(e)=>setStateProfile({...stateProfile,Situation:e})}/>
                                </Box>
                            </Center>
                        </NativeBaseProvider>
                    </View>
                 
                    <View style={{width:'100%'}}>
                        <NativeBaseProvider style={{width:'100%'}}>
                            <Center flex={1} px="3" width={"100%"}>
                                <Text>Tình trạng sức khỏe</Text>
                                <Box alignItems="center" w="100%">
                                {/* maxW="300" */}
                                    {/* <Textarea ={this.handleNote} placeholder="Nhập ghi chú" rowSpan={3}></Textarea> */}
                                    <TextArea backgroundColor="#fff" borderRadius='10' borderColor='rgba(76,76,76,0.4)'
                                     borderWidth='2'  h={20} placeholder="TÌnh trạng sức khỏe" w="100%"  
                                     value={stateProfile.HealthStatus} onChangeText={(e)=>setStateProfile({...stateProfile,HealthStatus:e})}/>
                                </Box>
                            </Center>
                        </NativeBaseProvider>
                    </View>
                        {
                            show.showModalPick &&  (
                                <View style={styles.wrapDatePiker}>

                                <View style={styles.formDatePiker}>
                                    <DatePicker 
                                        // minDate={'2022-07-10'}
                                        // initialDate={'2012-03-01'}
                                         maxDate={ show.showTermination ? new Date() : show.showHire && new Date()}
                                        onChange={(value)=>onChange(value)}
                                    />
                                    <Button title="OK" onPress={()=>{ setShow({...show,showModalPick:false,showHire:false ,showTermination:false ,showBirthDate:false})}}> <Text>ok</Text></Button>
                                </View>
                            </View> 
                            )
                        }
                       
            </View>
            <View style={{height:50}}>

            </View>
            
        
        </NativeBaseProvider>
                </ScrollView>
    )
}
export default RegisterProfile