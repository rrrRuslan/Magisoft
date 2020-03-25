**setup webpack**
1. mkdir my_folder
2. cd my_folder 
3. npm init -y 
comment: this will init npm package. you will see a new file in your folder: package.json
4. npm install webpack webpack-cli --save-dev
commetn: this will install webpack package and webpack cli tools
5. create src folder and put some files into it and try to import some functions from one module to other
6. go to package.json and define script "build": "webpack". 
comment: this will create a shortcut. you can use it with command "npm run build"
now you can see that npm run build transpiles our modules to single bundle and puts it in directory /dist. next we should add entry point -- an html file 
7. npm i -D html-webpack-plugin html-loader
8. create webpack config and copypaste to it the following: 
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", 
            filename: "./index.html"
        })
    ]
}
9. create index.html in src folder 
10. try npm run build 
 comment: you will see index html file in your dist folder. that is is your build, try to run it
11. now  you can add webpack dev-server so you dont need to rebuild project after any changes 
npm i -D webpack-dev-server
12. add script "start:dev": "webpack-dev-server"
try npm run start:dev
this will run development server
check out localhost:8081 (port may be different, you can find port in console)

**set up jest**

1. npm i jest
2. add script "test": "jest"
3. copypaste tests
4. npm run test
comment: for support imports add this to package.json
"jest": {
    "moduleFileExtensions": [
      "js"
    ],
    "transform": {
      "^.+\\.js$": "babel-jest"
    }
 },
 than add babel config 

 5. enjoy