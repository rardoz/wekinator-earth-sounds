import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map } from '../map'
import { TrainingForm } from '../training-form'
import { Looper } from '../looper'
import styles from '../../styles.css'

export default class extends Component {
  state = {}
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    fetching: PropTypes.bool,
    defaultValues: PropTypes.shape({}),
    onLocationChange: PropTypes.func.isRequired,
    trainingMode: PropTypes.bool
  }

  static defaultProps = {
    fetching: false,
    defaultValues: {},
    trainingMode: false
  }

  render() {
    const {
      fetching,
      onSubmit,
      defaultValues,
      onLocationChange,
      trainingMode
    } = this.props

    return (
      <div>
        <div className={styles.gutters}>
          <h2>Click on the map to receive weather</h2>
          <Map onChange={onLocationChange} isMarkerShown={true} />
          <p>
            <strong>
              <small>
                Note: There are rate limits on weather and the map, so you might
                not get values. Value is updated every minute. Map requests are
                limited to 1000 per day.
              </small>
            </strong>
          </p>
        </div>
        <Looper />
      </div>
    )
  }
}
