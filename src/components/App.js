import React, { Component } from 'react';
import Layout from './Layout'
import '../styles/App.css';
import "antd/dist/antd.css";

class App extends Component {
    render() {
        return (
            <>
              <div>
                  <h1>My React App!</h1>
              </div>
              <Layout></Layout>
            </>
        );
    }
}

export default App;
