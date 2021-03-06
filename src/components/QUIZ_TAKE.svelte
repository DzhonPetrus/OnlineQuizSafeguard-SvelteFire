<script>
  import Timer from '../components/Timer.svelte';
  import ActivityLog from '../components/ActivityLog.svelte';
  import { shuffleArray } from '../util/helper.js';

  import { notifier } from '@beyonk/svelte-notifications';
  import { Stretch } from "svelte-loading-spinners";
  import firebase from "firebase/app";
    const db = firebase.firestore();
  const { serverTimestamp } = firebase.firestore.FieldValue;
  import { currentUser, quizAttempt } from '../util/store.js';

  import { Doc } from "sveltefire";

  let activityLog=[];

  export let selectedQuiz;
    export let quizState;
    let questionnaire=[];
    let correctAnswers=[];
    $: userCorrectAnswers = correctAnswers.filter((ans, i) => ans === answers[i]);
    let answers=[];

    const handleData = (data) => {
      questionnaire = data;
        correctAnswers = questionnaire.questions.map(v => v.correctAnswer);
      };

  console.log(selectedQuiz)
    /* $:console.log(answers) */
    // $:console.log(activityLog)

    /* $:console.log(questionnaire) */
    /* $: console.log(correctAnswers); */
    /* $: console.log(userCorrectAnswers); */
    const handleSubmit = () => {
      let attempt=[];
      let score = userCorrectAnswers.length;
      attempt = {quizId: selectedQuiz.quizId, email: $currentUser.email, score, answers, quizLog:activityLog, createdAt:serverTimestamp()};

        console.log(attempt);
      if(confirm('Are you sure you want to submit your quiz?')){

        db.collection('attempts').add(attempt)
          .then(() => notifier.success('Quiz successfully submitted.'))
          .catch(err => console.error(err));

          quizState = 'FINISHED';
          quizAttempt.set(attempt);
      }
    };
</script>

<ActivityLog bind:activityLog/>


<div class="w-full bg-white p-12 mt-16 shadow-2xl rounded my-24 ">
<Doc path={`questionnaires/${selectedQuiz.questionnaireId}`} let:data={questionnaire} on:data={e => handleData(e.detail.data)} >
  <div class="flex justify-between container mx-auto">
    <div class="w-full lg:w-8/12">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold text-gray-700 md:text-2xl">{selectedQuiz.title}</h1>

        <h1 class="text-xl font-bold text-gray-700 md:text-xl">
          <Timer QUIZ_TIME={selectedQuiz.duration}/>
        </h1>
      </div>

    {#each questionnaire.questions as question, qi}
      <div class="mt-6">
          <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
            <div class="mt-2">
              <a class="text-2xl text-gray-700 font-bold hover:underline">{question.question}</a>

                  {#each shuffleArray([question.correctAnswer, ...question.incorrectAnswers]) as answer}

                   <div class="col-span-2 sm:col-span-2">
                      <label class="block text-sm font-medium text-gray-700">
                        {answer}
                      </label>
                      <input type="radio" bind:group={answers[qi]} value={answer} class="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"/>
                    </div>

                    {/each}

              </div>
          </div>
      </div>
    {/each}
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button on:click={handleSubmit} class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" >
                    SUBMIT
                </button>
            </div>
  </div>
</div>
  <span slot="loading">
    <div class="flex items-center justify-center w-full mt-8">
        <Stretch size="60" color="#FF3E00" unit="px" duration="1s" />
      </div>
    </span>

    <span slot="fallback">
      QUIZ DOESN'T EXIST
    </span>

</Doc>

</div>
