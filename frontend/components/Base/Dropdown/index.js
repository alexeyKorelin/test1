import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.module.sass';
import Toggle from 'components/Base/Toggle';
import Icon from 'components/Base/Icon';

class Dropdown extends Component {
  _toggler = React.createRef()

  state = {
    opened: false
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const {className, children, color} = this.props;
    const {opened} = this.state;
    const empty = !children || (Array.isArray(children) && children.find(children => children !== null && children !== false) === undefined);

    return (
      <div 
        className={cx(
          styles.root, 
          className,
          {
            [styles.root_opened]: opened,
            [styles[`root_${color}`]]: color
          }
        )}
      >
        <button 
          ref={this._toggler}
          className={styles.toggler}
          disabled={empty}
          onClick={this.toggle}
        >
          <Icon className={styles.icon} i='settings' />
        </button>
        <If condition={!empty}>
          <Toggle>
            <If condition={opened}>
              <div className={styles.dropdown}>{children}</div>
            </If>
          </Toggle>
        </If>
      </div>
    )
  }

  toggle = () => this.setState({opened: !this.state.opened})

  handleClickOutside = (e) => {
    const { opened } = this.state;
    const toggler = this._toggler.current;

    (!this._toggler.current.contains(e.target) && opened) && this.setState({opened: false});
  }
}

Dropdown.displayName = 'components/Base/Dropdown';

export default Dropdown;
