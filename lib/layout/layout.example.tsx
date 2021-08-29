import React from 'react';
import Layout from './layout';
import Header from './header';
import Content from './content';
import Footer from './footer';
import Aside from './aside';

const LayoutExample = () => {
  return (
    <div>
      <div>
        <h1>第一个例子</h1>
        <Layout style={{ height: 500 }} className="hi">
          <Header></Header>
          <Content></Content>
          <Footer></Footer>
        </Layout>
      </div>
      <div>
        <h1>第二个例子</h1>
        <Layout style={{ height: 500 }} className="hi">
          <Header></Header>
          <Layout>
            <Aside></Aside>
            <Content></Content>
          </Layout>
          <Footer></Footer>
        </Layout>
      </div>
      <div>
        <h1>第三个例子</h1>
        <Layout style={{ height: 500 }} className="hi">
          <Header></Header>
          <Layout>
            <Content></Content>
            <Aside></Aside>
          </Layout>
          <Footer></Footer>
        </Layout>
      </div>
      <div>
        <h1>第四个例子</h1>
        <Layout style={{ height: 500 }} className="hi">
          <Aside></Aside>
          <Layout>
            <Header></Header>
            <Content></Content>
            <Footer></Footer>
          </Layout>
        </Layout>
      </div>
    </div>
  );
};

export default LayoutExample;
