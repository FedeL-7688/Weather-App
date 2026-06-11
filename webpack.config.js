import {fileURLToPath} from "url"
import path from "node:path"
import HtmlWebpackPlugin from'html-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


export default {
  mode: 'development',
  entry: './src/script.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {

    static: path.resolve(__dirname,'./dist'),
    open: true,
    hot:true,
    port:3000,
    watchFiles: ['./src/**/*'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
  module: {
    rules: [
      //css
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      //images
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",

      },
      //fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      }
    ],
  },
};