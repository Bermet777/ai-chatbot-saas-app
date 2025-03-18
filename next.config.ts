// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
 
// };

// export default nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ["via.placeholder.com"],
//   },
//   // ...other config options here
// };

// export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "via.placeholder.com",
//         pathname: "/**",
//       },
//     ],
//   },
//   // other config options...
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['ucarecdn.com'], // Add the UploadCare CDN domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
 
};

export default nextConfig;
