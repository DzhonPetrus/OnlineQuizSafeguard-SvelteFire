<script>
  export let attemptId;

  import { Doc } from "sveltefire";
  import { Stretch } from "svelte-loading-spinners";

  import { quizAttempt } from "../../util/store.js";
  import QUIZ_RESULT from '../../components/QUIZ_RESULT.svelte';

</script>

<Doc path={`attempts/${attemptId}`} let:data={attempt} on:data={e => quizAttempt.set(e.detail.data)}>
  <Doc path={`quizzes/${attempt.quizId}`} let:data={quiz} >

  <QUIZ_RESULT selectedQuiz={quiz} />

  <span slot="loading">
    <div class="flex items-center justify-center w-full mt-8">
        <Stretch size="60" color="#FF3E00" unit="px" duration="1s" />
      </div>
    </span>

    <span slot="fallback">
      ERROR LOADING ATTEMPT RESULT
    </span>


</Doc>
</Doc>
