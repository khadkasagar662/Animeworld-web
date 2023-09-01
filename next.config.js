// module.exports = {
//     // Prefer loading of ES Modules over CommonJS
//     experimental: { esmExternals: "loose" },
//     images: {
//         remotePatterns: [
//             {
//                 protocol: "http",
//                 hostname: "**.myanimelist.net",
//             },
//         ],
//     },
// };
module.exports = {
    // Prefer loading of ES Modules over CommonJS
    experimental: { esmExternals: "loose" },
    images: {
      domains: ["cdn.myanimelist.net"],
    },
  };
  