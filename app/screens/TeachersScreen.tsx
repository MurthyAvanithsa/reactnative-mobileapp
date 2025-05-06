import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Footer from "../Footer";
import { LinearGradient } from "expo-linear-gradient";
import CardItem from "@/components/CardItem";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/types";
import { resolveImageSrc } from "@/utils/imageResolver";

const TeachersScreen = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stylesConfig, setStylesConfig] = useState<any>({}); // State to hold styles configuration
  const [title, setTitle] = useState();
  const categories = [{ label: "All Teachers", screen: "AllTeachers" }];
  // Category for the screen, can be used for filtering or display
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleCategoryPress = (category: any) => {
    navigation.navigate(category.screen);
  };

  const numColumns = 2; // Number of columns for grid layout
  const fetchTeachers = async () => {
    try {
      const response = await fetch(
        "https://tbn-dsp-curation-api-prod.tbncloud.com/web/virtual_feed?page_limit=100&page_offset=1&virtualfeed=true&playlistid=d9c9b144&network=TBN&app_name=TBN"
      );
      const data = await response.json();
      if (Array.isArray(data.entry)) {
        setEntries(data.entry);
        setTitle(data.title);
      } else {
        console.warn("Unexpected data format", data);
        setEntries([]);
      }
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };
  const fetchstyles = async () => {
    try {
      const response = await fetch(
        "https://jsonblob.com/api/jsonBlob/1368237253574451200"
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
    fetchTeachers();
  }, []);
  // console.log("stylesConfig: ", stylesConfig.teachersScreenCssProps);
  const renderItem = ({ item }: { item: any }) => {
    const handlePress = () => {
      console.log("Card clicked:", item.id || item.title);
      // You can navigate or do anything else here
    };
    const imageUri = resolveImageSrc(
      item,
      stylesConfig.imageKey,
      stylesConfig.aspectRatio
    );

    return (
      <TouchableOpacity
        style={[
          stylesConfig.card,
          { width: stylesConfig.teachersScreenCssProps.width },
        ]}
        onPress={handlePress} // 👈 capture click
      >
        <CardItem
          item={item}
          aspectRatio={stylesConfig.aspectRatio}
          cardWidth={stylesConfig.teachersScreenCssProps.width}
          cardHeight={
            stylesConfig.teachersScreenCssProps.width * stylesConfig.aspectRatio
          } // Adjust height based on aspect ratio
          imageKey={stylesConfig.imageKey}
          cssProps={stylesConfig.teachersScreenCssProps}
          onPress={
            () =>
              navigation.navigate("DetailScreen", {
                item,
                imageUri,
                source: "Teachers",
              }) // Navigate to ShowDetailsScreen with item data
          }
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={stylesConfig.container}>
      <View style={stylesConfig.content}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={stylesConfig.loadingStyle}
          />
        ) : (
          <FlatList
            data={entries}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            columnWrapperStyle={{
              justifyContent: "space-between",
              paddingHorizontal: 15,
            }}
            contentContainerStyle={{ paddingBottom: 80 }}
            renderItem={renderItem}
            ListHeaderComponent={
              <>
                {/* Poster Section */}
                <View style={stylesConfig.posterContainer}>
                  <Image
                    source={{
                      uri: "https://assets.mediabackstage.com/tbn/thumbnails/klove_mobile_headerimage-1745530819714.jpg",
                    }}
                    style={stylesConfig.posterImage}
                  />
                  <LinearGradient
                    colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.9)"]}
                    style={stylesConfig.gradientOverlay}
                  >
                    <Text style={stylesConfig.posterTitle}>teachers</Text>
                  </LinearGradient>
                </View>

                {/* Horizontal Chips */}
                <View style={stylesConfig.categoryWrapper}>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category.label}
                      onPress={() => handleCategoryPress(category)}
                      style={stylesConfig.chip}
                    >
                      <Text style={stylesConfig.chipText}>
                        {category.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 20,
                      fontWeight: "bold",
                      marginLeft: 20,
                      marginTop: 20,
                      marginBottom: 0,
                    }}
                  >
                    {title}
                  </Text>
                </View>
              </>
            }
          />
        )}
      </View>
      <Footer activeTab="Teachers" />
    </SafeAreaView>
  );
};

export default TeachersScreen;
