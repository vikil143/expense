import * as React from "react";
import { Appbar } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";

export default function DashboardHeader() {
  return (
    <LinearGradient
      colors={["#6a11cb", "#2575fc"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    //   style={{ paddingTop: 40 }} // for status bar space
    >
      <Appbar.Header style={{ backgroundColor: "transparent", elevation: 0 }}>
        <Appbar.Content
          title="Tracker"
          titleStyle={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#fff",
            letterSpacing: 1,
          }}
        />      
        <Appbar.Action
            icon="account"
            color="white"
            onPress={() => console.log("User Pressed")}
        />
      </Appbar.Header>
    </LinearGradient>
  );
}
