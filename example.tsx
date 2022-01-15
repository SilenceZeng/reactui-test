import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import ButtonExample from './lib/button.example';
import LayoutExample from './lib/layout/layout.example';
import { Aside, Content, Footer, Header, Layout } from './lib/layout/layout';
import './example.scss';
import IconDemo from './lib/icon/icon.demo';
import DialogDemo from './lib/dialog/dialog.demo';
import FormExample from './lib/form/form.example';
import ScrollExample from './lib/scroll/scroll.example';
import TreeExample from './lib/tree/tree.example';
import CitySelectExample from './lib/citySelect/citySelect.example';

const logo = require('./logo.png');

ReactDOM.render(
  <Router>
    <Layout className="site-page">
      <Header className="site-header">
        <div className="logo">
          <img src={logo} width="48" height="48" alt="" />
          <span> AUI </span>
        </div>
      </Header>
      <Layout>
        <Aside className="site-aside">
          <h2>组件</h2>
          <ul>
            <li>
              <Link to="/icon">Icon</Link>
            </li>
            <li>
              <Link to="/button">Button</Link>
            </li>
            <li>
              <Link to="/dialog">对话框</Link>
            </li>
            <li>
              <Link to="/layout">布局</Link>
            </li>
            <li>
              <Link to="/form">表单</Link>
            </li>
            <li>
              <Link to="/scroll">Scroll</Link>
            </li>
            <li>
              <Link to="/tree">Tree</Link>
            </li>
            <li>
              <Link to="/citySelect">CitySelect</Link>
            </li>
          </ul>
        </Aside>
        <Content className="site-main">
          <Route path="/icon" component={IconDemo} />
          <Route path="/button" component={ButtonExample} />
          <Route path="/dialog" component={DialogDemo} />
          <Route path="/layout" component={LayoutExample} />
          <Route path="/form" component={FormExample} />
          <Route path="/scroll" component={ScrollExample} />
          <Route path="/tree" component={TreeExample} />
          <Route path="/citySelect" component={CitySelectExample} />
        </Content>
      </Layout>
      <Footer className="site-footer">&copy; angus</Footer>
    </Layout>
  </Router>,
  document.querySelector('#root')
);
