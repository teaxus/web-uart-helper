/**
 * 将一维数据分割成二维数组.
 *
 * @param {number} num 分割的列数.
 * @param {Array} arr 一维数组.
 */
export function arrTrans(num, arr) {
    const newArr = [];
    while (arr.length > 0) {
      newArr.push(arr.splice(0, num));
    }
    return newArr;
}
/**
 * 从开始到结束创建一个数组.
 *
 * @param {number} beginNumber 开始数字.
 * @param {number} endNumber 结束数字.
 * @param {number} fill 填充数据.
 */
export function makeArry(beginNumber, endNumber, fill) {
    let arr_return = [];
    for(let i=beginNumber;i<=endNumber;i++) {
        arr_return.push(fill == null ? i:fill)
    }
    return arr_return;
}
