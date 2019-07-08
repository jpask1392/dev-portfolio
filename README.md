# node-playground

# Folder structure 

/api
	/routes

/dist
	* build output location   

/public 
	* should be build output location 

/src 
	/common
	/entry
	/portfolio 

# Running the package

* clone the git respositry to a local directory
* cd to the directory 
* run 'npm i' - this will install all the dependencies specified within the package.json file
* start the server with 'npm start' 
	- This will start a server specified in server.js. The server is run with nodemon. This server will run on port 3000
* start the webpack development server with 'npm run start:dev'
	- This will run webpack-dev-server with the watch flag for automatic reloading when files are saved. Note that the dev server will be running on port 9000 with a proxy set up to port 3000 so that everything can run from the same place.
* enter localhost:3000 into your chosen browser to view the project

# Code quality 
	
This project uses eslint for linting

run to lint
    $./node_modules/.bin/eslint "src/**"