import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { CurrencyExchange } from '../../App';

interface PickerItemProps {
  data: CurrencyExchange[];
  currentCurrency: number;
  setCurrentCurrency: (valor: number) => void;
}

export default function PickerItem({ data, currentCurrency, setCurrentCurrency }: PickerItemProps) {

  const currency = data.map((item, index) => (
     <Picker.Item key={index} value={index} label={item.code} />
  ));

  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: "#A9A9A9" }}>
      <Picker 
      selectedValue={currentCurrency}
      onValueChange={(newValue) => setCurrentCurrency(newValue)}
      >
       {currency}
      </Picker>
    </View>
  );
}