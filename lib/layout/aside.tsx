import React from 'react';
import { scopedClassMaker } from '../helper/classes';

const sc = scopedClassMaker('aui-layout');

interface Props extends React.HTMLAttributes<HTMLElement> {}

const Aside: React.FC<Props> = (props) => {
  const { className, ...otherProps } = props;
  return (
    <div className={sc('aside', { extra: className })} {...otherProps}>
      aside
    </div>
  );
};

export default Aside;
