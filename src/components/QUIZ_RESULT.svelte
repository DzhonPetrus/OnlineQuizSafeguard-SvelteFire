<script>
    import { humanizedFBDateTime } from '../util/helper.js';
    import  { quizAttempt } from '../util/store.js';

    export let userProfile;
    export let selectedQuiz;


    console.log($quizAttempt);
</script>

<div class="w-full bg-white p-12 mt-16 shadow-2xl rounded my-24 ">
  <div class="flex justify-between container mx-auto">
    <div class="w-full lg:w-8/12">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold text-gray-700 md:text-2xl">{selectedQuiz.title}</h1>
      </div>
        <h1 class="mb-6 text-xl font-bold text-gray-700 md:text-2xl">
          Score: { $quizAttempt.score }
        </h1>

        <h1 class="text-xl font-bold text-gray-700 md:text-xl">Activity Log</h1>
    {#each $quizAttempt.quizLog as log, i}
      <div class="mt-6">
          <div class="max-w-4xl px-10 py-6 rounded-lg shadow-md {log.event==='Defocused' ? 'bg-red-400' : 'bg-green-400'}">
            <div class="mt-2">
              <a class="text-2xl text-gray-700 font-bold hover:underline ">{log.event}</a>

                   <div class="col-span-2 sm:col-span-2">
                     <label class="block text-sm font-medium text-gray-700">
                       { log.description }
                     </label>
                    </div>

              </div>
          </div>
      </div>
    {/each}
  </div>
</div>

</div>
