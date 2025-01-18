import { 
  View, 
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, {useState} from "react";
import PickerItem from "./src/components/PickerItem";
import CardConverted from "./src/components/CardConverted";

export default function App() {

  const [showCardConverter, setShowCardConverter] = useState(false);

  const handleShowCardConverter = () => {
    setShowCardConverter(true);
  }

  return(
    <KeyboardAvoidingView 
      style={styles.container}  
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
         <View style={styles.contentScrollView}>
           <View style={styles.header}>
             <Text style={styles.title}>Selecione sua moeda</Text>
             <PickerItem/>
             <Text style={styles.title}>Digite um valor para converter em (R$)</Text>
             <TextInput
               style={styles.textInput}
               placeholder="EX: 150"
               keyboardType="numeric"
             />
             <TouchableOpacity style={styles.buttonConverter} onPress={handleShowCardConverter}>
               <Text style={styles.textButton}>Converter</Text>
             </TouchableOpacity>
          </View>
          {
            showCardConverter ? <CardConverted handleClose={() =>setShowCardConverter(false)}/> : ""
          }
         </View>
       </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#1C1C1C",
      paddingTop: 40,
   },

   header: {
      backgroundColor: "#fff",
      width: "90%",
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8
   },

   title: {
     color: "#696969",
     paddingTop: 10,
     paddingLeft: 10,
     fontWeight: "500",
     fontSize: 16
   },

   textInput: {
      paddingTop: 10,
      paddingLeft: 10,
      fontSize: 20,
      marginBottom: 10
   },

   buttonConverter: {
     backgroundColor: "#FF0000",
     padding: 20,
     borderBottomLeftRadius: 8,
     borderBottomRightRadius: 8,
     justifyContent: "center",
     alignItems: "center"
   },

   textButton: {
      fontSize: 17,
      color: "#fff",
      fontWeight: "500"
   },

   contentScrollView: {
      alignItems: "center",
      flexGrow: 1
   }

});