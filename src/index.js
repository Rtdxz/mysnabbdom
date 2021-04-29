import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch'

const vnode1 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
])
const vnode2 = h('ul', {}, [

  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'D' }, 'D'),
])
const container = document.querySelector('#container')
patch(container, vnode1)
// 点击按钮时，将vnode1变为vnode2
const btn = document.getElementById('btn')
btn.onclick = function () {
  patch(vnode1, vnode2)
}



// import {
//   init,
//   classModule,
//   propsModule,
//   styleModule,
//   eventListenersModule,
//   h,
// } from "snabbdom";


// //创建patch函数
// const patch = init([
//   // Init patch function with chosen modules
//   classModule, // makes it easy to toggle classes
//   propsModule, // for setting properties on DOM elements
//   styleModule, // handles styling on elements with support for animations
//   eventListenersModule, // attaches event listeners
// ]);

// const vnode1 = h('div', {}, [
//   h('p', { key: 'A' }, 'A'),
//   h('p', { key: 'B' }, 'B'),
//   h('p', { key: 'C' }, 'C'),
//   h('p', { key: 'D' }, 'D')
// ])
// const container = document.getElementById('container')
// patch(container, vnode1)

// //vnode2比vnode1多一个E节点
// const vnode2 = h('div', {}, h('section', {},
//   [h('li', { key: 'E' }, 'E'),
//   h('li', { key: 'A' }, 'A'),
//   h('li', { key: 'B' }, 'B'),
//   h('li', { key: 'C' }, 'C'),
//   h('li', { key: 'D' }, 'D')])

// )



