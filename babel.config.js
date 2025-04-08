module.exports = {
  presets: ['module:@react-native/babel-preset'],
  "plugins": [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "@myapp": "./src",
      }
    }],
    'react-native-reanimated/plugin',
    'react-native-paper/babel'
  ]
};
