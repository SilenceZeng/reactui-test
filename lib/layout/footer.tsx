import React from 'react';
import { scopedClassMaker } from '../helper/classes';

const sc = scopedClassMaker('aui-layout');

interface Props extends React.HTMLAttributes<HTMLElement> {}

const Footer: React.FC<Props> = (props) => {
  const { className, ...otherProps } = props;
  return (
    <div className={sc('footer', { extra: className })} {...otherProps}>
      {props.children}
    </div>
  );
};

export default Footer;
