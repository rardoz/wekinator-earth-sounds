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
    trainMode: PropTypes.bool,
    onOutputChange: PropTypes.func.isRequired,
    midiValues: PropTypes.shape({})
  }

  static defaultProps = {
    fetching: false,
    defaultValues: {},
    trainMode: false,
    midiValues: {}
  }

  render() {
    const {
      fetching,
      onSubmit,
      defaultValues,
      onLocationChange,
      trainMode,
      onOutputChange,
      midiValues
    } = this.props

    return (
      <div>
        <div className={styles.gutters}>
          <h2>
            {trainMode
              ? 'Adjust slider inputs or click the map'
              : 'Click on the map to receive weather'}
          </h2>
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
        <Looper midiValues={midiValues} onChange={onOutputChange} />
      </div>
    )
  }
}
