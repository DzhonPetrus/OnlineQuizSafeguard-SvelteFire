<script>
    import { humanizedFBDateTime } from '../../../util/helper.js';

    import firebase from "firebase/app";
    const db = firebase.firestore();
  import { Doc, Collection } from "sveltefire";
  import { currentUser, currentUserProfile } from '../../../util/store.js';
  import QUIZ_FORM from '../../../components/QUIZ_FORM.svelte';

  import { Stretch } from "svelte-loading-spinners";


    /* TODO FILTERING */
    export let quizEmail;
   let quizzesQuery = ref => ref.where('email','==',quizEmail).orderBy('createdAt', 'desc').limit(10);

    let myQuizzesState;
    let selectedQuiz;

      const handleMyQuiz = (quiz) => {
              selectedQuiz = quiz;
              myQuizzesState = 'EDIT';
          };
</script>

<div class="w-full bg-white p-12 mt-16 shadow-2xl rounded my-24 ">
{#if myQuizzesState === 'ADD'}
    <QUIZ_FORM />
{:else if myQuizzesState === 'EDIT'}
    <QUIZ_FORM {selectedQuiz}/>
{:else}

    <div class="header flex items-end justify-between mb-12">
        <div class="title">
            <p class="text-4xl font-bold text-gray-800 mb-4">
                My Quizzes
            </p>
            <p class="text-2xl font-light text-gray-400">
                All Created quizzes
            </p>
        </div>
        <div class="text-end">

            <div class="flex w-full max-w-sm space-x-3">

                    <!--
                <div class=" relative ">

                    <input type="text" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Enter a title"/>
                    </div>
                    <button class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">
                        Search
                    </button>

    -->
                    <button on:click={() => myQuizzesState = 'ADD'} class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">
                        Create Quiz
                    </button>
                </div>

            </div>
        </div>


        <Collection path={`quizzes/`} query={quizzesQuery} let:data={quizzes} let:ref={quizzesRef}>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">


    {#each quizzes as quiz}

        <!--
        USED FOR PRE POPULATION OF QUESTIONNAIRES
        <Collection path={`questionnaires/`} let:ref={questionnairesRef} log}>
            {questionnairesRef.add({quizzesId:quiz.id, createdAt: serverTimestamp()})}
        </Collection>
        -->

            <div class="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
                <a on:click={handleMyQuiz(quiz)} class="cursor-pointer w-full block h-full">
                    <img alt="quiz photo" src="{quiz.photoURL}" class="max-h-40 w-full object-cover"/>
                    <div class="bg-white dark:bg-gray-800 w-full p-4">

                        <!--
                        <p class="text-indigo-500 text-md font-medium">
                            Video
                        </p>
                        -->

                        <p class="text-gray-800 dark:text-white text-xl font-medium mb-2">
                            {quiz.title}
                        </p>
                        <p class="text-gray-400 dark:text-gray-300 font-light text-md">
                            {quiz.description}
                        </p>
                        <div class="flex items-center mt-4">
                            <a class="block relative">
                                <img alt="profil" src="{$currentUserProfile.photoURL}" class="mx-auto object-cover rounded-full h-10 w-10 "/>
                            </a>
                            <div class="flex flex-col justify-between ml-4 text-sm">
                                <p class="text-gray-800 dark:text-white">
                                    {$currentUserProfile.fullName}
                                </p>
                                <p class="text-gray-400 dark:text-gray-300">
                                    {humanizedFBDateTime(quiz.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
    {/each}

        </div>


  <span slot="loading">
    <div class="flex items-center justify-center w-full mt-8">
        <Stretch size="60" color="#FF3E00" unit="px" duration="1s" />
      </div>
    </span>

    <span slot="fallback">
      NO QUIZZES AVAILABLE
    </span>


</Collection>

{/if}
</div>
