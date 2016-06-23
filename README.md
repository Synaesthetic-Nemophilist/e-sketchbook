# e-sketchbook

<File structure -->

-- app               <!-- holds all our files for node components (models, routes) -->
----- models
---------- todo.js  <!-- defines the todo model -->
----- routes.js     <!-- all routes will be handled here -->

-- config            <!-- all our configuration will be here -->
----- database.js

-- public
-------- js
-------------- controllers
--------------------- main.js
-------------- services
--------------------- todos.js
-------------- core.js
-------- index.html

-- package.json      <!-- npm configuration to install dependencies/modules -->
-- server.js         <!-- Node configuration -->
