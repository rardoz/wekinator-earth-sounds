### Wekinator Earth Sounds

An earthly experiment with wekinator. Build on React, Electron, NodeJS, and Socket.io. Use the `all classifiers` algo in Wekinator to output a beat based on 8 weather based input features. Using the K-NN model for each output makes the most sense for this. I wanted to gracefully create beats for untrained areas of the map.

### Description

Click on the map to get the weather for that location. The weather is a set of 8 inputs. Click the train checkbox to train your model with Wekinator. Click on the midi controls to adjust the output. The output is a set of 68 values. The first 4 outputs are the midi types. There are 235 classes per channel. The other 64 inputs have 2 classes per input and are the step controls. 1 is off and 2 is on.

There are binary versions of this under the [release tab](https://github.com/rardoz/wekinator-earth-sounds/releases) in github so you don't have to go through the hassle of development mode. This includes a wekinator project that is already trained.

![alt text](/icons/app-screenshot.png 'Working model')

### Inputs for Wekinator (in order)

The input data is determined by clicking on the map. The map sends the longitude and latitude of the point clicked to `https://api.openweathermap.org`. The api returns the weather conditions for that area. You can change the api key by going to `/server/index.js` and looking for the endpoint.

1. temperature - float from -90˚C to 60˚C
2. pressure - float from 800 hPa to 1100 hPa
3. humidity - float from 0% to 100%
4. temp_min - float from -90˚C to 60˚C
5. temp_max - float from -90˚C to 60˚C
6. visibility - float from 0 m to 18000 m
7. wind speed - float from 0 m/s to 115 m/s
8. cloudiness - float from 0% to 100%

### Outputs for Wekinator

There are 68 outputs generated from the midi controls.

1. output 1 - 235 classes that chooses the type of instrument to play for the first row of midi controls.
2. output 2 - 235 classes that chooses the type of instrument to play for the first row of midi controls.
3. output 3 - 235 classes that chooses the type of instrument to play for the first row of midi controls.
4. output 4 - 235 classes that chooses the type of instrument to play for the first row of midi controls.
5. output 5 through 20 - these are the midi beats for the first midi sound. There are 2 classes. 1 is off and 2 is on.
6. output 21 through 36 - these are the midi beats for the second midi sound. There are 2 classes. 1 is off and 2 is on.
7. output 37 through 52 - these are the midi beats for the third midi sound. There are 2 classes. 1 is off and 2 is on.
8. output 53 through 68 - these are the midi beats for the fourth midi sound. There are 2 classes. 1 is off and 2 is on.

### Dev Requirements

- NodeJS 8.9.4 or greater
- Wekinator

### Training the model

- Check the train box in the top right corner
- Click `start recording` in Wekinator
- Click on a part of the world to get the weather
- The right sidebar will change values
- Hit apply in the right sidebar to record the value

![alt text](/icons/model-example.png 'Working model')

### Playing in live mode

- Uncheck the train box after you are satisfied with your model
- Click `run`
- Click on the earth to hear the output of your model

* Note tested with the `all classifiers` algo in wekinator.

![alt text](/icons/setup.png 'setup model')

### Starting the app for dev mode

Before you try to start the app you must have a [Google API](https://developers.google.com/maps/documentation/javascript/get-api-key) key and an [Open Weather Maps API](https://openweathermap.org/appid) key set in the `/env/.env` file.

- Install the app `npm i`
- Build the app by running `npm run start:dev`
- Start the app by running `npm run start`

Note: You need to have both commands running to start the app.

### Building a compiled packages per OS

- You can build the packages for each OS by running `npm run package`

### Challenges

Getting the weather data and the map data is expensive. I added in rate limits so that I wouldn't get charged more than 10USD per month on this experiment. Training the model was tricky with live earth data so I created a training sidebar that allows for the user to train the model without actually having weather data. Also determining the outputs was hard but after recreating the project a number of times, I was able to come up with a set of outputs that made sense for the model. I just had to think harder about it.

### Wekinator improvements

In the future I hope that wekinator would allow for us to be able to add and remove outputs on the fly insteaad of having to create a new project.

### Licence

[ECL-2.0 (Educational Community License, Version 2.0 )](LICENSE.md)

### TODO

- Adjust tempo
- Add more audo components
- Fix windows build (long path issue)
- Inputs are a bit clunky at times
