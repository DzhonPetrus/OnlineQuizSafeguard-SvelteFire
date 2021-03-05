<script>
  import { Stretch } from "svelte-loading-spinners";
  import firebase from "firebase/app";
  const { serverTimestamp } = firebase.firestore.FieldValue;
  import { currentUser } from '../util/store.js';

  import { Doc } from "sveltefire";

  export let selectedQuiz;

    console.log(selectedQuiz);
</script>

<h1>QUIZ TAKE</h1>
<Doc path={`questionnaires/${selectedQuiz.questionnaireId}`} let:data={questionnaire} on:data={e => console.log(e.detail.data)} >
    {questionnaire.createdAt}
    <br>
    {#each questionnaire.questions as question}
      {question.question}
      <br>
      <ul>
        {#each question.incorrectAnswers as incAns}
          <li>{incAns}</li>
          {/each}
      </ul>
      {question.correctAnswer}
      <br>
      <br>
      <br>

    {/each}

  <span slot="loading">
    <div class="flex items-center justify-center w-full mt-8">
        <Stretch size="60" color="#FF3E00" unit="px" duration="1s" />
      </div>
    </span>

    <span slot="fallback">
      QUIZ DOESN'T EXIST
    </span>

</Doc>

