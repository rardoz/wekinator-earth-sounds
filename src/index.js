import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import styles from './styles.css'
const socket = io.connect('ws://localhost:3004')
socket.on('ping', d => console.log(d))

class App extends Component {
  socket = null
  state = {
    x: 0,
    y: 0,
    temp: 90,
    pressure: 1000,
    humidity: 100,
    temp_min: 0,
    temp_max: 100,
    visibility: 1000,
    wind_speed: 1,
    cloudiness: 1,
    hexValue: '#000',
  }

  onMouseMove = ({ clientX, clientY }) => {
    this.setState({ x: clientX, y: clientY })
  }

  componentDidMount() {
    socket.on('outputData', data => {
      const { hexValue } = data
      console.log(hexValue, data)
      this.setState({ hexValue })
    })
  }

  toggleTrainMode = () => {
    const { trainMode } = this.state
    this.setState({ trainMode: !trainMode })
    socket.emit('trainMode', !trainMode)
  }

  onSubmit = e => {
    e.preventDefault()
    //todo when submit we need to send out an event to train the model
  }

  onInputChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const { trainMode, temp, hexValue } = this.state

    return (
      <div className={styles.container} style={{ background: hexValue }}>
        <h1 className={styles.gutters}>
          {trainMode ? 'Training Mode' : 'Live Mode'}
        </h1>
        <div>
          <fieldset className={styles.inlineFieldset}>
            <input
              value="true"
              checked={trainMode}
              type="checkbox"
              onChange={this.toggleTrainMode}
            />
            <label>&nbsp; Train Mode</label>
          </fieldset>
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
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
