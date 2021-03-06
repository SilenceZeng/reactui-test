import React from 'react';
import './importIcons';
import './icon.scss'
import classes from '../helper/classes';

interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string;
}

const Icon: React.FC<IconProps> = ({ name, className, ...restProps }) => {
  return (
      <svg className={classes('aui-icon', className)} {...restProps}>
        <use xlinkHref={`#${name}`}></use>
      </svg>
  );
};

export default Icon;
