module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_URL.replace(/^https?:\/\//, '')],
  },
};
