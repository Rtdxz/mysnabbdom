import updateChildren from './updateChildren'

export default function (oldVnode, newVnode) {



  //判断是否是同一个对象
  if (oldVnode === newVnode) return;
  //判断newVnode有没有text属性
  if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {


    //如果新虚拟节点和老虚拟节点的text不同，直接把新节点text写入老节点的elm即可，
    //如果老节点elm中的是chidren，也会被替换掉，因为innerText会直接替换文本
    if (newVnode.text != oldVnode.text) {
      oldVnode.elm.innerText = newVnode.text
    }
  }
  //newVnode没有text属性,即newVnode有children
  else {
    //新老都有children最复杂的情况
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {


      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)


    }
    //新节点有children,老节点无children
    else {
      //要先清空老的节点的text
      oldVnode.elm.innerText = '';
      //遍历newVnode的children创建真实节点，添加回老的节点的elm上
      for (let i = 0; i < newVnode.children.length; i++) {
        let dom = createElement(newVnode.children[i])
        oldVnode.elm.appendChild(dom)
      }

    }
  }

}