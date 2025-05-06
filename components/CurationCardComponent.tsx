import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import CardItem from "./CardItem";

interface CurationCardComponentProps {
  mediaitem: any;
  showTitle?: boolean;
  imageKey: string;
  tilesToShow: number;
  aspectRatio: number;
  secondaryImageKey?: string;
  cssProps?: any;
  onViewAll?: () => void;
  highlightActive?: boolean;
}

const CurationCardComponent = React.memo(
  ({
    mediaitem,
    showTitle,
    imageKey,
    tilesToShow,
    aspectRatio,
    secondaryImageKey,
    cssProps = {},
    onViewAll,
    highlightActive,
  }: CurationCardComponentProps) => {
    const screenWidth = Dimensions.get("window").width;

    const cardSpacing = cssProps.cardSpacing ?? 12;
    const cardWidth = cssProps.width
      ? cssProps.width
      : (screenWidth - cardSpacing * (tilesToShow + 1)) / tilesToShow;

    const cardHeight = cardWidth * aspectRatio;

    const items = mediaitem.entry || [];

    const flatListRef = useRef<FlatList>(null);
    const [currentPage, setCurrentPage] = useState(0);

    const effectiveCardWidth = cardWidth + cardSpacing;

    const onScroll = useCallback(
      (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const page = Math.round(offsetX / effectiveCardWidth);
        setCurrentPage(page);
      },
      [effectiveCardWidth]
    );

    // Auto-scroll (every 3 seconds)
    useEffect(() => {
      if (!highlightActive) return;

      const interval = setInterval(() => {
        setCurrentPage((prevPage) => {
          const nextPage = (prevPage + 1) % items.length;
          // console.log("Auto-scrolling to page:", nextPage);
          const offset = nextPage * effectiveCardWidth;
          flatListRef.current?.scrollToOffset({ offset, animated: true });
          return nextPage;
        });
      }, 3000);

      return () => clearInterval(interval);
    }, [effectiveCardWidth, items.length, highlightActive]);

    const renderItem = useCallback(
      ({ item, index }: { item: any; index: number }) => (
        <CardItem
          item={item}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          imageKey={imageKey}
          aspectRatio={aspectRatio}
          secondaryImageKey={secondaryImageKey}
          cssProps={cssProps}
          index={index}
          currentPage={currentPage}
          highlightActive={highlightActive}
        />
      ),
      [
        cardWidth,
        cardHeight,
        imageKey,
        secondaryImageKey,
        cssProps,
        currentPage,
        highlightActive,
      ]
    );

    return (
      <View style={styles.section}>
        <View style={styles.header}>
          {showTitle && <Text style={styles.title}>{mediaitem.title}</Text>}
          {onViewAll && (
            <TouchableOpacity onPress={onViewAll}>
              <Text style={styles.viewAll}>View all »</Text>
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          ref={flatListRef}
          data={items}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={renderItem}
          snapToInterval={effectiveCardWidth}
          decelerationRate="fast"
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: highlightActive
              ? (screenWidth - cardWidth) / 2
              : 0,
          }}
          ItemSeparatorComponent={() => <View style={{ width: cardSpacing }} />}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  viewAll: {
    fontSize: 14,
    color: "#aaa",
  },
});

export default CurationCardComponent;
