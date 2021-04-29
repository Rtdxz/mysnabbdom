import vnode from './vnode'

//编写低配版本的h函数，该函数需要接收3个参数，缺一不可
//相当于重载功能较弱
//调用时需要是下面的三种形态之一
// h('div', {}, '文字') 第三个参数为文本
// h('div', {}, [])  有多个子节点，为数组
// h('div', {}, h())  只有一个子节点vnode
export default function (sel, data, c) {
  //检查参数个数
  if (arguments.length != 3)
    throw new Error('需要传入三个参数')

  //检查c的参数类型
  //如果c是文本或者数字说明是形态一，子节点为文本，这时候直接返回vnode并传入参数即可
  if (typeof c == 'string' || typeof c == 'number') {
    return vnode(sel, data, undefined, c, undefined);
  }
  //类型2，子节点为数组
  else if (Array.isArray(c)) {
    //作为返回的children
    let children = []
    //首先需要遍历数组，判断里面的每个元素是否都是vnode对象
    for (let i = 0; i < c.length; i++) {
      //检查是否是vnode对象
      if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel'))) {
        throw new Error('传入的数组有项不是vnode')
      }
      //这里对每子元素进行收集，用于作为返回vnode对象中的chilren的结果
      children.push(c[i])
    }
    //循环结束表明收集结束,进行返回
    return vnode(sel, data, children, undefined, undefined);
  }
  //类型3，子节点为对象,其中要有sel属性，即判断为vnode对象
  else if (typeof c == 'object' && c.hasOwnProperty('sel')) {
    //传入的c是children唯一的元素，直接返回即可
    let children = [c]
    return vnode(sel, data, children, undefined, undefined);
  }
  else {
    throw new Error('传入类型错误')
  }
}