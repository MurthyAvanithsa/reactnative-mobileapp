// imageConfig.ts

type AspectRatio = `${number}:${number}` | number;

// imageConfig.ts

const aspectRatioMap: Record<number, string> = {
  0.6: "480",
  0.5: "480",
  0.8: "480",
  1.2: "imgFlixMobileFeature6x9", // 5:4 or 4:3 portrait
  1.5: "imgFlixMobileFeature6x9", // 3:2 or 16:4 banner
  1.6: "imgFeaturedCarousel16x8", // 8:5 or 16:10
  1.75: "imgFlixMobileFeature6x9", // 7:4 or close to 16:9
  1.78: "imgFeaturedWebBanner16x9", // 16:9 standard
  2.0: "imgFeaturedWide", // optional wide
};

export const getImageKeyByAspectRatio = (
  aspectRatio: number,
  threshold = 0.05 // max delta allowed for a "close match"
): string | undefined => {
  let closestMatch: { ratio: number; key: string } | null = null;

  for (const [ratioStr, key] of Object.entries(aspectRatioMap)) {
    const ratio = parseFloat(ratioStr);
    const delta = Math.abs(aspectRatio - ratio);

    if (
      delta <= threshold &&
      (!closestMatch || delta < Math.abs(aspectRatio - closestMatch.ratio))
    ) {
      closestMatch = { ratio, key };
    }
  }

  return closestMatch?.key;
};
