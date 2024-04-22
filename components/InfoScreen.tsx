import { StyleSheet, Text, View } from "react-native";

type Props = {
  message: string,
  command: any
}
export default function InfoScreen(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.message_container}>
        <Text style={styles.info_text}>Server Message : {props.message}</Text>
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
  },
  info_text: {
    fontSize: 20
  }
})
