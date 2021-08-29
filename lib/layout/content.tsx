import React from 'react';
import { scopedClassMaker } from '../helper/classes';

const sc = scopedClassMaker('aui-layout');

interface Props extends React.HTMLAttributes<HTMLElement> {}

const Content: React.FC<Props> = (props) => {
  const { className, ...otherProps } = props;
  return (
    <div className={sc('content', { extra: className })} {...otherProps}>
      {props.children}
    </div>
  );
};

export default Content;
