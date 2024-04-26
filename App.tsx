/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  Button,
  Dimensions,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import nodejs from 'nodejs-mobile-react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import InfoScreen from './components/InfoScreen';

export interface Message {
  message: string | undefined,
  port: number | undefined
}
export interface Command {
  name: string | undefined,
  message: string | undefined,
  port: number | undefined
}
const displayHeight = Dimensions.get("window").height
const displaywidth = Dimensions.get("window").width


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [displayNoti, setDisplayNoti] = React.useState(false)
  const [message, setMessage] = React.useState<Message[]>([])
  const [method, setMethod] = React.useState()

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
    nodejs.channel.addListener("command", (method) => {
      console.log(`Method : ${JSON.stringify(method)}`)
      setMethod(method)
    })
  }, [])

  const startNode = () => {
    nodejs.channel.post("command", { name: "Create", port: 3500 })
    setDisplayNoti(true)
  }
  const openURL = () => {
    Linking.openURL('http://localhost:3500')
  }
  const sendMessage = () => {
    nodejs.channel.send("Hello")
  }

  const closeConnection = () => {
    nodejs.channel.post("command", { name: "Delete", port: 3500 })
  }
  const sendCommand = () => {
    nodejs.channel.post("command", { name: "Stop", message: "Close Server" })
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
                <View style={styles.row_button}>
                  <Button onPress={openURL} title='Open URL'></Button>
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
    height: displayHeight

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
    justifyContent: "space-between",
    alignItems: "center",
    height: displayHeight
  },
  functions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  row_button: {
    display: "flex",
    flexDirection: "row",
    padding: "1%"
  }
});

export default App;
