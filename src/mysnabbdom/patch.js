import vnode from './vnode'
import createElement from './createElement'
import patchVnode from './patchVnode'
// export default function (oldVnode, newVnode) {
//   //判断第一个传入参数，是DOM节点还是虚拟节点
//   if (oldVnode.sel == '' || oldVnode.sel == undefined) {
//     oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
//     console.log(oldVnode)
//   }

//   //判断oldVnode和newVnode是不是同一个节点
//   //通过辨别两个节点的标签名相同且key相同即为同一节点
//   if (oldVnode.sel == newVnode.sel && oldVnode.key == newVnode.key) {
//     console.log('是同一个节点')
//   } else {
//     console.log('不是同一个节点')
//     //createElement()将一个虚拟dom节点转换生成真实DOM节点
//     let newVnodeElm = createElement(newVnode);
//     //当老节点存在父节点以及新节点不为空时
//     if (oldVnode.elm.parentNode && newVnodeElm) {
//       //通过老节点的父节点insertBefore方法将真实的DOM节点添加到老节点的前面
//       oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
//     }
//     //最后再删除老节点
//     oldVnode.elm.parentNode.removeChild(oldVnode.elm)
//   }
// }


export default function (oldVnode, newVnode) {
  if (oldVnode.sel == undefined) {
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
  }
  if (oldVnode.sel == newVnode.sel && oldVnode.key == newVnode.key) {
    console.log('同一个节点')
    patchVnode(oldVnode, newVnode);
  }
  else {
    let newVnodeElm = createElement(newVnode);
    if (newVnodeElm && oldVnode.elm.parentNode) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
  }

}