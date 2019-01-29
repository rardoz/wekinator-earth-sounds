const express = require('express')
const app = express()
const server = require('http').createServer(app)
const cors = require('cors')
const io = require('socket.io')(server)
const osc = require('osc-min')
const dgram = require('dgram')
const fetch = require('node-fetch')
const iplocation = require('iplocation').default
const publicIp = require('public-ip')
const ip = '127.0.0.1'
const defaultGeoIP = '66.237.248.0'
const defaultLat = 47.6104
const defaultLong = -122.201
const inputPort = 6448
const webpagePort = 3004
const outputPort = 12000
let shouldWatch = true
module.exports = () => {
  const udp = dgram.createSocket({ type: 'udp4' })
  app.use(
    cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
    })
  )

  const inputDeviceData = (
    temp,
    pressure,
    humidity,
    temp_min,
    temp_max,
    visibility,
    windSpeed,
    cloudiness
  ) => {
    const buf = osc.toBuffer({
      address: '/wek/inputs',
      args: [
        temp,
        pressure,
        humidity,
        temp_min,
        temp_max,
        visibility,
        windSpeed,
        cloudiness
      ]
    })

    return udp.send(buf, 0, buf.length, inputPort, ip)
  }

  const fetchWeather = (lat, long) => {
    return (
      shouldWatch &&
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ddde11f41f06ef5c69ab12cb15595ea8`
      )
        .then(response => response.json())
        .then(response => {
          console.log(response)
          return inputDeviceData(
            response.main.temp,
            response.main.pressure,
            response.main.humidity,
            response.main.temp_min,
            response.main.temp_max,
            response.visibility,
            response.wind.speed,
            response.clouds.all
          )
        })
        .catch(e => console.log(e))
    )
  }

  const monitorWeather = socket => {
    publicIp
      .v4()
      .then(pip => {
        iplocation(pip || defaultGeoIP)
          .then(res => {
            setInterval(() => {
              if (shouldWatch) {
                fetchWeather(res.latitude, res.longitude)
              }
            }, 60000)
            fetchWeather(res.latitude, res.longitude)
            socket.on('inputData', () =>
              fetchWeather(res.latitude, res.longitude)
            )
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(e => console.log(e))
  }

  io.on('connection', socket => {
    socket.emit('ping', 'WebSocket link works')
    monitorWeather(socket)

    socket.on('trainInputData', data => {
      socket.emit('trainInputDataRecieved', true)
      console.log(data)
      return inputDeviceData(
        parseFloat(data.temp),
        parseFloat(data.pressure),
        parseFloat(data.humidity),
        parseFloat(data.temp_min),
        parseFloat(data.temp_max),
        parseFloat(data.visibility),
        parseFloat(data.wind_speed),
        parseFloat(data.cloudiness)
      )
    })

    socket.on('trainMode', trainMode => {
      console.log('train mode is', trainMode)
      shouldWatch = !trainMode
    })

    const sock = dgram.createSocket(
      { type: 'udp4', reuseAddr: true },
      (msg, rinfo) => {
        try {
          const oscmsg = osc.fromBuffer(msg)
          const seed = oscmsg.args.map(({ value }) => value).join('')
          oscmsg.hexValue = `#${Math.floor(
            Math.abs(Math.sin(seed) * 16777215) % 16777215
          ).toString(16)}`
          console.log(oscmsg)
          socket.emit('outputData', oscmsg)
        } catch (e) {
          return console.log('invalid OSC packet', e)
        }
      }
    )

    sock.bind(outputPort)
  })

  app.get('/', function(req, res, next) {
    res.send('It works!')
  })

  server.listen(webpagePort, 'localhost')
}
