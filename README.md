## How to Run it         
After your clone this project follow this instructions

0.`npm install` to install of dependencies, which are included in this project
1.  `ng build` to convert the typescript files into Javascript
2. navigate yourself into the server folder in this project execute `node server.js` or `nodemon server.js`(For that you need to install nodemon globally) to start the server on express. Navigate `http://localhost:3000/`.
3. (optional) To test mail data ,go to `server.js` navigate to mailOptions, and add your email into the key named `to` it should look like this `to: 'YourMail@mail.com'`

## IMPORTANT INFORMATION in case something does not work or changes !!!
uses angular material// for form styling
hammerjs //not sure
ngx-bootstrap //for carousel slider.
Bootstrap// for  grid system and easy styling
styles.css// has the overwrite classes of some classes from ngx-bootstrap and angular material
"core-js": "^2.4.1",
"express": "^4.16.3", //Using express to make server in order to send the mail data
"nodemailer": "^4.6.4",// Handles all our post method and send the data



# BoatButlerLand

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).




## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
