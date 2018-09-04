import { Script } from 'vm'
import Module = require('module')

// 通过webpack打包出的bundle字符串，利用vm.Script运行在当前上下文，获取打包的结果
// 借鉴 慕课网jocky老师的代码
export const getModuleFromString = (bundle: string, filename: string) => {
  const mod: {[_: string]: any} = {
    exports: {}
  }

  const wrapper = Module.wrap(bundle)
  const script = new Script(wrapper, {
    filename,
    displayErrors: true
  })
  const result = script.runInThisContext()
  result.call(mod.exports, mod.exports, require, mod)
  return mod
}

