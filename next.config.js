/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false
  },
  rules: {
    test: /\.(png|jpg|jpeg|webp|svg|gif)$/i,
    loader: 'css-loader',
    options: { url: false, sourceMap: true }
  }
}

module.exports = nextConfig
