/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false
  },
  rules: {
    test: /\.(png|jpg|jpeg|webp|svg|gif)$/i,
    use: {
      loader: 'css-loader',
      options: {
          limit: 50000

      }
    }
  }
}

module.exports = nextConfig
