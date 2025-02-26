import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import Header from './components/Header';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Layout>
        <Header />
        <Content style={{ height: '90vh'}}>
          <App />
        </Content>
        <Footer style={{ height: '5vh'}}>
          Footer
        </Footer>
    </Layout>
  </React.StrictMode>
);

reportWebVitals();
