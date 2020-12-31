export function arrTrans(num, arr) {
    const newArr = [];
    while (arr.length > 0) {
      newArr.push(arr.splice(0, num));
    }
    return newArr;
}
export function makeArry(beginNumber, endNumber, fill) {
    let arr_return = [];
    for(let i=beginNumber;i<=endNumber;i++) {
        arr_return.push(fill == null ? i:fill)
    }
    return arr_return;
}
