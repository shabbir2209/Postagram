# Postagram

-Description-
This is a simple yet powerful web application which allows users to post anything they would like to post,
The app is based on a social media which allows users to login through google aswel as the built in login system.

-Stack used-
This web app is developed using the MERN app,
MongoDB- used for the database to store users and the posts they have added.
Node with Express- used for the backend server and to create apis and authenticate with jwt,also used for the database interaction.
React- The frontend framework,simple yet extremely powerful, Redux is used for the interpretation and storing the logged in users data.
The main UI is based on the Material UI.

-Deploment-
Deploying will be done through heroku and netlify

-User Interface-
The UI will be divided into 2 sections:
The left will have the posts from the different users
The posts will be in a card UI which will allow users to edit,delete and like the posts.
The edit and delete will only be available for the user that has posted the post.

The right side will be locked until a user signs in,once signed in the form will populate in which the user be able to post something to the web application.

The navbar will greet the logged in user with their name and profile pic if they have one from google.
On the right hand side the user will be able to login or sign up/ logout.

The users will be able to start the app using npm start which will concurrently run the frontend and the backend and connect to the mongodb server.

-Functional requirements-
The functional requirements should be able to allow users to sign up and will be generated a jwt token which will be used to identify the user and log them in.
The security measures should be in place to hash the passwords and encrypt them into the database.
If a user is not logged in, they should be restricted to delete and edit other users posts.

--USING THE APP--
npm install on both the client and the server to install the necessary packages once downloaded.
then from the server side,npm start should run both the frontend and the backend,

Once on the homepage, The user shall see other posts,and in order to like and create new posts the user needs to sign in,
The signing in process should be easy either using the signing up system or using the google auth account, (currently set to mine for debugging)
