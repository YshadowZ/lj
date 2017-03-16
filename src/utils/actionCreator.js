/**
 * Created by zhaoyan on 17/1/19.
 */
export default (type, ...argNames) => {
  return (...args) => {
    let action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    });
    return action;
  }
}
