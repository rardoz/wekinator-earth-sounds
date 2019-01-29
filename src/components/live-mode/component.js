import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map } from '../map'
import { TrainingForm } from '../training-form'
import styles from '../../styles.css'

export default class extends Component {
  state = {}
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    fetching: PropTypes.bool,
    defaultValues: PropTypes.shape({})
  }

  static defaultProps = {
    fetching: false,
    defaultValues: {}
  }

  render() {
    const { fetching, onSubmit, defaultValues } = this.props

    return (
      <div>
        <div className={styles.gutters}>
          <h2>Click on the map to receive weather</h2>
          <Map isMarkerShown={true} />
          <h3>Weather values</h3>
        </div>
        <TrainingForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          fetching={fetching}
        />
      </div>
    )
  }
}
