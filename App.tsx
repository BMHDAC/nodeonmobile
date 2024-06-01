/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  Button,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import nodejs from 'nodejs-mobile-react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import InfoScreen from './components/InfoScreen';
import { Dropdown } from 'react-native-element-dropdown';

export interface Message {
  message: string | undefined,
  port: number | undefined
}
export interface Command {
  name: string | undefined,
  message: string | undefined,
  port: number | undefined
}
const commandList = [
  { label: "Create", value: "Create" },
  { label: "Delete", value: "Delete" },
  { label: "Close", value: "Close" }
];


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [message, setMessage] = React.useState<Message[]>([])
  const [method, setMethod] = React.useState<Command[]>([])
  const [port, setPort] = React.useState<string>("")
  const [portList, setPortList] = React.useState<number[]>([3500,])
  const [command, setCommand] = React.useState<string>("")
  const [send, setSend] = React.useState<string>("")


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    nodejs.start('main.js');
    nodejs.channel.addListener('message', (msg: Message) => {
      console.log('From node: ' + JSON.stringify(msg));
      setMessage(pre => [...pre, msg])
      console.log(message)
    });
    nodejs.channel.addListener("command", (method: Command) => {
      console.log(`Method : ${JSON.stringify(method)}`)
      setMethod(pre => [...pre, method])
    })
  }, [])

  const openURL = (port: number) => {
    Linking.openURL(`http://localhost:${port}`)
  }
  const sendMessage = (message: string) => {
    nodejs.channel.send(message)
  }

  const sendCommand = (name: string, message: string, port: string) => {
    nodejs.channel.post("command", { name: name, message: message, port: parseInt(port) || portList[0] })
  }

  return (

    <SafeAreaView style={styles.safe_area_container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.content_container} >
        <InfoScreen message={message} command={method} />
        <View style={styles.functions}>
          <View style={styles.dropdown_with_label}>
            <Text style={styles.command_text}>Port</Text>
            <TextInput style={styles.textinput} value={port} onChangeText={(text) => setPort(text)} />
          </View>
          <View style={styles.dropdown_with_label}>
            <Text style={styles.command_text}>Message</Text>
            <TextInput
              style={styles.textinput}
              value={send}
              onChangeText={(text) => {
                setSend(text)
              }}
              placeholder='Enter message'
            />
          </View>
          <View style={styles.dropdown_with_label}  >
            <Text style={styles.command_text}>Command</Text>
            <Dropdown
              style={styles.dropdown}
              value={command}
              data={commandList}
              labelField="label"
              valueField="value"
              onChange={item => {
                setCommand(item.value)
              }}
            />
          </View>
          <View style={styles.buton_container}>
            <View style={styles.row_button}>
              <Button onPress={(e) => { e.preventDefault(); openURL(parseInt(port) || portList[0]) }} title='Open URL' />
            </View>
            <View style={styles.row_button}>
              <Button onPress={(e) => { e.preventDefault(); sendMessage(send); setSend("") }} title='Send Message'></Button>
            </View>
            <View style={styles.row_button}>
              <Button onPress={(e) => { e.preventDefault(); sendCommand(command, send, port); setSend(""); setCommand("") }} title='Send Command'></Button>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  safe_area_container: {
    display: 'flex',
    flex: 1,
    flexDirection: "column",
  },
  buton_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "flex-start",
  },
  content_container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    maxHeight: "100%",
    alignContent: "flex-start",
    justifyContent: "space-between",
  },
  functions: {
    display: "flex",
    height: "30%",
    maxHeight: "30%",
    flexDirection: "column",
  },
  row_button: {
    display: "flex",
    flexDirection: "row",
    padding: "1%",
    margin: "1%",
    backgroundColor: "#000000"
  },
  dropdown_with_label: {
    display: "flex",
    flexDirection: "row",
    maxHeight: "30%",
    width: "100%",
    padding: "2%",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dropdown: {
    width: "60%",
    padding: "1%",
  },
  command_text: {
    fontSize: 20,
    fontWeight: "bold"
  },
  textinput: {
    fontSize: 18,
    height: "auto",
    padding: "1%",
    width: "60%",
    borderWidth: 1,
    borderColor: "#959796"
  }
});

export default App;
