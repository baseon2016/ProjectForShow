module.exports = {
  // presets: ["@vue/app"],
  presets: [
    [
      "@vue/app",
      {
        modules: false,
        useBuiltIns: "entry",
        polyfills: ["es6.array.iterator", "es6.promise", "es6.object.assign", "es7.promise.finally"]
      }
    ]
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
};
