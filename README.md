# Software Developer Portfolio

This is my latest software developer portfolio, designed and built implementing NodeJS, React and MongoDB. See below instructions to create a local copy of the project.

## Requirements

Nodejs needs to be installed on your system in order for the 'npm' command to run correctly. The data collection requires a local copy of MongoDB. The respository includes a data JSON file for the data example. Note - images will not appear unless images are added to correct file locations.

## Installation

1. Locally download the repository:

```
$ git clone https://github.com/jpask1392/dev-portfolio.git 
```

2. Head to to the directory of the downloaded project

3. Install the dependencies: 

```
$ npm i
 ```

## Usage

1. Start the server:

```
$ npm run start:dev 
```

2. Start the webpack dev server

```
$ npm run start:webpack 
```

This will run webpack-dev-server with the watch flag for automatic reloading when files are saved. Note that the dev server will be running on port 9000 with a proxy set up to port 3000.

## Deployment

Create a build of the project using specifications in the webpack.config files 

```
npm run build 
```

## Code quality 
	
This project uses Eslint

Run the following to lint all files:

```
./node_modules/.bin/eslint "src/**" 
```
