const nextConfig = {
   output: "standalone",
   reactStrictMode: false,
   poweredByHeader: false,
   trailingSlash: false,
   compress: true,
   typescript: {
      ignoreBuildErrors: true,
   },
   eslint: {
      ignoreDuringBuilds: true,
   },
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "res.cloudinary.com",
            pathname: "/**",
         },
         {
            protocol: "http",
            hostname: "localhost",
            pathname: "/**",
         },
      ],
   },
};

module.exports = nextConfig;
