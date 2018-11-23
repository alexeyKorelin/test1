import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { initStore } from '../../stores'
import { Provider } from 'mobx-react'
import { MobxRouter, RouterStore, startRouter } from 'mobx-router'
import logo from 'assets/images/logo.svg'
import Raven from 'raven-js'
import routes from 'utils/routes';
import 'assets/styles/main.sass'
import styles from './index.module.sass'
import Sidebar from 'components/Modules/Sidebar'
import Main from 'components/Modules/Main'
import Footer from 'components/Modules/Footer'
import Language from 'components/Modules/Language'

class App extends Component {

  constructor (props) {
    super(props);
    this.store = initStore();
    startRouter(routes, this.store);
    const { env } = this.store
    if (env !== 'development') {
      Raven.config(gon.dsn).install()
    }
  }

  render () {
    const {children} = this.props;

    return (
      <Provider store={this.store}>
        <div className={styles.root}>
          <div className={styles.top}>
            <Sidebar className={styles.sidebar} />
            <div className={styles.main}>
              <MobxRouter />
            </div>
          </div>
          <Footer className={styles.footer} />
          <Language />
        </div>
      </Provider>
    )
  }
}

export default App
