/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  Alert,
  Button,
  Dimensions,
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
const displayHeight = Dimensions.get("window").height
const displaywidth = Dimensions.get("window").width


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [displayNoti, setDisplayNoti] = React.useState(true)
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

  const startNode = () => {
    nodejs.channel.post("command", { name: "Create", port: 3500 })
    setDisplayNoti(true)
  }
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
      {
        !displayNoti ? (
          <View style={styles.buton_container}>
            <Button onPress={startNode} title='Activate NodeJs server' />
          </View>
        ) :
          (
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
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
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
          )
      }
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  safe_area_container: {
    display: 'flex',
    flexDirection: "column",
    maxHeight: displayHeight,
    maxWidth: displaywidth
  },
  buton_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: "100%"
  },
  content_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around"
  },
  functions: {
    display: "flex",
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
    width: displaywidth,
    padding: "2%",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dropdown: {
    width: displaywidth * 0.6,
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
    width: displaywidth * 0.6,
    borderWidth: 1,
    borderColor: "#959796"
  }
});

export default App;
