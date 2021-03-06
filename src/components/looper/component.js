import React, { Component } from 'react'
import MIDISounds from 'midi-sounds-react'
import styles from '../../styles.css'
import looperStyles from './styles.css'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drumBass: 5,
      drumSnare: 15,
      drumHiHat: 35,
      drumClap: 24,
      tracks: [
        [
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ],
        [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        ]
      ]
    }
    this.state.data = []
    this.beats = []
  }

  componentDidMount() {
    this.setState({ initialized: true })
  }

  componentDidUpdate(prevProps, prevState) {
    const { midiValues } = this.props
    if (
      Object.values(prevProps.midiValues).join('') !==
      Object.values(midiValues).join('')
    ) {
      const {
        midi_type_1,
        midi_type_2,
        midi_type_3,
        midi_type_4,
        ...tracks
      } = midiValues
      const trackValues = Object.values(tracks)
      const newState = {
        drumBass: midi_type_1,
        drumSnare: midi_type_2,
        drumHiHat: midi_type_3,
        drumClap: midi_type_4,
        tracks: [
          trackValues.splice(0, 16),
          trackValues.splice(0, 16),
          trackValues.splice(0, 16),
          trackValues
        ]
      }
      console.log('udpating midi state', newState)
      this.setState(newState, () => this.fillBeat())
    }
  }

  onSelectDrumSnare(e) {
    var list = e.target
    var n = list.options[list.selectedIndex].getAttribute('value')
    this.midiSounds.cacheDrum(n)
    var me = this
    this.midiSounds.player.loader.waitLoad(() => {
      me.setState(
        {
          drumSnare: n
        },
        this.onChange
      )
      me.fillBeat()
    })
  }

  onSelectDrumBass(e) {
    var list = e.target
    var n = list.options[list.selectedIndex].getAttribute('value')
    this.midiSounds.cacheDrum(n)
    var me = this
    this.midiSounds.player.loader.waitLoad(() => {
      me.setState(
        {
          drumBass: n
        },
        this.onChange
      )
      me.fillBeat()
    })
  }

  onSelectDrumHiHat(e) {
    var list = e.target
    var n = list.options[list.selectedIndex].getAttribute('value')
    this.midiSounds.cacheDrum(n)
    var me = this
    this.midiSounds.player.loader.waitLoad(() => {
      me.setState(
        {
          drumHiHat: n
        },
        this.onChange
      )
      me.fillBeat()
    })
  }
  onSelectDrumClap(e) {
    var list = e.target
    var n = list.options[list.selectedIndex].getAttribute('value')
    this.midiSounds.cacheDrum(n)
    var me = this
    this.midiSounds.player.loader.waitLoad(() => {
      me.setState(
        {
          drumClap: n
        },
        this.onChange
      )
      me.fillBeat()
    })
  }
  createSelectItems() {
    if (this.midiSounds) {
      if (!this.items) {
        this.items = []
        for (
          let i = 0;
          i < this.midiSounds.player.loader.drumKeys().length;
          i++
        ) {
          this.items.push(
            <option key={i} value={i}>
              {'' +
                (i + 1) +
                '. ' +
                this.midiSounds.player.loader.drumInfo(i).title}
            </option>
          )
        }
      }
      return this.items
    }
  }
  fillBeat() {
    for (var i = 0; i < 16; i++) {
      var drums = []
      if (this.state.tracks[0][i]) {
        drums.push(this.state.drumBass)
      }
      if (this.state.tracks[1][i]) {
        drums.push(this.state.drumSnare)
      }
      if (this.state.tracks[2][i]) {
        drums.push(this.state.drumClap)
      }
      if (this.state.tracks[3][i]) {
        drums.push(this.state.drumHiHat)
      }
      var beat = [drums, []]
      this.beats[i] = beat
    }
  }

  playLoop() {
    this.fillBeat()
    //todo set bpm as an output
    this.midiSounds.startPlayLoop(this.beats, 120, 1 / 16)
  }

  stopLoop() {
    this.midiSounds.stopPlayLoop()
  }

  toggleDrum(track, step) {
    var a = this.state.tracks
    a[track][step] = !a[track][step]
    this.setState({ tracks: a }, this.onChange)
    this.fillBeat()
  }

  onChange = () => {
    const { onChange } = this.props
    const { drumBass, drumSnare, drumClap, drumHiHat, tracks } = this.state
    const formData = [
      parseInt(drumBass, 10) + 1,
      parseInt(drumSnare, 10) + 1,
      parseInt(drumClap, 10) + 1,
      parseInt(drumHiHat, 10) + 1,
      ...tracks[0].map(val => (val ? 2 : 1)),
      ...tracks[1].map(val => (val ? 2 : 1)),
      ...tracks[2].map(val => (val ? 2 : 1)),
      ...tracks[3].map(val => (val ? 2 : 1))
    ]

    onChange(formData)
  }

  render() {
    return (
      <div>
        <div className={styles.flexCol}>
          <div className={[styles.gutters, styles.flexItem].join(' ')}>
            <h3>Midi Output</h3>
            <table>
              <tbody>
                <tr>
                  <td>
                    <select
                      value={this.state.drumBass}
                      onChange={this.onSelectDrumBass.bind(this)}
                    >
                      {this.createSelectItems()}
                    </select>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[0][0]}
                      onChange={e => this.toggleDrum(0, 0)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[0][1]}
                      onChange={e => this.toggleDrum(0, 1)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[0][2]}
                      onChange={e => this.toggleDrum(0, 2)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[0][3]}
                      onChange={e => this.toggleDrum(0, 3)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[0][4]}
                      onChange={e => this.toggleDrum(0, 4)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[0][5]}
                      onChange={e => this.toggleDrum(0, 5)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[0][6]}
                      onChange={e => this.toggleDrum(0, 6)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[0][7]}
                      onChange={e => this.toggleDrum(0, 7)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[0][8]}
                      onChange={e => this.toggleDrum(0, 8)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[0][9]}
                      onChange={e => this.toggleDrum(0, 9)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[0][10]}
                      onChange={e => this.toggleDrum(0, 10)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[0][11]}
                      onChange={e => this.toggleDrum(0, 11)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[0][12]}
                      onChange={e => this.toggleDrum(0, 12)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[0][13]}
                      onChange={e => this.toggleDrum(0, 13)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[0][14]}
                      onChange={e => this.toggleDrum(0, 14)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[0][15]}
                      onChange={e => this.toggleDrum(0, 15)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <select
                      value={this.state.drumSnare}
                      onChange={this.onSelectDrumSnare.bind(this)}
                    >
                      {this.createSelectItems()}
                    </select>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[1][0]}
                      onChange={e => this.toggleDrum(1, 0)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[1][1]}
                      onChange={e => this.toggleDrum(1, 1)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[1][2]}
                      onChange={e => this.toggleDrum(1, 2)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[1][3]}
                      onChange={e => this.toggleDrum(1, 3)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[1][4]}
                      onChange={e => this.toggleDrum(1, 4)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[1][5]}
                      onChange={e => this.toggleDrum(1, 5)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[1][6]}
                      onChange={e => this.toggleDrum(1, 6)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[1][7]}
                      onChange={e => this.toggleDrum(1, 7)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[1][8]}
                      onChange={e => this.toggleDrum(1, 8)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[1][9]}
                      onChange={e => this.toggleDrum(1, 9)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[1][10]}
                      onChange={e => this.toggleDrum(1, 10)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[1][11]}
                      onChange={e => this.toggleDrum(1, 11)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[1][12]}
                      onChange={e => this.toggleDrum(1, 12)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[1][13]}
                      onChange={e => this.toggleDrum(1, 13)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[1][14]}
                      onChange={e => this.toggleDrum(1, 14)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[1][15]}
                      onChange={e => this.toggleDrum(1, 15)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <select
                      value={this.state.drumClap}
                      onChange={this.onSelectDrumClap.bind(this)}
                    >
                      {this.createSelectItems()}
                    </select>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[2][0]}
                      onChange={e => this.toggleDrum(2, 0)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[2][1]}
                      onChange={e => this.toggleDrum(2, 1)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[2][2]}
                      onChange={e => this.toggleDrum(2, 2)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[2][3]}
                      onChange={e => this.toggleDrum(2, 3)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[2][4]}
                      onChange={e => this.toggleDrum(2, 4)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[2][5]}
                      onChange={e => this.toggleDrum(2, 5)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[2][6]}
                      onChange={e => this.toggleDrum(2, 6)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[2][7]}
                      onChange={e => this.toggleDrum(2, 7)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[2][8]}
                      onChange={e => this.toggleDrum(2, 8)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[2][9]}
                      onChange={e => this.toggleDrum(2, 9)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[2][10]}
                      onChange={e => this.toggleDrum(2, 10)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[2][11]}
                      onChange={e => this.toggleDrum(2, 11)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[2][12]}
                      onChange={e => this.toggleDrum(2, 12)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[2][13]}
                      onChange={e => this.toggleDrum(2, 13)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[2][14]}
                      onChange={e => this.toggleDrum(2, 14)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[2][15]}
                      onChange={e => this.toggleDrum(2, 15)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <select
                      value={this.state.drumHiHat}
                      onChange={this.onSelectDrumHiHat.bind(this)}
                    >
                      {this.createSelectItems()}
                    </select>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[3][0]}
                      onChange={e => this.toggleDrum(3, 0)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[3][1]}
                      onChange={e => this.toggleDrum(3, 1)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[3][2]}
                      onChange={e => this.toggleDrum(3, 2)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[3][3]}
                      onChange={e => this.toggleDrum(3, 3)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[3][4]}
                      onChange={e => this.toggleDrum(3, 4)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[3][5]}
                      onChange={e => this.toggleDrum(3, 5)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[3][6]}
                      onChange={e => this.toggleDrum(3, 6)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[3][7]}
                      onChange={e => this.toggleDrum(3, 7)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[3][8]}
                      onChange={e => this.toggleDrum(3, 8)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[3][9]}
                      onChange={e => this.toggleDrum(3, 9)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[3][10]}
                      onChange={e => this.toggleDrum(3, 10)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[3][11]}
                      onChange={e => this.toggleDrum(3, 11)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[3][12]}
                      onChange={e => this.toggleDrum(3, 12)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[3][13]}
                      onChange={e => this.toggleDrum(3, 13)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[3][14]}
                      onChange={e => this.toggleDrum(3, 14)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={this.state.tracks[3][15]}
                      onChange={e => this.toggleDrum(3, 15)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={[styles.flexItem].join(' ')}>
            <h3 className={[styles.gutters]}>Audio Controls</h3>
            <div className={styles.flexCol}>
              <fieldset className={styles.flexItem}>
                <button onClick={this.playLoop.bind(this)}>Play loop</button>
              </fieldset>
              <fieldset className={styles.flexItem}>
                <button onClick={this.stopLoop.bind(this)}>Stop loop</button>
              </fieldset>
            </div>
          </div>
        </div>
        <div className={looperStyles.hide}>
          <MIDISounds
            ref={ref => (this.midiSounds = ref)}
            appElementName="app"
            drums={[
              this.state.drumSnare,
              this.state.drumBass,
              this.state.drumHiHat,
              this.state.drumClap
            ]}
          />
        </div>
      </div>
    )
  }
}
