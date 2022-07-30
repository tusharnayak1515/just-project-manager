/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false
  },
  rules: [
    {
      test: /\.s[ac]ss$/i,
      loader: "css-loader", 
      options: { sourceMap: true}
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      loader: 'file-loader',
      options: { outputPath: 'assets/images', publicPath: '../images', useRelativePaths: true }
    }
  ]
}

module.exports = nextConfig