import React, {Component, useEffect, useState} from "react";
import { FormControl, Select, Center, CheckIcon, WarningOutlineIcon, NativeBaseProvider } from "native-base";


function Example(props){
  const arr =[ {
    "Full_Name": "Huỳnh Sơn Thảo",
    "Permission_ID": "HRBP001",
    "Province_ID": 53,
    "Province_Name": "Long An",
    "User_ID": "USR003",
  },]

  const [viewA,setViewA]=useState(arr)
  const [service,setService] = useState('')
    
  // useEffect(()=>{
  //   // setViewA(props)
  //   console.log('dsa12',props.province.province)
   
  // },[])
  const getData=async()=>{
    const repont= await props.province.province
   
    setViewA(repont)
    
  }
  getData()

  useEffect(()=>{
    
    props.fnHandlegetMemall(service)
  },[service])

  return <Center>
      <FormControl w="3/4" maxW="300" isRequired isInvalid>
        <FormControl.Label>Choose service</FormControl.Label>
        <Select minWidth="200" onValueChange={itemValue => setService(itemValue)} accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
        bg: "teal.600", endIcon: <CheckIcon size={5} />
      }} mt="1">
        {
           viewA.map(function(item,index){ 
            return (<Select.Item  label={item.Province_Name} value={item.Province_ID} />)
          })
        }
        </Select>
        {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please make a selection!
        </FormControl.ErrorMessage> */}
      </FormControl>
    </Center>;
};

class Selectbase extends Component {
  constructor(props){
    super(props)
    this.state={
      province:[] 
    }
  }
 
  componentDidMount=()=>{
    this.setState({province:this.props.province.provinceData})
    
  }
  render(){
    const {province}= this.state
    return (
      
      <NativeBaseProvider>
        <Center flex={1} px="3">
            <Example province={{province}}  fnHandlegetMemall={this.props.fnHandlegetMemall}/>
        </Center>
      </NativeBaseProvider>
    );
  }
      
};
export default Selectbase
    