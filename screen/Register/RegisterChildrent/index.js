import { View,Text } from "native-base";
import React from "react";
import { NativeBaseProvider } from "native-base";

function RegisterChildrent(){
    return(
        <NativeBaseProvider>

            <View>
                <Text>helo3</Text>
            </View>
        </NativeBaseProvider>
    )
}
export default RegisterChildrent