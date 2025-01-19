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
import React, {useState, useEffect} from "react";
import PickerItem from "./src/components/PickerItem";
import CardConverted from "./src/components/CardConverted";
import { api } from "./src/request/data";

export interface CurrencyExchange {
    code: string;     
    codein: string;     
    name: string;      
    high: string;       
    low: string;        
    varBid: string;     
    pctChange: string;  
    bid: string;        
    ask: string;        
    timestamp: string;  
    create_date: string; 
}

export default function App() {

  const [showCardConverter, setShowCardConverter] = useState(false);
  const [currencies, setCurrencies] = useState<CurrencyExchange[]>([]);
  const [indexValueConverted, setIndexValueConverted] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  
  useEffect(() => {
    const httpRequest = async () => {
      try {
        const response = await api.get("/json/all");
        const currencyData = response.data; 

        // extrai os valores que estão em cada chave no json, e retorna apenas os valores sem as chaves
        const currencyArray: CurrencyExchange[] = Object.keys(currencyData).map(key => currencyData[key]);
        setCurrencies(currencyArray); 
      }catch(error) {
         console.log("Erro ao buscar os dados", error);
      }
    }

    httpRequest();
  },[]);


  const currenciesInfo = currencies.map((item) => {
    return {
      ask: item.ask,
      code: item.code
    };
  });

 
  const handleShowCardConverter = () => {
    if (inputValue === "") {
      setErrorMessage("Preencha um valor válido");  
      setShowCardConverter(false);  
    } else {
      setErrorMessage(""); 
      setShowCardConverter(true);  
    }
  };

  let valueConverted = inputValue != "" ? (Number(currenciesInfo[indexValueConverted].ask) * Number(inputValue)) : Number(currenciesInfo[indexValueConverted]?.ask);

  return(
    <KeyboardAvoidingView 
      style={styles.container}  
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
         <View style={styles.contentScrollView}>
           <View style={styles.header}>
             <Text style={styles.title}>Selecione uma moeda</Text>
             <PickerItem
               currentCurrency={indexValueConverted}
               setCurrentCurrency={setIndexValueConverted}
               data={currencies}
             />
             <Text style={styles.title}>Digite um valor para converter em (R$)</Text>
             <TextInput
               onChangeText={value => setInputValue(value)}
               style={styles.textInput}
               placeholder="EX: 150"
               keyboardType="numeric"
             />
             <TouchableOpacity style={styles.buttonConverter} onPress={handleShowCardConverter}>
               <Text style={styles.textButton}>Converter</Text>
             </TouchableOpacity>
          </View>
          {
            showCardConverter ? <CardConverted 
            handleClose={() =>setShowCardConverter(false)}
            code={currenciesInfo[indexValueConverted].code}
            valueConverted={valueConverted}
            inputValue={inputValue}
            /> : ""
          }
           {errorMessage && (
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 30}}>
              <Text style={{ color: "#fff" }}>{errorMessage}</Text>
            </View>
           )}
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
      paddingLeft: 15,
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