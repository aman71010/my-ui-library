import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from 'snabbdom'

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
])

export function createApp(container) {
  let state = { count: 0 }
  let mountedCallback = null
  let updateCallback = null
  let prevVNode = null

  function updateState(newState) {
    state = { ...state, ...newState }
    if (updateCallback) updateCallback(state)
    updateView()
  }

  function updateView() {
    const newVNode = view(state)
    if (prevVNode) {
      patch(prevVNode, newVNode)
    } else {
      patch(container, newVNode)
    }
    prevVNode = newVNode
  }

  function view(state) {
    return h('div', [
      h('h1', state.count),
      h('button', { on: { click: handleClick } }, 'Add'),
    ])
  }

  function handleClick() {
    updateState({ count: state.count + 1 })
  }

  function mount(callback) {
    mountedCallback = callback
    if (mountedCallback) mountedCallback()
    updateView()
  }

  function update(callback) {
    updateCallback = callback
  }

  return {
    mount,
    update,
  }
}
