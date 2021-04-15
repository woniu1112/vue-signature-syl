import signature from './src/signature'

signature.install = function (Vue) {
  Vue.component(signature.name, signature)
}

export default signature