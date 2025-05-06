import React from "react";
import { View, Text } from "react-native";
import Footer from "../Footer";

export default function SearchScreen() {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 24 }}>SearchScreen</Text>
      </View>
      <Footer />
    </>
  );
}
