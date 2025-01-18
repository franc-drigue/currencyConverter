import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import React from 'react';

type CardConverterProps = {
    handleClose: () => void;
}

export default function CardConverted({handleClose} : CardConverterProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonClose} onPress={handleClose}>
         <Text style={{color: "#fff"}}>X</Text>
      </TouchableOpacity>
      <Text style={{fontSize: 27, fontWeight: "600", color: "#000"}}>1 USD</Text>
      <Text style={{fontSize: 16, fontWeight: "500", color: "#000"}}>Corresponde a</Text>
      <Text style={{fontSize: 27, fontWeight: "600", color: "#000"}}>R$ 5,03</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: "90%",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        marginVertical: 30,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 10
    },

   buttonClose: {
       position: "absolute",
       right: 10,
       top: 10,
       backgroundColor: "#FF0000",
       paddingVertical: 3,
       paddingHorizontal: 8,
       borderRadius: 100
   }
});