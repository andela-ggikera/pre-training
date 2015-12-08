# pre-training
A Simple RESTful API for simple people

## Instructions
1. Install [Node.js](https://nodejs.org/en/download/)
2. Install [Mongoodb](https://www.npmjs.com/package/mongodb)
3. Git clone the flavor
``` git clone https://github.com/andela-ggikera/pre-training.git ```
4. Use node.js to start up your server
``` node server.js ```
5. Play around with the restful API either using [Postman](https://chrome.google.com/webstore/search/postman) or a browser of your choice.
 	* ``` http://localhost:8080/api/ ``` For the welcome page
  * POST : ``` http://localhost:8080/api/simple ```
  * GET all: ``` http://localhost:8080/api/simple ```
  * GET specific: ``` http://localhost:8080/api/simple:simple_id ```
  * PUT : ``` http://localhost:8080/api/simple:simple_id ```

