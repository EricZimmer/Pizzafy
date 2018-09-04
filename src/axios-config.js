import axios from 'axios';

const instance = axios.create({
    
    /* headers: {
      apiKey: "AIzaSyC6FLhAfzR6yolguurRC6OhOWDqUlk2itA",
      authDomain: "pizzafy-pizzabuilder.firebaseapp.com",
      projectId: "pizzafy-pizzabuilder",
      storageBucket: "pizzafy-pizzabuilder.appspot.com",
      messagingSenderId: "273048159556"
    }, */
    baseURL: "https://firestore.googleapis.com/v1beta1/projects/pizzafy-pizzabuilder/databases/(default)/documents",
    
});

export default instance;