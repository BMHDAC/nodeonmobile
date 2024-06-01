import { Dimensions, ScrollView, StyleSheet, Text, View, processColor } from "react-native";
import { Command, Message } from "../App";

const displayHeight = Dimensions.get("window").height
const displaywidth = Dimensions.get("window").width
type Props = {
  message: Message[],
  command: Command[]
}
export default function InfoScreen(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.des_text}>Echo Message</Text>
      <View style={styles.message_log_container}>
        <ScrollView>
          {
            props.message?.map((value, index) => (
              <View style={styles.log_element_row} key={index}>
                <Text style={styles.name_text}>{value.port} :</Text>
                <Text style={styles.info_text}>{value.message}</Text>
              </View>
            ))
          }
        </ScrollView>
      </View>
      <Text style={styles.des_text}>Command Response</Text>
      <View style={styles.command_log_container}>
        <ScrollView>
          {
            props.command?.map((value, index) => (
              <View style={styles.log_element_row} key={index}>
                <Text style={styles.name_text}>{value.name}: </Text>
                <Text style={styles.info_text}>{value.message}: </Text>
              </View>
            ))
          }
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "flex-start",
    width: "100%",
    height: "50%",
    maxHeight: "50%",
  },
  message_log_container: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: "3%",
    height: "45%",
    maxHeight: "45%",
    borderWidth: 2,
    borderColor: "#000000"
  },
  command_log_container: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: "3%",
    height: "45%",
    maxHeight: "45%",
    borderWidth: 2,
    borderColor: "#2ecc71"
  },
  name_text: {
    fontSize: 20,
    color: "#e74c3c"
  },
  info_text: {
    fontSize: 20
  },
  log_element_row: {
    display: "flex",
    flexDirection: "row"
  },
  des_text: {
    fontSize: 20,
    color: "blue"
  }
})
