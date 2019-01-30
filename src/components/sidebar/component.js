import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

export default class extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  static defaultProps = {
    children: null
  }

  render() {
    const { children } = this.props
    return (
      <div className={styles.sidebar}>
        <div className={styles.sidebarContents}>{children}</div>
      </div>
    )
  }
}
