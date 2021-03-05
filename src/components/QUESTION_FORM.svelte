<script>
    import { selectedQuestionnaireId, selectedQuizId, currentUser } from '../util/store.js';
    import { notifier } from '@beyonk/svelte-notifications';

    import firebase from 'firebase/app';
    const db = firebase.firestore();


    const qHeaders = ['Index', 'Question', 'Correct Answer', 'Incorrect Answers'];
    let questions = [];

    let questionFormState;
    let question;
    let selectedQuestion;
    let selectedIndex;

    let incorrectAnswers=['','','',''];
     let correctIndex;
     $: correctAnswer = incorrectAnswers[correctIndex];

    const handleQuestionClick = (op, i) => {
            questionFormState = op;
            if(op === 'add')
                resetForm()

            if(op === 'DELETE'){
                if(confirm(`Are you sure you want to delete question with index = ${i}?`)){
                    questions = questions.filter((q, qI) => qI !== i);
                    updateQuestionsInFB();
                    notifier.succes(`Question with index ${i} has been deleted successfully`);
                }
             }

            if(op === 'EDIT'){
                selectedQuestion = i[0];
                selectedIndex = i[1];

                    question = selectedQuestion.question;
                    incorrectAnswers = [selectedQuestion.correctAnswer, selectedQuestion.incorrectAnswers];
                    correctIndex = 0;
            }

    };

    const handleCTA = (i=0) => {
            if(questionFormState === 'ADD'){
                questions = [formValues, ...questions];
                updateQuestionsInFB();
                    notifier.success('Question has been added successfully');
            }

            if(questionFormState === 'EDIT'){
                if(confirm(`Are you sure you want to delete question with index = ${i}?`)){
                questions = questions.filter((q, qI) => qI !== selectedIndex);
                    questions = [formValues, ...questions];

                    notifier.success(`Question with index ${selectedIndex} has been updated successfully`);

                    }
                }

            resetForm();
        };
        const updateQuestionsInFB = () => {
            db.collection('questionnaires').doc($selectedQuestionnaireId).update({questions})
                .catch(err => console.error(err));
            };

        const resetForm = () => {
            question='';
            incorrectAnswers=['','','',''];
                correctIndex=-1;
        };

        $: formValues = {question, correctAnswer, incorrectAnswers:incorrectAnswers.filter(answer => answer != correctAnswer)};
</script>

<!-- QUESTIONS DATA TABLE -->


<h1 class="text-3xl font-semibold text-gray-800 dark:text-white">
    QUESTIONS
</h1>
<div class=" w-full container mx-auto px-4 sm:px-8 ">
    <div class="py-8">
        <div class="flex flex-row mb-1 sm:mb-0 justify-between w-full">
            <h1 class="text-3xl font-semibold text-gray-800 dark:text-white"></h1>
            <div class="text-end">
                <div class="flex w-full max-w-sm space-x-3">
                  <button onclick="document.getElementById('myModal').showModal()" on:click={() => handleQuestionClick('ADD')} class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="15" height="15" >
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                {#each qHeaders as qH}
                                <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                    { qH }
                                </th>
                                {/each}

                                <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {#if questions.length !== 0}
                            {#each questions as q, i}

                            <tr>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap"> { i } </p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">{ q.question }</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">{ q.correctAnswer }</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">{ q.incorrectAnswers }</p>
                                </td>
                                <td class=" px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <a onclick="document.getElementById('myModal').showModal()"  class="cursor-pointer text-indigo-600 hover:text-indigo-900" on:click={() => handleQuestionClick('EDIT',[q, i])}>
                                        <svg width="17" height="17" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </a>
                                    <a class="cursor-pointer text-indigo-600 hover:text-indigo-900" on:click={() => handleQuestionClick('DELETE', i)}>
                                        <svg width="17" height="17" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </td>
                            </tr>
                            {/each}

                            {/if}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

<dialog id="myModal" class="h-auto w-11/12 md:w-1/2 p-5  bg-white rounded-md ">

   <div class="flex flex-col w-full h-auto ">
        <!-- Header -->
        <div class="flex w-full h-auto justify-center items-center">
          <div class="flex w-10/12 h-auto py-3 justify-center items-center text-2xl font-bold">
                Questions
          </div>
          <div onclick="document.getElementById('myModal').close();" class="flex w-1/12 h-auto justify-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </div>
          <!--Header End-->
        </div>
          <!-- Modal Content-->
    <div class="bg-gray-100 dark:bg-gray-800 mt-5 md:mt-0 md:col-span-2">
        <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">

                    <div class="col-span-6 sm:col-span-6">
                        <label class="block text-sm font-medium text-gray-700" >
                            Question
                        </label >
                        <input
                            type="text"
                            bind:value={question}
                            class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent " />
                    </div>


                    {#each incorrectAnswers as incAns, i}
                    <div class="col-span-4 sm:col-span-4">
                        <label class="block text-sm font-medium text-gray-700" >
                            Answer
                        </label >
                        <input
                            type="text"
                            bind:value={incAns}
                            class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent " />
                    </div>

                    <div class="col-span-2 sm:col-span-2">
                        <label class="block text-sm font-medium text-gray-700">
                                Correct Answer
                        </label>
                        <input type="radio" bind:group={correctIndex} value={i} class="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"/>
                    </div>
                    {/each}

                </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button on:click={handleCTA} class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" >
                    {questionFormState === 'ADD' ? 'ADD' : 'UPDATE'}
                </button>
            </div>
        </div>
</div>


        </div>
</dialog>

<style>
  dialog[open] {
  animation: appear .15s cubic-bezier(0, 1.8, 1, 1.8);
}

  dialog::backdrop {
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(54, 54, 54, 0.5));
    backdrop-filter: blur(3px);
  }


@keyframes appear {
  from {
    opacity: 0;
    transform: translateX(-3rem);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
