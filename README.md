### wekinator-earth-sounds

An earthly experiemnt with wekinator. Build on React, Electron, NodeJS, and Socket.io.

### Description

Click on the map to get the weather for that location. The weather is a set of 8 inputs. Click the train checkbox to train your model with Wekinator. Click on the midi controls to adjust the output. The output is a set of 68 values. The first 4 outputs are the midi types. There are 235 classes per channel. The Other 64 inputs have 2 inputs per channel and are the step controls. 1 is off and 2 is on.

### Training the model

- Check the train box in the top right corner
- Click `start recording` in Wekinator
- Click on a part of the world to get the weather
- The right sidebar will change values
- Hit apply in the right sidebar to record the value

### Playing in live mode

- Uncheck the train box after you are satisfied with your model
- Click `run`
- Click on the earth to hear the output of your model

* Note tested with the `all classifiers` algo in wekinator.

### Licence

[ECL-2.0 (Educational Community License, Version 2.0 )](LICENSE.md)

### TODO

- Adjust tempo
- Add more audo components
- Fix windows build (long path issue)
- Inputs are a bit clunky at times
- Default to your location is broken
