import camelCase from 'lodash/camelCase'

import { compileWithLoader } from '../test/compileWithLoader'

describe('lessVarsLoader', () => {
  const exportObjectRegExp = /^export default ({.*})$/
  const expectCompiledVars = (compiled, expectedVars) => {
    expect(compiled).toMatch(exportObjectRegExp)
    expect(JSON.parse(compiled.replace(exportObjectRegExp, '$1'))).toEqual(expectedVars)
  }

  it('resolves and extracts less variables from a file and its dependencies', async () => {
    const compiled = await compileWithLoader('../test/index.less', './index.js')
    expectCompiledVars(compiled, {
      'sub-dependency-var-1': 'center',
      'sub-dependency-var-2': '#ff0000',
      'dependency-var-1': '2em',
      'dependency-var-2': 'rgba(255, 0, 0, 0.5)',
      'index-var': '42px'
    })
  })

  it('supports entry transformer', async () => {
    const compiled = await compileWithLoader('../test/index.less', './index.js', {
      transform: ([key, value]) => [camelCase(key), /^\d+px$/.test(value) ? parseInt(value, 10) : value]
    })
    expectCompiledVars(compiled, {
      subDependencyVar1: 'center',
      subDependencyVar2: '#ff0000',
      dependencyVar1: '2em',
      dependencyVar2: 'rgba(255, 0, 0, 0.5)',
      indexVar: 42
    })
  })
})
