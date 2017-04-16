function common(
  state = {},
  action
) {
  switch(action.type) {
    case '123': return state
    default: return state
  }
}

export { common }
