import logo from './logo.svg'
import { Button } from 'antd'
import './App.css'
import styles from './index.module.less'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button type="primary">ant-design</Button>
        <p className={styles.main}>less</p>
      </header>
    </div>
  )
}

export default App
