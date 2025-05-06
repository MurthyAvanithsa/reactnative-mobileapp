// components/Footer.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/types"; // or define locally

type TabItem = {
  label: keyof RootStackParamList;
  icon: "home" | "tv" | "radio" | "people" | "search";
};

const tabs: TabItem[] = [
  { label: "Home", icon: "home" },
  { label: "Shows", icon: "tv" },
  { label: "Live", icon: "radio" },
  { label: "Teachers", icon: "people" },
  { label: "Search", icon: "search" },
];

type FooterProps = {
  activeTab?: keyof RootStackParamList;
};

const Footer: React.FC<FooterProps> = ({ activeTab }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  // Use activeTab override or fall back to route.name
  const current = activeTab ?? route.name;

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = current === tab.label;
        return (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.label)}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={isActive ? "#fff" : "#888"}
            />
            <Text style={[styles.label, { color: isActive ? "#fff" : "#888" }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#000",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#222",
  },
  tab: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default Footer;
