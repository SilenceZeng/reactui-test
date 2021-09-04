import React from 'react';
import type { ReactElement } from 'react';
import Aside from './aside';
import './layout.scss';
import { scopedClassMaker } from '../helper/classes';

const sc = scopedClassMaker('aui-layout');

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: ReactElement | ReactElement[];
}

const Layout: React.FC<Props> = (props) => {
  const { className, children, ...otherProps } = props;
  const childrenAsArray = children as ReactElement[];

  const hasAside =
    (childrenAsArray.length &&
      childrenAsArray.some((node) => node.type === Aside)) ||
    false;

  return (
    <div
      className={sc(
        { '': true, hasAside },
        {
          extra: className,
        }
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default Layout;

export { Layout };
export { default as Aside } from './aside';
export { default as Content } from './content';
export { default as Footer } from './footer';
export { default as Header } from './header';
