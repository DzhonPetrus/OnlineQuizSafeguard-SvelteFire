<script>
    export let user;
    export let auth;

</script>

NAVIGATION
<a on:click={() => auth.signOut()} href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
