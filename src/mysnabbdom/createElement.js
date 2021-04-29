// //真正创建节点,将vnode创建为dom,插入到pivot之前
// export default function (vnode, pivot) {
//   //创建真正的节点
//   let domNode = document.createElement(vnode.sel)
//   //判断vnode是否是文本节点
//   if (vnode.text != '' && (vnode.children == undefined || vnode.children, length == 0)) {
//     //将虚拟dom文本添加到真实dom上
//     domNode.innerText = vnode.text;

//     //用insertBefore将真正Dom节点添加到标杆前
//     pivot.parentNode.insertBefore(domNode, pivot.elm)
//   }
//   else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
//     //内部是子节点时，递归创建节点
//   }

// };


// export default function createElement(vnode) {
//   //创建真正的节点
//   let domNode = document.createElement(vnode.sel)

//   //判断vnode是否是文本节点
//   if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
//     //将虚拟dom文本添加到真实dom上
//     domNode.innerText = vnode.text;
//     //补充elm属性
//   }
//   else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
//     //内部是子节点时，递归创建节点
//     for (let i = 0; i < vnode.children.length; i++) {

//       //取出每一个子元素虚拟节点
//       let ch = vnode.children[i]
//       // 创建DOM，一旦调用createElement意味着：创建出DOM了，并且它的elm属性指向了创建出的DOM，但是还没有上树，是一个孤儿节点
//       let chDOM = createElement(ch);
//       // 上树
//       domNode.appendChild(chDOM);
//     }
//   }
//   //将真正dom添加到虚拟dom的elm属性上，相当于上树
//   vnode.elm = domNode
//   //返回elm即一个真正的DOM
//   return vnode.elm

// };


export default function createElement(vnode) {
  let domNode = document.createElement(vnode.sel);

  if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
    domNode.innerText = vnode.text;
  } else if (vnode.children && vnode.children.length > 0) {
    vnode.children.forEach((ele) => {
      let chDOM = createElement(ele);
      domNode.appendChild(chDOM);
    })
  }
  vnode.elm = domNode;
  return vnode.elm;
}