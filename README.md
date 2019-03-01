# @hon2a/less-vars-loader

`@hon2a/less-vars-loader` is a Webpack loader providing a seamless bridge from Less variable
sheets to JS files.

## Use

Use the loader to extract variables from Less variable sheets (including imports, transitively)
and bring them into a JS file as an object. Use inline loader syntax to set this up:

```javascript
import theme from '!@hon2a/less-vars-loader!./path/to/vars.less'
``` 

**Note:** Use a leading `!` to prevent use of other loaders.

If you're not using the file also in regular imports, you may also set up the loader
in `webpack.config.js` and take advantage of the `transform` option:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.vars\.less$/,
        use: '@hon2a/less-vars-loader',
        options: {
          transform: ([key, value]) => [camelCase(key), /^\d+px$/.test(value) ? parseInt(value, 10) : value],
          lessOptions: { javascriptEnabled: true }
        }
      }
    ]
  }
}
```

**Note:** This loader needs to go before other loaders matching the `test` if there are any
(e.g. when also using `less-loader` to load other `.less` files).  

## Development

### Install

Install dependencies using:

```sh
npm install
```

### Develop

After you modify sources, run the following (or set up your IDE to do it for you):

- format the code using `npm run format`
- lint it using `npm run lint`
- test it using `npm test`

and fix the errors, if there are any.

### Publish

Publishing is done in two steps:

1. Create a new version tag and push it to the repository:
    ```sh
    npm version <patch|minor|major>
    git push --follow-tags
    ```
1. Build and publish the new version as a npm package:
    ```sh
    npm publish --access public
    ``` 
