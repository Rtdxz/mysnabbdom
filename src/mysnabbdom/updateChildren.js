import createElement from './createElement';
import patchVnode from './patchVnode'

function checkSameVnode(a, b) {
  return a.sel == b.sel && a.key == b.key
}


export default function updateChildren(parentElm, oldch, newch) {
  console.log('都有children')
  //旧前下标
  let oldStartIdx = 0;
  //新前下标
  let newStartIdx = 0;
  //旧后下标
  let oldEndIdx = oldch.length - 1;
  //新后下标
  let newEndIdx = newch.length - 1;
  //旧前节点
  let oldStartVnode = oldch[0];
  //新前节点
  let newStartVnode = newch[0];
  //旧后节点
  let oldEndVnode = oldch[oldch.length - 1];
  //新后节点
  let newEndVnode = newch[newch.length - 1];
  //存储一个keyMap，对应老节点上的映射
  let keyMap = null;

  while ((newStartIdx <= newEndIdx) && (oldStartIdx <= oldEndIdx)) {
    //新前旧前
    if (oldStartVnode === null || oldch[oldStartIdx] === undefined) {
      oldStartVnode = oldch[++oldStartIdx];
    } else if (oldEndVnode === null || oldch[oldEndIdx] === undefined) {
      oldEndVnode = oldch[--oldEndIdx];
    } else if (newStartVnode === null || newch[newStartIdx] === undefined) {
      newStartVnode = newch[++newStartIdx];
    } else if (newEndVnode === null || newch[newEndIdx] === undefined) {
      newEndVnode = newch[--newEndIdx];
    }
    else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      console.log('新前旧前')
      patchVnode(oldStartVnode, newStartVnode);
      newStartVnode = newch[++newStartIdx];
      oldStartVnode = oldch[++oldStartIdx];
    }
    //新后旧后
    else if (checkSameVnode(oldEndVnode, newEndVnode)) {

      console.log('新后旧后')
      patchVnode(oldEndVnode, newEndVnode);
      newEndVnode = newch[--newEndIdx];
      oldEndVnode = oldch[--oldEndIdx];
    }
    //新后旧前
    else if (checkSameVnode(newEndVnode, oldStartVnode)) {
      console.log('新后旧前')

      //需要移动节点,旧前节点移到旧后之后
      patchVnode(oldStartVnode, newEndVnode);
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      newEndVnode = newch[--newEndIdx];
      oldStartVnode = oldch[++oldStartIdx];
    }
    //新前旧后
    else if (checkSameVnode(newStartVnode, oldEndVnode)) {
      console.log('新前旧后')
      patchVnode(oldEndVnode, newStartVnode);
      //需要移动节点,旧后节点移到旧前之前
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      newStartVnode = newch[++newStartIdx];
      oldEndVnode = oldch[--oldEndIdx];
    }
    //都没匹配到就要循环遍历旧节点数组找到新前节点是否存在

    else {
      if (!keyMap) {
        keyMap = {};
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldch[i].key;
          if (key !== undefined) {
            keyMap[key] = i;
          }
        }
      }

      console.log(keyMap)
      //寻找当前新前对应节点是否在keyMap中存在
      const idxInOld = keyMap[newStartVnode.key];
      //不存在的话说明当前的新前是新节点，直接添加到旧前节点的前面
      if (idxInOld == undefined) {
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      }
      //存在的话将旧数组原有值变为undefined,并把新节点添加到旧前节点的前面
      else {
        const elemToMove = oldch[idxInOld];
        patchVnode(elemToMove, newStartVnode); oldch[idxInOld] = undefined;
        parentElm.insertBefore(elemToMove.elm, oldStartVnode.elm);
      }
      newStartVnode = newch[++newStartIdx];
    }
  }
  //新数组有剩余，要添加会旧数组中
  if (newStartIdx <= newEndIdx) {
    //由于用了以上算法,导致不管是在前面多出，最后多出还是中间多出，排列之后只需将新增的添加到oldStartIdx的位置前即可
    //insertBefore如果的第二个参数为null，会直接添加到末尾，类似appendChild
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      //默认的插入位置是在旧前之前，但是若是在末尾，旧前对应位置为空，要加一个判断不然报错
      const before = oldch[oldStartIdx] == null ? null : oldch[oldStartIdx].elm;
      //这里要添加真实dom，需要createElement,不然没有elm属性
      parentElm.insertBefore(createElement(newch[i]), before)
    }
  }
  //旧数组有剩余,要删除多出节点
  else if (oldStartIdx <= oldEndIdx) {
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      //要加这个判断，因为前面有可能吧oldch置为undefine避免报错
      if (oldch[i]) {
        //移除真实dom即可
        parentElm.removeChild(oldch[i].elm)
      }

    }
  }

}