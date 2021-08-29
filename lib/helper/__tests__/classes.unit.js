import classes, { scopedClassMaker } from '../classes';

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

describe('scopedClassMaker', () => {
  it('x', () => {
    const sc = scopedClassMaker('aui-layout');
    expect(sc('')).toEqual('aui-layout');
    expect(sc('x')).toEqual('aui-layout-x');
    expect(sc({ y: true, z: false })).toEqual('aui-layout-y');
    expect(sc({ y: true, z: true })).toEqual('aui-layout-y aui-layout-z');
    expect(sc({ y: true, z: true }, { extra: 'red' })).toEqual(
      'aui-layout-y aui-layout-z red'
    );
  });
});
