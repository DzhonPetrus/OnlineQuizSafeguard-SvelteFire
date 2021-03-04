<script>
  import {  NotificationDisplay } from '@beyonk/svelte-notifications';
  import Login from './components/Login.svelte';
  import Dashboard from './components/Dashboard.svelte';

  import { FirebaseApp, User, Doc, Collection } from "sveltefire";

  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";

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

<NotificationDisplay />

<main class="bg-gray-100 dark:bg-gray-800 relative h-screen overflow-hidden relative">
<FirebaseApp {firebase}>
  <User persist={sessionStorage} let:user let:auth>
    <div slot="signed-out">
      <Login {auth}/>
    </div>

    <Dashboard {user} {auth} />

  </User>
</FirebaseApp>
</main>


<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
