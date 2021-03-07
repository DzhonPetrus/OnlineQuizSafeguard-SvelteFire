<script>
  import SignIn from '../components/SignIn.svelte';
  import Nav from '../components/Nav.svelte';

  import { FirebaseApp, User } from "sveltefire";

  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/storage";

  let firebaseConfig = {
  // Insert Firebase Credentials here
  apiKey: "AIzaSyBfZsaPhvytstCy1RLR5qDvSJqgzVWIqMk",
  authDomain: "online-quiz-safeguard.firebaseapp.com",
  projectId: "online-quiz-safeguard",
  storageBucket: "online-quiz-safeguard.appspot.com",
  messagingSenderId: "9646730740",
  appId: "1:9646730740:web:f09c386a11321847481da1",
  measurementId: "G-5TW7SDMNDW"
  };

  firebase.initializeApp(firebaseConfig);
</script>

<main class="bg-gray-100 dark:bg-gray-800 h-screen">
<FirebaseApp {firebase}>
  <User persist={sessionStorage} let:user let:auth>

    <div slot="signed-out">
      <SignIn {auth}/>
    </div>

    <Nav { user } { auth } />
    <div class="container mx-auto">
      <slot />
    </div>


  </User>
</FirebaseApp>
</main>
