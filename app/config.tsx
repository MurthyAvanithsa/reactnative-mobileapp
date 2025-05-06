import GetStyleByPreset from "@/components/GetStyleByPreset";
// presetConfig.ts
export const PRESET_RENDER_CONFIG: Record<
  string,
  {
    imageKey?: string;
    showTitle?: boolean;
    tilesToShow?: number;
    aspectRatio?: number;
    secondaryImageKey?: string;
    highlightActive?: boolean;
    onViewAll?: () => void;
    cssProps?: any;
  }
> = {
  FeaturedHomeRail: {
    showTitle: false,
    imageKey: "imgFlixMobileFeature6x9",
    tilesToShow: 1.2,
    aspectRatio: 1.2,
    cssProps: GetStyleByPreset("FeaturedHomeRail"),
    highlightActive: true,
  },
  LiveChannels: {
    showTitle: true,
    imageKey: "imgFlixMobileFeature6x9",
    tilesToShow: 2.5,
    aspectRatio: 0.6,
    cssProps: GetStyleByPreset("LiveChannels"),
  },
  InlineFeature: {
    showTitle: false,
    imageKey: "imgInlineFeatureMobile16x2",

    tilesToShow: 1,
    aspectRatio: 0.6,
    cssProps: GetStyleByPreset("InlineFeature"),
  },
  "16x9-NoTitle": {
    showTitle: true,
    imageKey: "imgFlixMobileFeature6x9",
    tilesToShow: 2,
    aspectRatio: 0.6,
    onViewAll: () => {},
    cssProps: GetStyleByPreset("16x9-NoTitle"),
  },
  "1x1TopTen": {
    showTitle: true,
    imageKey: "imgFlixMobileFeature6x9",
    tilesToShow: 1.7,
    aspectRatio: 1.2,
    secondaryImageKey: "imgTopTenNumber",
    cssProps: GetStyleByPreset("1x1TopTen"),
  },
  ContinueWatching: {
    imageKey: "imgFlixMobileFeature6x9",
    showTitle: true,
    tilesToShow: 2.5,
    aspectRatio: 0.6,
    highlightActive: true,
  },
  Favorites: {
    imageKey: "imgFlixMobileFeature6x9",
    showTitle: true,
    tilesToShow: 2.5,
    aspectRatio: 0.6,
  },
  Downloads: {
    showTitle: true,
    tilesToShow: 2.5,
    aspectRatio: 0.6,
  },
};
export default PRESET_RENDER_CONFIG;
