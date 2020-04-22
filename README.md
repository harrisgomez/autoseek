This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


# Let's get started

1. Clone the repo onto your local.

2. Next, you'll need to sign up for your free __API Key__ here [Clarifai API](https://portal.clarifai.com/signup "Clarifai's Sign Up Page").

3. Once you have your API Key, you can either:

   * Create a *.env* file in the */client* directory and include it there by adding

     ```REACT_APP_CLARIFAI_KEY="<YOUR_API_KEY_HERE>"```

   __OR__

   * Insert it into the Clarifai instance directly in the */client/src/container/App.js* file on *Lines 14-16*

     ```javascript
     export const clarifaiApp = new Clarifai.App({
        apiKey: "<YOUR_API_KEY_HERE>"
     });
     ```
___

## Available Scripts

### `npm i`

Installs the project's server-side dependencies.

### `npm start`

Runs only the server. Uses port 8000.

### `npm run server`

Alternatively, if you have the __nodemon__ package installed, this will also run the server and reload it when you make edits.

### `npm run client`

Runs only the client.

### `npm run dev`

Must have the __concurrently__ package installed. This will run both server and client at the same time.

---

## How it works

After everything is up and running, go to your __localhost/3000__.


In development, the app runs all of its static data against a test database located in *"/static/db"*.


You'll see a test user on Sign Ip as placeholders.


From here, the user can Sign In immediately or register a new account.


Successfully signing in should redirect you to the homepage where you can paste the url to any image.


Clicking the __Detect__ button will render the image.


If the image contains someone's face in it, the app will attempt to narrow down and determine where on the image their face is located exactly by drawing a box around it.


Now try using an image with multiple faces and see what happens!