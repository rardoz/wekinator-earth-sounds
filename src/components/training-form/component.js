import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles.css'

export default class extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.onSubmit}>
        <div className={styles.flexCol}>
          <fieldset className={styles.fieldset}>
            <label>Temp ({temp})</label>
            <input
              type="range"
              name="temp"
              value={temp}
              onChange={this.onInputChange}
              min={-100}
              max={200}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <label>Temp ({temp})</label>
            <input
              type="range"
              name="temp"
              value={temp}
              onChange={this.onInputChange}
              min={-100}
              max={200}
            />
          </fieldset>
        </div>
        <div className={styles.flexCol}>
          <fieldset className={styles.fieldset}>
            <button type="submit">Apply</button>
          </fieldset>
          <fieldset className={styles.fieldset}>
            <button onClick={() => {}}>Random</button>
          </fieldset>
        </div>
      </form>
    )
  }
}
