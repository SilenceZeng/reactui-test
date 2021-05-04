import React from 'react';
import ReactDOM from 'react-dom';
import Icon from './icon/icon';

const onClick: React.MouseEventHandler = (e) => {
  console.log(e.target);
};

ReactDOM.render(
  <div>
    <Icon
      name="wechat"
      onClick={onClick}
      onMouseEnter={() => console.log('enter')}
      onMouseLeave={() => console.log('leave')}
    />
    <Icon name="alipay" />
    <Icon name="qq" />
  </div>,
  document.getElementById('root')
);
