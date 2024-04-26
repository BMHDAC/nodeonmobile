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
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import nodejs from 'nodejs-mobile-react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import InfoScreen from './components/InfoScreen';

export interface Message {
  message: string,
  port: number
}


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

    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Button onPress={startNode} title='Activate NodeJs server' />
        <Modal
          visible={displayNoti}
          animationType='slide'
          style={styles.modalView}
        >
          <InfoScreen message={message} command={method} />
          <View style={styles.container}>
            <Button onPress={openURL} title='Open Localhost' />
            <Button onPress={sendMessage} title='Send Message' />
            <Button onPress={sendCommand} title='Send Command' />
            <Button onPress={closeConnection} title='Close Connection' />
          </View>
        </Modal>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 24,
    fontWeight: "bold",
    padding: "5%"
  },
});

export default App;
