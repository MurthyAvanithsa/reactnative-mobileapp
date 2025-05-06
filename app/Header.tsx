// components/Header.tsx
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://assets.tbn.org/images/tbn_plus_500x163-1704661301675.png",
        }} // Your local TBN+ logo
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.iconRow}>
        <Ionicons name="heart" size={24} color="#fff" style={styles.icon} />
        <Ionicons
          name="globe-outline"
          size={24}
          color="#fff"
          style={styles.icon}
        />
        <FontAwesome name="user-o" size={24} color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
  },
  logo: {
    width: 80,
    height: 28,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default Header;
