# JP Bots QA and Shipping App (Coding challenge)
[![generator-create-redux-app](https://img.shields.io/badge/built%20with-generator--create--redux--app-brightgreen.svg)](https://github.com/jonidelv/generator-create-redux-app)

#### Description

The owner of a factory producing toy robots requires software to manage the stages of the production line. Please build a web app to manage the QA and shipping process.

Assume that there is already a inventory management software for registering the new robots for QA.

To simplify things you can mimic inventory behaviour by generating the robots with different configurations in the backend programmatically. When the webapp ask for robots for QA you can return that collection.

------

Requirements
`Node v.8.9.0 +`


### To clone and install dependencies

#### `git clone https://github.com/dgtlmonk/jpbots jpbots && $_ && npm install`

Once the cloning is done, run the npm script inside the project folder (you should be inside already :-) ):



#### `npm start` or `yarn start`

This command should run and open the browser<br>
[http://localhost:3000](http://localhost:3000)

The page will reload if you make edits.<br>
You will see the build errors and lint warnings in the console.

#### `npm test` or `yarn test`

------
> Folders and Files


### Directory layout

    .
    ├── public                  # Runtime folder
    ├── src                     # Source files
    ├── test                    # Automated tests
    ├── common                  # Generic utilities folder
    ├── components              # Global / Reusable react components folder
    ├── containers              # React containers folder
    ├── data                    # Mock data folder
    ├── modules                 # Main module folder (sagas, reducers, actions, constants, exclusive components)
    ├── reducers                # Main Reducer folder
    ├── sagas                   # Main Saga folder
    ├── services                # API folder or anything that connects to back-end or 3rd party services
    ├── store                   # Redux CeateStore folder
    ├── styles                  # Global styles folder and antd stlyes overrides
    └── README.md               # This


#### create-react-app overrides file
`config-overrides.js`

------

### Tests
Not implemented yet

### Known Bug
When removing item from `Shipment` tab, the item goes back to original list (factory second or QA Passed) as checked item. Please uncheck the item first before adding it again - `Add To Shipment` button won't be visible anyways.

### Screenshots
![picture](https://cdn.pbrd.co/images/HncZwOa.png)
![picture](https://cdn.pbrd.co/images/Hnd1Vt3.jpg)

#### Notification message after QA Process

![picture](https://cdn.pbrd.co/images/Hnd2nRl.jpg)

> Shipping process

![picture](https://cdn.pbrd.co/images/HndcZ6V.jpg)
![picture](https://cdn.pbrd.co/images/HnddsWh.jpg)
![picture](https://cdn.pbrd.co/images/HnddIOZ.jpg)
![picture](https://cdn.pbrd.co/images/HndeoKR.jpg)
![picture](https://cdn.pbrd.co/images/HndeyGN.jpg)

> Error if shipment has no item for shipping

![picture](https://cdn.pbrd.co/images/HndeHeT.jpg)

> Shipment Summary screen

![picture](https://cdn.pbrd.co/images/HndfaRT.jpg)
