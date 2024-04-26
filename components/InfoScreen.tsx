import { ScrollView, StyleSheet, Text, View, processColor } from "react-native";
import { Message } from "../App";

type Props = {
  message: Message[],
  command: any
}
export default function InfoScreen(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.message_log_container}>
        <ScrollView>
          {
            props.message?.map((value, index) => (
              <View style={styles.log_element_row} key={index}>
                <Text key={index} style={styles.name_text}>{value.port} :</Text>
                <Text style={styles.info_text}>{value.message}</Text>
              </View>
            ))
          }
        </ScrollView>
      </View>
      <View style={{ height: "5%" }}></View>
      <View style={styles.command_log_container}>
        <Text style={styles.name_text}>{props.command.name}: </Text>
        <Text style={styles.info_text}>{props.command.message}: </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "5%",
    alignItems: "center",
    width: "100%",
  },
  message_log_container: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingLeft: "3%",
    maxHeight: "40%",
    minHeight: "25%",
    borderWidth: 2,
    borderColor: "#000000"
  },
  command_log_container: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingLeft: "3%",
    width: "100%",
    maxHeight: "40%",
    minHeight: "25%",
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
  }
})
