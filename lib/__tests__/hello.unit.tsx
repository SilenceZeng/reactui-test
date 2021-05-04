function add(a: number, b: number) {
  return a + b
}

describe('my first test', () => {
  it('add(1, 2) equals 3', () => {
    expect(add(1, 2)).toEqual(3)
  })
})
