import { getOptions } from 'loader-utils'
import { loadAndResolveLessVars } from '@hon2a/less-vars-to-js'
import fromPairs from 'lodash/fromPairs'

// @note Ignores source and reads it on its own, as `loadAndResolveLessVars` doesn't accept already read file.
export async function lessVarsLoader() {
  const { lessOptions, transform } = getOptions(this) ?? {}
  const callback = this.async()

  const lessVars = await loadAndResolveLessVars(this.resourcePath, lessOptions)
  const processedVars = transform ? fromPairs(Object.entries(lessVars).map(transform)) : lessVars

  callback(null, `export default ${JSON.stringify(processedVars)}`)
}
