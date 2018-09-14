const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}
//通过jest.fn()创建Mock Function
const mockCallback = jest.fn(x => 42 + x);
//将mockCallback代入forEach运行一次，即可记录下所有的值
forEach([0, 1], mockCallback);

test('记录mockCallback函数运行过程',()=>{
  // mockCallback上报函数运行了两次
  expect(mockCallback.mock.calls.length).toBe(2);

  // mockCallback上报函数第一次运行的输入为0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // mockCallback上报函数第二次运行的输入为1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

// The return value of the first call to the function was 42
  // mockCallback上报函数第一次运行的结果为42
  expect(mockCallback.mock.results[0].value).toBe(42);
})
