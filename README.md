# Software Developer Portfolio

## Running the package

Clone the git respositry to a local directory with
```
git clone https://github.com/jpask1392/dev-portfolio.git
```
cd to the directory 
Instal dependencies 
```
npm i
```
Start the server
```
npm start
```
This will start a server specified in server.js. The server is run with nodemon. This server will run on port 3000

* start the webpack development server with 
```
npm run start:dev
```
This will run webpack-dev-server with the watch flag for automatic reloading when files are saved. Note that the dev server will be running on port 9000 with a proxy set up to port 3000 so that everything can run from the same place.

## Deployment

Run 
```
npm run build
```

to bundle all needed files

-------------------------------

Then run 
```
eb deploy "instance name"
```

to deploy all files to Elastic Beanstalk instance

## Code quality 
	
This project uses Eslint

Run the following to lint all files
```
./node_modules/.bin/eslint "src/**"
```