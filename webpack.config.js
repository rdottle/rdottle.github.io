const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
var fs = require('fs');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('17I9IMsBv39Ygm-uQtylamYfIBj0I6GppfK-pVI94NiA');

let spreadsheetData = [];

// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, function (err) {

  // Get all of the rows from the spreadsheet.
  doc.getRows(1, function (err, rows) {
    for (var i = rows.length - 1; i >= 0; i--) {
      spreadsheetData.push({
        title: rows[i].title,
        date: rows[i].notdate,
        org: rows[i].org,
        type: rows[i].type,
        image: rows[i].image,
        url: rows[i].url,
        image2: rows[i].image_2,
        year: rows[i].year,
        id: rows[i].identifier
      })
    }
      
    fs.writeFile("./src/data/projects.json", JSON.stringify(spreadsheetData), function(err) {
          if (err) {
              console.log(err);
          }
    });

  });
});

module.exports = {
  entry : "./src/js/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
       {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.pug$/,
        include: path.join(__dirname, 'src'),
        loaders: [ 'pug-loader' ]
      },
        {
        test: /\.module\.s(a|c)ss$/,
        loader: [ 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              camelCase: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: "file-loader?name=/images/[name].[ext]"
    },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [ 'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
            }
          }
        ]
      }
  ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/html/index.pug",
      inject: true
    })
  ]
};

