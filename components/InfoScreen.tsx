import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Message } from "../App";

type Props = {
  message: Message[],
  command: any
}
export default function InfoScreen(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.message_container}>
        <ScrollView>
          {
            props.message?.map((value, index) => (
              <Text key={index} style={styles.info_text}>{value.port} : {value.message}</Text>
            ))
          }
        </ScrollView>
      </View>
      <View style={{ height: "5%" }}></View>
      <View style={styles.message_container}>
        <Text style={styles.info_text}>Command sent : {JSON.stringify(props.command)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "5%",
    justifyContent: "center",
    alignItems: "center"
  },
  message_container: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingLeft: "3%",
    maxHeight: "45%",
  },
  info_text: {
    fontSize: 20
  }
})
