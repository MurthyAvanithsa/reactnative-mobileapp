import CardItem from "@/components/CardItem";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/types";
import { resolveImageSrc } from "@/utils/imageResolver";
import Footer from "../Footer";

const numColumns = 2;
// const screenWidth = Dimensions.get("window").width;
// const itemWidth = screenWidth / numColumns - 20; // Adjust for spacing
const AllTeachers = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stylesConfig, setStylesConfig] = useState<any>({}); // State to hold styles configuration
  const fetchShows = async () => {
    try {
      const response = await fetch(
        "https://tbn-dsp-curation-api-prod.tbncloud.com/web/virtual_feed?page_limit=100&page_offset=1&virtualfeed=false&playlistid=pZy1i4Yv&network=TBN&app_name=TBN"
      );
      const data = await response.json();
      if (Array.isArray(data.entry)) {
        setData(data.entry);
      } else {
        console.warn("Unexpected data format", data);
        setData([]);
      }
    } catch (error) {
      console.error("Failed to fetch All Teachers:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  const fetchstyles = async () => {
    try {
      const response = await fetch(
        "https://jsonblob.com/api/jsonBlob/1368246408527929344"
      );
      const result = await response.json();
      // console.log("Fetched data:", result);
      setStylesConfig(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchstyles();
    fetchShows();
  }, []);

  //   console.log("stylesConfig: ", stylesConfig);
  const renderItem = ({ item }: { item: any }) => {
    const imageUri = resolveImageSrc(
      item,
      stylesConfig.imageKey,
      stylesConfig.aspectRatio
    );

    return (
      <View
        style={[
          stylesConfig.card,
          { width: stylesConfig.allTeachersScreenCssProps.width }, // 👈 constrain card too
        ]}
      >
        <CardItem
          item={item}
          aspectRatio={stylesConfig.aspectRatio}
          cardWidth={stylesConfig.allTeachersScreenCssProps.width}
          cardHeight={
            stylesConfig.allTeachersScreenCssProps.width *
            stylesConfig.aspectRatio
          }
          imageKey={stylesConfig.imagekey}
          cssProps={stylesConfig.allTeachersScreenCssProps}
          highlightActive={false}
          onPress={
            () =>
              navigation.navigate("DetailScreen", {
                item,
                imageUri,
                source: "AllTeachers",
              }) // Navigate to ShowDetailsScreen with item data
          }
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={stylesConfig.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        contentContainerStyle={stylesConfig.list}
      />
      <Footer activeTab="Teachers" />
    </SafeAreaView>
  );
};

export default AllTeachers;
