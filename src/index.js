import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
import styles from './styles.css'
import { TrainingForm } from './components'

const socket = io.connect('ws://localhost:3004')
socket.on('ping', d => console.log(d))

class App extends Component {
  socket = null
  state = {
    trainMode: false,
    fetching: false
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

  render() {
    const { trainMode, fetching } = this.state

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
          <TrainingForm fetching={fetching} onSubmit={this.onTrain} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
