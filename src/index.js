import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
// import ReactDOM from './kreact';
// import Component from './kreact/Component';

import './index.css';

const jsx = (
  <div className="App">
    <div>
      <h1>
        <p>
          sdf1
        </p>
      </h1>

      <h2>
        这里是h2标题
      </h2>
      <p>
        sdf2
      </p>
      dsfds

      dsfs
      dsfs
      dsfs
    </div>
    <p>
      <a href='sdfsf'>
        但是大多数
      </a>
    </p>
    <FunComponent name='李虎' />
    {/* <TestClassComponent name="李虎" /> */}
  </div>
);

function FunComponent(props) {
  return (
    <div>
      <p className="sdfsf">
        FunComponent{props.name}
      </p>
    </div>
  )
}

class TestClassComponent extends Component {
  render () {
    return (
      <div>
        <a href='www'>
          类组件
          {this.props.name}
        </a>
      </div>
    )
  }
}

console.log(jsx)

ReactDOM.render(
  jsx,
  document.getElementById('root')
);

