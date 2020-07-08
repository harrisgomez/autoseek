# Let's jump right into it

1. Clone the repo onto your local.

2. Sign up for a free __API Key__ here [Clarifai API](https://portal.clarifai.com/signup "Clarifai's Sign Up Page").

3. Once you have your API Key, you can either:

   * Create a *.env* file in the */client* directory and include it there by adding

     ```REACT_APP_CLARIFAI_KEY="<YOUR_API_KEY_HERE>"```

     __OR__

   * Insert it into the Clarifai instance directly in */client/src/actions/action-creators.js*

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


In development, the app uses the browser's local storage for registering new users and signing in existing ones.


Successfully registering a fake account or signing into an existing one should redirect you to the homepage.


At the homepage there will be an input that accepts image URLs and renders the image dynamically.


Clicking the __Detect__ button makes a call to the Clarifai API's facial detection model and the app will render a box where the face is located.


Now try using an image with multiple faces and see what happens! Push the limits and see how well it performs across different images.