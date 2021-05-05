import classes from '../classes';

describe('classes', () => {
  it('accept a classname', () => {
    const result = classes('a');
    expect(result).toEqual('a');
  });
  it('accept two classname', () => {
    const result = classes('a', 'b');
    expect(result).toEqual('a b');
  });
  it('accept undefined but not be showed', () => {
    const result = classes('a', undefined);
    expect(result).toEqual('a');
  });
  it('accept specail', () => {
    const result = classes('a', undefined, '中文', false, null, 1);
    expect(result).toEqual('a 中文 1');
  });
  it('accept zero param', () => {
    const result = classes();
    expect(result).toEqual('');
  });
});
