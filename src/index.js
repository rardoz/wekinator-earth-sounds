import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import styles from './styles.css'
import { TrainingForm, LiveMode } from './components'

const socket = io.connect('ws://localhost:3004')
socket.on('ping', d => console.log(d))

class App extends Component {
  socket = null
  state = {
    trainMode: false,
    fetching: false,
    defaultValues: {
      cloudiness: 1,
      humidity: 0,
      lat: 47.6873,
      long: -122.377,
      pressure: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
      visibility: 0,
      wind_speed: 0
    }
  }

  componentDidMount() {
    socket.on('outputData', data => {
      console.log('todo wire up output data', data)
    })

    socket.on('trainInputDataRecieved', () => {
      this.setState({ fetching: false })
    })
    socket.emit('isTrainMode')
    socket.on('isTrainMode', trainMode => this.setState({ trainMode }))
    socket.emit('getStats')
    socket.on('stats', data => {
      console.log('stats are', data)
      this.setState({ defaultValues: data })
    })
  }

  toggleTrainMode = () => {
    const { trainMode } = this.state
    this.setState({ trainMode: !trainMode })
    socket.emit('trainMode', !trainMode)
  }

  onTrain = formData => {
    this.setState({ fetching: true }, () =>
      socket.emit('trainInputData', formData)
    )
  }

  onLocationChange = formData => {
    socket.emit('locationChange', formData)
  }

  render() {
    const { trainMode, fetching, defaultValues } = this.state

    return (
      <div className={styles.container}>
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
          <LiveMode
            trainMode={trainMode}
            fetching={fetching}
            onSubmit={this.onTrain}
            defaultValues={defaultValues}
            onLocationChange={this.onLocationChange}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
