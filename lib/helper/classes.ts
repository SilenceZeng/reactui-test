export default function classes(...names: (string | undefined)[]) {
  return names.filter(Boolean).join(' ');
}

interface Options {
  extra: string | undefined;
}

interface ClasssToggles {
  [K: string]: boolean;
}

const scopedClassMaker =
  (prefix: string) => (name?: string | ClasssToggles, options?: Options) =>
    Object.entries(name instanceof Object ? name : { [name ?? '']: true })
      .filter((kv) => kv[1] !== false)
      .map((kv) => kv[0])
      .map((n) => [prefix, n].filter(Boolean).join('-'))
      .concat((options && options.extra) || [])
      .join(' ');

export { scopedClassMaker };
