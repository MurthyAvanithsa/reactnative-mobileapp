import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import { useHpcData } from "@/hooks/useHpcData";
// import { PRESET_RENDER_CONFIG } from "../config";
import CurationCardComponent from "@/components/CurationCardComponent";
import Footer from "../Footer";
// import GetStyleByPreset from "@/components/GetStyleByPreset";

const INITIAL_RENDER_COUNT = 4;
const BATCH_SIZE = 4;

const HomeScreen = () => {
  const { data: hpcData, loading } = useHpcData();
  const [visibleCount, setVisibleCount] = useState(INITIAL_RENDER_COUNT);
  const [presetConfig, setPresetConfig] = useState<Record<any, any>>({});
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonblob.com/api/jsonBlob/1365011766186270720"
      );
      const result = await response.json();
      // console.log("Fetched data:", result);
      setPresetConfig(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const sortedData = hpcData
    .filter((item) => item.data?.entry?.length > 0)
    .sort((a, b) => a.index - b.index);

  const visibleRails = sortedData.slice(0, visibleCount);
  // console.log("visibleRails: ", visibleRails);
  const handleEndReached = () => {
    if (visibleCount < sortedData.length) {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, sortedData.length));
    }
  };
  // console.log("presetName: ", presetConfig);
  // const renderItem = useCallback(
  //   ({ item }: { item: any }) => {
  //     // const config = GetStyleByPreset(item.preset_name) || {};
  //     const presetName = item.preset_name;
  //     const config = presetConfig[presetName];

  //     return (
  //       <CurationCardComponent
  //         mediaitem={item.data}
  //         showTitle={config.showTitle}
  //         imageKey={config.imageKey}
  //         tilesToShow={config.tilesToShow}
  //         aspectRatio={config.aspectRatio}
  //         secondaryImageKey={config.secondaryImageKey}
  //         cssProps={config.cssProps}
  //         onViewAll={config.onViewAll}
  //         highlightActive={config.highlightActive}
  //       />
  //     );
  //   },
  //   [presetConfig]
  // );
  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      // console.log("item: ", item.data);
      const presetName = item.preset_name;
      const config = presetConfig[presetName] ?? {};

      const mainImage = config.images?.[0] ?? {}; // Main card image
      const secondaryImage = config.images?.[1] ?? {}; // Optional secondary overlay image
      // console.log("mainImage cssprops: ", mainImage.cssProps);
      return (
        <CurationCardComponent
          mediaitem={item.data}
          showTitle={config.showTitle ?? true}
          imageKey={mainImage.imageKey ?? "imgFlixMobileFeature6x9"}
          tilesToShow={config.tilesToShow ?? 2}
          aspectRatio={config.aspectRatio ?? 1.78}
          secondaryImageKey={secondaryImage.secondaryImageKey} // Pick secondary image key if available
          cssProps={{
            ...mainImage.cssProps,
            cardSpacing: mainImage.cssProps?.cardSpacing ?? 8,
            height: mainImage.cssProps?.height,
            borderRadius: mainImage.cssProps?.borderRadius,
            marginLeft: mainImage.cssProps?.marginLeft,
            marginRight: mainImage.cssProps?.marginRight,
            cardImage: mainImage.cssProps?.cardImage,
            secondaryImage: secondaryImage.cssProps?.secondaryImage, // Secondary image css
            borderColor: mainImage.cssProps?.bordercolor, // ✅ like for LiveChannels
            borderWidth: mainImage.cssProps?.borderwidth, // ✅ like for LiveChannels
          }}
          onViewAll={config.onViewAll}
          highlightActive={config.highlightActive}
        />
      );
    },
    [presetConfig]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ marginTop: 40 }}
          />
        ) : (
          <FlatList
            data={visibleRails}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.index}-${item.preset_name}`}
            onEndReached={handleEndReached}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            windowSize={5}
            removeClippedSubviews={true}
            contentContainerStyle={{
              paddingBottom: 40,
              paddingHorizontal: 10,
            }}
            style={{ flex: 1, marginLeft: 5 }}
          />
        )}
      </View>
      <Footer />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // dark background
  },
  content: {
    flex: 1, // ensures footer doesn't get pushed around
  },
});

export default HomeScreen;
