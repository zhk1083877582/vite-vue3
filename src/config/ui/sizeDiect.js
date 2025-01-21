
const map = new WeakMap()

let arg = '' //borderBoxSize contentBoxSize
const ob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    let handler = map.get(entry.target)
    const box = entry[arg][0]
    if (handler) {
      handler({
        width: box.inlineSize,
        height: box.blockSize
      })
    }
  }
})

function init(app) {
  app.directive('size-ob', {
    mounted(el, binding) {
      ob.observe(el)
      arg = binding.arg ||'contentBoxSize'
      map.set(el,binding.value)
    },
    unmounted(el) {
      ob.unobserve(el)
    }
  })
  
}

export default {
  init
}