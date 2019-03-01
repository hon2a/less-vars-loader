import { getOptions } from 'loader-utils'
import { loadLessWithImports, resolveLessVariables } from '@hon2a/less-vars-to-js'
import fromPairs from 'lodash/fromPairs'

// @note Ignores source and reads it on its own, as `loadAndResolveLessVars` doesn't accept already read file.
export async function lessVarsLoader() {
  const { lessOptions, transform } = getOptions(this) ?? {}
  const callback = this.async()

  const { code, imports } = loadLessWithImports(this.resourcePath)
  imports.forEach(path => this.addDependency(path))

  const vars = await resolveLessVariables(code, lessOptions)
  const processedVars = transform ? fromPairs(Object.entries(vars).map(transform)) : vars

  callback(null, `export default ${JSON.stringify(processedVars)}`)
}
