/**
 * Created by zhaoyan on 17/1/19.
 *
 *  @param  {Object, string}
 *  @param  {String}
 *  @return {Object, string}
 */
export default (target, namespace) => {
  if (Object(target) === target){ // target为对象
    for (const [key, value] of Object.entries(target)) {
      target[key] = `${namespace}_${value}`;
    }
  } else if (typeof target === 'string') {
    target = `${namespace}_${target}`;
  }

  return target;
}
