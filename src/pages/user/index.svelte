<script>
  import { currentUser } from '../../util/store.js';
  import { goto } from '@sveltech/routify';

    $goto(`/user/${$currentUser.email}`);
</script>
