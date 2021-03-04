<script>
  import { Router } from '@sveltech/routify';
  import { routes } from '@sveltech/routify/tmp/routes';
  import { currentUser } from '../util/store.js';

    import Nav from './Nav.svelte';

  export let auth;
  export let user;

    $:currentUser.set(user);
    $:console.log(user);
    $:console.log($currentUser);
</script>

DASHBOARD
<Nav { user } { auth } />
