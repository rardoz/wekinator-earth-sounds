import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles.css'

export default class extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    fetching: PropTypes.bool,
    defaultValues: PropTypes.shape({}),
    trainingMode: PropTypes.bool
  }

  static defaultProps = {
    fetching: false,
    defaultValues: {},
    trainingMode: false
  }

  state = {}

  onInputChange = e => {
    const { name, value } = e.target
    const { trainingMode } = this.props

    this.setState({ [name]: value }, () => {
      if (!trainingMode) {
        this.props.onSubmit({ ...this.props.defaultValues, ...this.state })
      }
    })
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.onSubmit({ ...this.props.defaultValues, ...this.state })
  }

  randomNumber = (limit = 200) => {
    const randomNumber = parseFloat(Math.random() * (limit + 1))
    const diff = parseFloat(Math.random() * (limit + 1))
    return (randomNumber - diff).toFixed(1)
  }

  onRandomize = e => {
    e.preventDefault()
    this.setState({
      temp: this.randomNumber(),
      pressure: this.randomNumber(),
      humidity: this.randomNumber(),
      visibility: this.randomNumber(),
      temp_min: this.randomNumber(),
      temp_max: this.randomNumber(),
      wind_speed: this.randomNumber(),
      cloudiness: this.randomNumber()
    })
  }

  render() {
    const { fetching, defaultValues, trainingMode } = this.props
    const values = {
      ...defaultValues,
      ...this.state
    }

    return (
      <form className={styles.form} onSubmit={this.onSubmit}>
        <div className={styles.flexCol}>
          <h3 className={styles.gutters}>Weather Input</h3>
        </div>
        <div className={styles.flexCol}>
          <fieldset>
            <label>Temp ({values.temp}˚C)</label>
            <input
              type="range"
              name="temp"
              value={values.temp}
              onChange={this.onInputChange}
              min={-90}
              max={60}
              step={0.1}
            />
          </fieldset>
          <fieldset>
            <label>Pressure ({values.pressure} hPa)</label>
            <input
              type="range"
              name="pressure"
              value={values.pressure}
              onChange={this.onInputChange}
              min={800}
              max={1100}
              step={0.1}
            />
          </fieldset>
        </div>
        <div className={styles.flexCol}>
          <fieldset>
            <label>Humidity ({values.humidity}%)</label>
            <input
              type="range"
              name="humidity"
              value={values.humidity}
              onChange={this.onInputChange}
              min={0}
              max={100}
              step={0.1}
            />
          </fieldset>
          <fieldset>
            <label>Visibility ({values.visibility} m)</label>
            <input
              type="range"
              name="visibility"
              value={values.visibility}
              onChange={this.onInputChange}
              min={0}
              max={18000}
              step={0.1}
            />
          </fieldset>
        </div>
        <div className={styles.flexCol}>
          <fieldset>
            <label>Temp Min ({values.temp_min}˚C)</label>
            <input
              type="range"
              name="temp_min"
              value={values.temp_min}
              onChange={this.onInputChange}
              min={-90}
              max={60}
              step={0.1}
            />
          </fieldset>
          <fieldset>
            <label>Temp Max ({values.temp_max}˚C)</label>
            <input
              type="range"
              name="temp_max"
              value={values.temp_max}
              onChange={this.onInputChange}
              min={-90}
              max={60}
              step={0.1}
            />
          </fieldset>
        </div>
        <div className={styles.flexCol}>
          <fieldset>
            <label>Wind Speed ({values.wind_speed} m/s)</label>
            <input
              type="range"
              name="wind_speed"
              value={values.wind_speed}
              onChange={this.onInputChange}
              min={0}
              max={115}
              step={0.1}
            />
          </fieldset>
          <fieldset>
            <label>Cloudiness ({values.cloudiness}%)</label>
            <input
              type="range"
              name="cloudiness"
              value={values.cloudiness}
              onChange={this.onInputChange}
              min={0}
              max={100}
              step={0.1}
            />
          </fieldset>
        </div>
        <div className={styles.flexCol}>
          <fieldset>
            <button disabled={fetching} type="submit">
              Apply
            </button>
          </fieldset>
          <fieldset>
            <button disabled={fetching} onClick={this.onRandomize}>
              Random
            </button>
          </fieldset>
        </div>
      </form>
    )
  }
}
