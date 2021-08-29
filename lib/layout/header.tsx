import React from 'react';
import { scopedClassMaker } from '../helper/classes';

const sc = scopedClassMaker('aui-layout');

interface Props extends React.HTMLAttributes<HTMLElement> {}

const Header: React.FC<Props> = (props) => {
  const { className, ...otherProps } = props;
  return (
    <div className={sc('header', { extra: className })} {...otherProps}>
      header
    </div>
  );
};

export default Header;
