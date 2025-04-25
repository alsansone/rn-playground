const { withStringsXml, withAndroidManifest } = require("@expo/config-plugins");

module.exports = function withAssetStatements(config) {
  // Add string to strings.xml
  config = withStringsXml(config, (config) => {
    const assetStatementString = config.extra.assetStatements;
    const newItem = {
      $: {
        name: "asset_statements",
        translatable: "false",
      },
      _: assetStatementString,
    };

    config.modResults.resources.string = [
      ...(config.modResults.resources.string || []).filter(
        (item) => item.$.name !== "asset_statements"
      ),
      newItem,
    ];

    return config;
  });

  // Add <meta-data> to AndroidManifest.xml
  config = withAndroidManifest(config, (config) => {
    const application = config.modResults.manifest.application[0];

    application["meta-data"] = application["meta-data"] || [];

    const alreadyExists = application["meta-data"].some(
      (meta) => meta.$["android:name"] === "asset_statements"
    );

    if (!alreadyExists) {
      application["meta-data"].push({
        $: {
          "android:name": "asset_statements",
          "android:resource": "@string/asset_statements",
        },
      });
    }

    return config;
  });

  return config;
};
