import React, { useEffect ,useState} from "react";
import { Select, Box, CheckIcon, Center, NativeBaseProvider } from "native-base";

const Example = (prop) => {
    // console.log('base',prop.area)

    let [service, setService] = useState(prop.area);
    useEffect(()=>{
      
    },[service])
    return <Center>
        <Box w="3/4" maxW="300">
            <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
        }} mt={1} onValueChange={itemValue => setService(itemValue)}>
            
            <Select.Item label={service} value={service} />
            </Select>
        </Box>
        </Center>;
};

function SelectBasic(props) {
    // console.log('SelectBasic',props.area)
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example area={props.area}/>
            </Center>
          </NativeBaseProvider>
        );
    };
export default SelectBasic;
    