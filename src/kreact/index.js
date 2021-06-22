
window.requestIdleCallback(workLoop)
let nextUniOfWork = null

  
function workLoop(IdleDeadline) {
  while(nextUniOfWork && IdleDeadline.timeRemaining() > 1) {
    nextUniOfWork = performUnitOfwork(nextUniOfWork)
  }

  if (!nextUniOfWork && wipRoot) {
    commitRoot()
  }
}

function commitRoot() {
  commitWork(wipRoot.child)
  wipRoot = null
}

function commitWork(workInProgress) {
  // 提交自己

  if (!workInProgress) {
    return
  }

  let parentNodeFiber = workInProgress.return

  while(!parentNodeFiber.stateNode) {
    parentNodeFiber = parentNodeFiber.return
  }

  let parentNode = parentNodeFiber.stateNode

  if (workInProgress.stateNode) {
    parentNode.appendChild(workInProgress.stateNode)
  }

  // 提交子节点
  commitWork(workInProgress.child)
  // 提交兄弟节点
  commitWork(workInProgress.sibling)


}


// 创建element节点
function createNode(workInProgress) {
  const { type, props } = workInProgress;
  const node = document.createElement(type);

  updateNode(node, props)
  return node
}


//  原生标签节点
function updateHostComponent (workInProgress) {
  const { type, props } = workInProgress;
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = createNode(workInProgress);
  }
  
  reconcileChildren(workInProgress, workInProgress.props.children)
  console.log('workInProgress', workInProgress)
}



// 协调
function reconcileChildren (workInProgress, children) {
  if (typeof children === 'string' || typeof children === 'number') {
    return;
  }
  const newChildren = Array.isArray(children) ? children : [children]
  if (!children) return
  let previousNewFiber = null
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    let newFiber = {
      type: child.type,
      props: {...child.props},
      stateNode: null,
      child: null,
      sibling: null,
      return: workInProgress
    };

    if (typeof child === 'string') {
      newFiber.props = child;
    }

    if (i === 0) {
      // 第一个子Fiber
      workInProgress.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }

    // 记录上一个fiber
    previousNewFiber = newFiber
  }
}

// fiber js 对象 type，key，props，stateNode
// child 第一个子节点
// siblind 下一个兄弟节点
// return 父节点

function performUnitOfwork(workInProgress) {
  // 执行当前任务，todo
  const { type } = workInProgress;
  if (typeof type === 'string') {
    // 原生标签节点
    updateHostComponent(workInProgress)
  } else if (typeof type === 'function') {
    updateFunComponent(workInProgress)
  } else if (typeof type === 'undefined') {
    updateTextComponent(workInProgress)
  }

  // 返回下一个任务节点
  if (workInProgress.child) {
    return workInProgress.child
  }

  let nextFiber = workInProgress
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.return
  }
}

function updateNode(node, nextVal) {

  Object.keys(nextVal)
  // .filter((k) => k !== 'children' )
  .forEach((k) => {
    if (k === 'children') {
      if (typeof nextVal[k] === "string") {
        node.textContent = nextVal[k]
      }
    } else {
      node[k] = nextVal[k]
    }
  })
}

function updateTextComponent (workInProgress) {
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = document.createTextNode(workInProgress.props);
  }

  // const node = document.createTextNode(workInProgress);
  // return node;
}


let wipRoot = null
function render (vnode, container){
  wipRoot = {
    type: 'div',
    props: {
      children: {...vnode},
    },
    stateNode: container
  }
  nextUniOfWork = wipRoot;
}

export default {render}


//  原生标签节点
function updateFunComponent (workInProgress) {
  const { type, props } = workInProgress;

  const children = type(props)
  reconcileChildren(workInProgress, children)

}

//  原生标签节点
function updateClassComponent (vnode) {
  const { type, props } = vnode;
  const vvnode = new type(props);
  return createNode(vvnode.render())
}