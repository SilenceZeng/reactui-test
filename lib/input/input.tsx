import React, { InputHTMLAttributes } from 'react';
import classes from '../helper/classes';
import './input.scss'

interface Props extends InputHTMLAttributes<HTMLInputElement> {

}

const Input: React.FC<Props> = (props) => {
  const {className, ...otherProps} = props
  return <input className={classes('aui-input', className)} {...otherProps} />;
};

export default Input;
