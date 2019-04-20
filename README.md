# HyperLoop Server API


To try this app live, visit [here](https://hyperlooper.herokuapp.com/).
To see live server, visit [here](https://hyper-looper-server.herokuapp.com/)
## API Documentation
Endpoints on the server side include:
### 'api/users' - user registration
#### GET '/'
Returns list of users. ONLY USED FOR TESTING of user creation, not meant for production application.
#### POST '/'
"username" and "password" are required in request body. Both parameters cannot start or end with white space, and password must be at least 10 characters and at most 72 characters long.
### 'api/auth' - user authentication
#### POST '/login'
Authentication of user login.

### 'api/drums' - drum loop library
This endpoint displays protected information about user's saved drums loops. Requires login
#### GET '/'
Get all loops created by the user.
#### GET '/:id'
Request query specific drum loop id
#### POST '/'
Request query must supply the following:

* user - string - username      
* name - a string, name of drum loop
* pads - array of arrays containing 16 integers(0 or 1), corresponding to active pads
* drums -  array integers - corresponds to drum ids for each of the pads arrays

#### DELETE '/:id'
Request body supplies id for loop to be deleted

