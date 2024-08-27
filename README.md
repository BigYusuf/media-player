# Audio Player library

Audio Player library is a media player library or widget design to work on any website. Just plug and play, although the main focus is for it to work on readymag. But still it will work on any web plateform ot there. It uses howlerjs under the hood to control player functionalities.

## Features

* Webpack 5 based.
* ES6 or TypeScript as a source.
* Exports in a [umd](https://github.com/umdjs/umd) format so your library works everywhere.
* Test setup with [Jest](https://jestjs.io/).

## Process

```
ES6/TypeScript source files
       |
       |
    webpack
       |
       +--- babel
       |
  ready to use
     library
  in umd format
```

*Have in mind that you have to build your library before publishing. The files under the `lib` folder are the ones that should be distributed.*

## Getting started

1. Import cdn
  * Open `webpack.config.js` file and change the value of `libraryName` variable.
    ```html
      <script src="https://cdn.jsdelivr.net/gh/BigYusuf/media-player@master/build/media-player.js"></script>
    ```
  * Open `package.json` file and change the value of `main` property so it matches the name of your library.
2. write a basic html and write a div
  * Make sure to give it a unique id, which isn't shared by any other components as seen in the example below 

  ```html
    <div id="test"></div>
  ```

3. Create a script with either simple or advance theme
  * A simple script, which has just a single button and very few functionalities can be adjusted
  
  ```html
    <script crossorigin="" referrerpolicy="">
        AudioPlayer.MediaPlayer({
          url: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
          htmlId: "test3",
          theme: "simple",
          playerHeight: 100,//optional
          playerHeight: 100,//optional
          playerEdges: "flat",//optional
        })
    </script>
  ```
  * and advance theme boast a complex array of functionalities where a user can decide to move any object as the please or even remove them

  ```html
    <script crossorigin="" referrerpolicy="">
        AudioPlayer.MediaPlayer({
          url: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
          htmlId: "test3",
          theme: "simple",
          playerHeight: 100,//optional
          playerHeight: 100,//optional
          playerEdges: "flat",//optional
        })
    </script>
  ```

4. Complete widget integration, here is an example in the example page 
  * Run `yarn test`

## Scripts

* `yarn build` - produces production version of your library under the `lib` folder
* `yarn build-amd` - produces an AMD version that works with RequireJS
* `yarn dev` - produces development version of your library and runs a watcher
* `yarn dev-amd` - produces an AMD development version of your library and runs a watcher
* `yarn test`  - well ... it runs the tests :)
* `yarn test-watch` - same as above but in a watch mode

## Readings

* [Start your own JavaScript library using webpack and ES6](http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6)

## Misc

### An example of using dependencies that shouldn’t be resolved by webpack, but should become dependencies of the resulting bundle

In the following example we are excluding React and Lodash:

```js
{
  devtool: 'source-map',
  output: {
    path: '...',
    libraryTarget: 'umd',
    library: '...'
  },
  entry: '...',
  ...
  externals: {
    react: 'react'
    // Use more complicated mapping for lodash.
    // We need to access it differently depending
    // on the environment.
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: '_',
      root: '_'
    }
  }
}
```
