/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false
  },
  rules: {
    test: /\.s[ac]ss$/i,
    loader: "css-loader", 
    options: { sourceMap: true}
  }
}

module.exports = nextConfig