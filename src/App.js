import * as React from 'react';
import * as ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { useEffect } from './react/react/src/ReactHooks';
import Test1 from './component/Test'

function App() {
  const [count, setCount] = React.useState(0)
  useEffect(() => {
    console.log(
      <p>
        {count}
      </p>
      )
  }, [])

  function goTest () {
    debugger
    setCount((count) => ++count)
  }

  return (
    <div className="App">
      <ComponentTest />
      <p onClick={goTest}>
          {count}23
        </p>
      {count > 1 ? 
        <Test1 />
        :
        2
      }
    </div>
  );
}


class ComponentTest extends React.Component{
  componentDidMount(){
      console.log(this)
  }
  handerClick= (value) => console.log(value) 
  handerChange=(value) => console.log(value)
  render(){
      return <div style={{ marginTop:'50px' }} >
          <button onClick={ this.handerClick } > 按钮点击 </button>
          <input  placeholder="请输入内容" onChange={ this.handerChange }  />
      </div>
  }
}

export default App;
