<script>
  import { Router } from '@sveltech/routify';
  import { routes } from '@sveltech/routify/tmp/routes';
  import {  NotificationDisplay } from '@beyonk/svelte-notifications';

</script>

<Router {routes} />
<NotificationDisplay />


<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
