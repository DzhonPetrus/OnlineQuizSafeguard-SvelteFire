<script>
  import FaceDetection from '../../components/FaceDetection.svelte';
  import {humanizedFBDateTime} from '../../util/helper.js';
  import { faceDetected, currentUserProfile } from '../../util/store.js';

  import { goto } from '@sveltech/routify';
  export let quizId;

  import { Doc } from "sveltefire";

  import QUIZ_TAKE from '../../components/QUIZ_TAKE.svelte';
  import QUIZ_RESULT from '../../components/QUIZ_RESULT.svelte';

  import { Stretch } from "svelte-loading-spinners";

    /* TODO SHOW OTHER PEOPLE PROFILE */

  const takeQuiz = (quiz) => {
      quizState = 'ATTEMPT';
      selectedQuiz = quiz;
    };

    let quizState = 'READ';
    let selectedQuiz = [];
    let userProfile = [];

    const handleUserProfile = (data) => {
        if(data.email === $currentUserProfile.email)
          $goto(`/user/quizzes/${$currentUserProfile.email}`);
      };
</script>

{#if quizState === 'READ'}
<Doc path={`quizzes/${quizId}`} let:data={quiz} >
  <Doc path={`userProfiles/${quiz.email}`} let:data={userProfile} on:data={e => handleUserProfile(e.detail.data)}>
<div class='flex max-w-xl my-10 bg-white shadow-md rounded-lg overflow-hidden mx-auto'>

        <div class='flex items-center w-full'>

            <div class='w-full'>

                <div class="flex flex-row mt-2 px-2 py-3 mx-3">

                  <div on:click={() => $goto(`/user/${userProfile.email}`)} class="w-auto h-auto rounded-full border-2 border-purple-500">

                      <img class='w-12 h-12 object-cover rounded-full shadow cursor-pointer' alt='User avatar' src="{userProfile.photoURL}">

                    </div>

                    <div class="flex flex-col mb-2 ml-4 mt-1">

                      <div class='text-gray-600 text-sm font-semibold'>{userProfile.fullName}</div>

                        <div class='flex w-full mt-1'>


                            <div class='text-gray-400 font-thin text-xs'>
                              {humanizedFBDateTime(quiz.createdAt)}
                            </div>

                        </div>

                    </div>

                </div>

                <div class="border-b border-gray-100"></div>

                <div class='text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2'><img class="rounded" src="{quiz.photoURL}"></div>

                <div class='text-gray-600 font-semibold text-lg mb-2 mx-3 px-2'>{quiz.title}</div>

                <div class='text-gray-500 font-thin text-sm mb-2 mx-3 px-2'>{quiz.description}</div>
                <div class='text-gray-500 font-thin text-sm mb-2 mx-3 px-2'>No of Items: {quiz.noOfItems}</div>
                <div class='text-gray-500 font-thin text-sm mb-6 mx-3 px-2'>Duration: {quiz.duration} min</div>



                <div class="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">

                  <span class='w-10 h-10 object-cover '></span>

                    <span class="absolute inset-y-0 right-0 flex items-center pr-6">
                      <button on:click={() => takeQuiz({...quiz, quizId})} class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" >
                          Take Quiz
                      </button>
                    </span>

                </div>

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
</Doc>

{:else if quizState === 'ATTEMPT'}
  {#if $faceDetected === 0}
    <FaceDetection />
  {:else}
    <QUIZ_TAKE {selectedQuiz} bind:quizState/>
  {/if}

{:else}
  <QUIZ_RESULT {selectedQuiz} {userProfile}/>

{/if}
