window.dom = {
    create(string) {
      const container = document.createElement("template");
       //template中可以包含各种标签
      container.innerHTML = string.trim();
      //trim 去掉标签两边的空格影响，否则会识别成文本
      return container.content.firstChild;
    },
    after(node, node2) {
      node.parentNode.insertBefore(node2, node.nextSibling);
    },//调用父级的insertBefore使node2插入node后面
    before(node, node2){
      node.parentNode.insertBefore(node2, node);
    },
    append(parent, node){
      parent.appendChild(node)
    },
    wrap(node, parent){
      dom.before(node, parent)
      dom.append(parent, node)
    },//移到同级前面，再插入到里面
    remove(node){
      node.parentNode.removeChild(node)
      return node
    },
    empty(node){
      const array = []
      let x = node.firstChild
      //for循环这里获取的length会实时改变没法用
      //const childNodes = node.childNodes 等价于 const{childNodes} = node
      while(x){
        array.push(dom.remove(node.firstChild))
        x = node.firstChild
      }
      return array
    },
    attr(node, name, value){ // 重载(根据个数写代码)
      if(arguments.length === 3){
        node.setAttribute(name, value)
      }else if(arguments.length === 2){
        //没有value
        return node.getAttribute(name)
      }
    },
    text(node, string){ // 适配
      if(arguments.length ===2 ){
        if('innerText' in node){
          node.innerText = string 
        }else{
          node.textContent = string 
        }
      }else if(arguments.length === 1){
        if('innerText' in node){
          return node.innerText//ie
        }else{
          return node.textContent//chrome/firefox
        }
      }
    },
    html(node, string){
      if(arguments.length === 2){
        node.innerHTML = string
      }else if(arguments.length === 1){
        return node.innerHTML 
      }
    },
    style(node, name, value){
      if(arguments.length===3){
        // dom.style(div, 'color', 'red')
        node.style[name] = value
      }else if(arguments.length===2){
        if(typeof name === 'string'){
          // dom.style(div, 'color')
          return node.style[name]
        }else if(name instanceof Object){
          //instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
          // dom.style(div, {color: 'red'})
          const object = name
          for(let key in object){
            //遍历数组
            //key:border/color
            //node.style.border=...
            //node.style.color=...(key 是个变量不确定)
            node.style[key] = object[key]
          }
        }
      }
    },
    class: {
      add(node, className){
        node.classList.add(className)
      },
      remove(node, className){
        node.classList.remove(className)
      },
      has(node, className){
        return node.classList.contains(className)
        //可以用布尔检测是否有该属性
      }
    },
    on(node, eventName, fn){
      node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn){
      node.removeEventListener(eventName, fn)
    },
    //查
    find(selector, scope){
      return (scope || document).querySelectorAll(selector)//如果有scope 就在scope里面找，||或
    },
    parent(node){
      return node.parentNode
    },
    children(node){
      return node.children
    },
    siblings(node){
      return Array.from(node.parentNode.children)//伪数组转换成数组
      .filter(n=>n!==node)
    },
    next(node){
      let x = node.nextSibling
      while(x && x.nodeType === 3){
        x = x.nextSibling
        //一直找下一个节点
      }
      return x
    },
    previous(node){
      let x = node.previousSibling
      while(x && x.nodeType === 3){
        x = x.previousSibling
      }
      return x
    },
    //遍历所有节点
    each(nodeList, fn){
      for(let i=0;i<nodeList.length;i++){
        fn.call(null, nodeList[i])
      }
    },
    index(node){
      const list = dom.children(node.parentNode)
      let i
      for(i=0;i<list.length;i++){
        if(list[i] === node){
          break
        }
      }
      return i
    }
  };
