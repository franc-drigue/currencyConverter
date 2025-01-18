import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React from 'react';

export default function PickerItem() {
  return (
    <View style={{borderBottomWidth: 1, borderBottomColor: "#A9A9A9"}}>
       <Picker>
          <Picker.Item key={0} value={"BTC"} label='BTC' />
       </Picker>
    </View>
  )
}