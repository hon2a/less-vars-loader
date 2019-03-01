import { resolve, basename } from 'path'
import webpack from 'webpack'
import MemoryFilesystem from 'memory-fs'

export const compileWithLoader = async (entryPath, loaderPath, loaderOptions = {}) => {
  const context = resolve('./src')
  const config = {
    context,
    entry: entryPath,
    output: {
      path: context,
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: new RegExp(`${basename(entryPath)}$`),
          use: {
            loader: resolve(context, loaderPath),
            options: loaderOptions
          }
        }
      ]
    }
  }
  const compiler = webpack(config)

  compiler.outputFileSystem = new MemoryFilesystem()

  const stats = await new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) reject(err || `Unknown compilation error!\n${JSON.stringify(stats, null, 2)}`)

      resolve(stats)
    })
  })

  return stats.toJson().modules[0].source
}
