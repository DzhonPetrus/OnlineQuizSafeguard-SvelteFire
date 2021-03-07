<script>
    import { humanizedFBDateTime } from '../util/helper.js';
    import  { quizAttempt } from '../util/store.js';

    export let userProfile;
    export let selectedQuiz;

</script>

<div class="w-full bg-white p-12 mt-16 shadow-2xl rounded my-24 ">
  <div class="flex justify-between container mx-auto">
    <div class="w-full lg:w-8/12">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold text-gray-700 md:text-2xl">{selectedQuiz.title}</h1>
      </div>
        <p class="text-gray-800 dark:text-white">
            Attempted
            {humanizedFBDateTime($quizAttempt.createdAt)}
        </p>
        <h1 class="mb-6 text-xl font-bold text-gray-700 md:text-2xl">
          Score: { $quizAttempt.score }
        </h1>




        <h1 class="text-xl font-bold text-gray-700 md:text-2xl">ACTIVITY LOG</h1>
        <div class="relative wrap overflow-hidden p-10 h-full">
          <div class="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style="left: 50%"></div>

          {#each $quizAttempt.quizLog as log, i}
          {#if (log.event==='Defocused')}
            <!-- right timeline -->

            <div class="mb-8 flex justify-between items-center w-full right-timeline">

              <div class="order-1 w-5/12"></div>

              <div class="z-20 flex items-center order-1 bg-green-800 shadow-xl w-8 h-8 rounded-full">

                <h1 class="mx-auto font-semibold text-lg text-white">{ ++i }</h1>

              </div>

              <div class="order-1 bg-green-400 rounded-lg shadow-xl w-5/12 px-6 py-4">

                <h3 class="mb-3 font-bold text-gray-800 text-xl">{ log.event }</h3>

                <p class="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">{ log.description }</p>

              </div>

            </div>


          {:else}

            <!-- left timeline -->

            <div class="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">

              <div class="order-1 w-5/12"></div>

              <div class="z-20 flex items-center order-1 bg-red-800 shadow-xl w-8 h-8 rounded-full">

                <h1 class="mx-auto text-white font-semibold text-lg">{ ++i }</h1>

              </div>

              <div class="order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">

                <h3 class="mb-3 font-bold text-white text-xl">{ log.event }</h3>

                <p class="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">{ log.description }</p>

              </div>

            </div>

        {/if}

        {/each}

        </div>
      </div>

  </div>
</div>

