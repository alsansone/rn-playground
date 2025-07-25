import withAssetStatements from "./withAssetStatements";

export default {
  expo: {
    name: "rn-playground",
    slug: "rn-playground",
    scheme: "rnplayground",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.zepps.rnplayground",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [withAssetStatements],
    extra: {
      assetStatements: `[{
        "include": "https://chorsey-f2fca.web.app/.well-known/assetlinks.json"
      }]`,
    },
  },
};
