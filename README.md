# pre-training
A Simple RESTful API for Simple People! ;-D

## Instructions

1. Install [Node.js](https://nodejs.org/en/download/)
2. Git clone the flavor
``` git clone https://github.com/andela-ggikera/pre-training.git ```
3. Use node.js to start up your server
``` node server.js ``` or [supervisor](https://www.npmjs.com/package/supervisor) module ``` supervisor server.js ```
4. Play around with the restful API either using [Postman](https://chrome.google.com/webstore/search/postman) or a browser of your choice.
 	* ``` http://localhost:8080/api/ ``` For the home page
  * POST : ``` http://localhost:8080/api/simple/< your-name-with-spaces-or-not > ```
  * GET all: ``` http://localhost:8080/api/simple/ ```
  * GET specific: ``` http://localhost:8080/api/simple< _id > ```
  * PUT: ``` http://localhost:8080/api/< _id > ```
  * DELETE: ``` http://localhost:8080/api/< _id > ```

5. For testing use jasmine-node to execute frisby: ``` jasmine-node spec/ ```
