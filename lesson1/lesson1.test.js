const {sum, times} = require('./lesson1')

test('同学，请问这个累加的结果是什么？',()=>{
  expect(sum(2+2+2+2+2+2)).toBe(12)
})

test('同学，请问这个乘法的结果是什么？',()=>{
  expect(times(2,6)).toBe(12)
})

test('那么，两个数值的结果是否相等呢？',()=>{
  expect(times(2,6)).toEqual(sum(2+2+2+2+2+2))
})