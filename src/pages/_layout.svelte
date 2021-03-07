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
