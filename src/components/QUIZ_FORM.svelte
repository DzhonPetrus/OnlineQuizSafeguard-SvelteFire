<script>
    import QUESTION_FORM from '../components/QUESTION_FORM.svelte'

    import firebase from 'firebase/app';
    import { UploadTask } from 'sveltefire';
    const { serverTimestamp } = firebase.firestore.FieldValue;
    const db = firebase.firestore();


    import { notifier } from '@beyonk/svelte-notifications';

    import { selectedNoOfItems, selectedQuestionnaireId, selectedQuizId, currentUser } from '../util/store.js';

    let title, description, noOfItems, duration, photoURL;
    $: formValues = {title, description, noOfItems, duration, photoURL};
    let quizFormState='ADD';

    const handleCTA = () => {
            if(quizFormState === 'ADD'){
                formValues.email = $currentUser.email;
                formValues.createdAt = serverTimestamp();
                db.collection("quizzes").add(formValues)
                    .then(quizDocRef => {
                            notifier.success('Quiz successfully created.');
                            selectedQuizId.set(quizDocRef.id);
                            db.collection("questionnaires").add({quizId: quizDocRef.id, createdAt: serverTimestamp(), questions:[]})
                                .then(questionnaireDocRef => {
                                        selectedQuestionnaireId.set(questionnaireDocRef.id);
                                        selectedNoOfItems.set(formValues.noOfItems);
                                        formValues.questionnaireId = questionnaireDocRef.id;

                                        db.collection("quizzes").doc($selectedQuizId).set(formValues);
                                        quizFormState='UPDATE';
                                    }).catch(err => console.error(err));
                        }).catch(err => console.error(err));
            }

            if(quizFormState === 'UPDATE'){
                formValues.email = $currentUser.email;
                    db.collection('quizzes').doc($selectedQuizId).update(formValues)
                        .then(() => notifier.success('Quiz successfully updated.'))
                        .catch(err => console.error(err));
            }
    };

    export let selectedQuiz;
    if(selectedQuiz !== undefined){
            quizFormState='UPDATE';

            selectedQuizId.set(selectedQuiz.id);
            selectedQuestionnaireId.set(selectedQuiz.questionnaireId);
            selectedNoOfItems.set(selectedQuiz.noOfItems);

            title = selectedQuiz.title;
            description = selectedQuiz.description;
            noOfItems = selectedQuiz.noOfItems;
            duration = selectedQuiz.duration;
            photoURL = selectedQuiz.photoURL;
        }

    let files = '';
    $:path = $currentUser.uid + '/' + filename;
    $:filename = (files[0] !== undefined) ? files[0].name : undefined;
    $:file = files[0];
    const handleURL = url => photoURL = url;

</script>



<h1 class="text-3xl font-semibold text-gray-800 dark:text-white">
    QUIZ
</h1>
<div class="bg-gray-100 dark:bg-gray-800 mt-5 md:mt-0 md:col-span-2">
        <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">

                <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-6">
                        <label class="block text-sm font-medium text-gray-700" >
                            Quiz Title
                        </label >
                        <input
                            type="text"
                            bind:value={title}
                            class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent " />
                    </div>

                    <div class="col-span-6 sm:col-span-6">
                        <label class="block text-sm font-medium text-gray-700" >
                            Quiz Description
                        </label >
                        <textarea
                            bind:value={description}
                            class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent " ></textarea>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700" >
                            Number of Items
                        </label >
                        <input
                            type="number"
                            min="1"
                            bind:value={noOfItems}
                            class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent " />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700" >
                            Duration (minutes)
                        </label >
                        <input
                            type="number"
                            min="1"
                            bind:value={duration}
                            class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent " />
                    </div>




                    <div class="col-span-6 sm:col-span-3">
{#if file && filename}
    <UploadTask {file} {path} let:task let:snapshot let:downloadURL={url} >
        {#if !photoURL}
            Uploading your file...

            Progress: {(snapshot.bytesTransferred / snapshot.totalBytes) * 100} %
        {/if}

        <div slot="complete">

                <img src={url} alt="uploaded picture">
                <span hidden>
                    {handleURL(url)}
                </span>
        </div>

        <div slot="fallback">
            Error or cancelled
        </div>

    </UploadTask>
{:else if !photoURL}
    <div>
      <label class="block text-sm font-medium text-gray-700">Photo</label>
      <div class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div class="space-y-1 text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div class="flex text-sm text-gray-600">
            <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <span>Upload a Photo</span>
              <input bind:files={files} id="file-upload" name="file-upload" type="file" class="sr-only" >
            </label>
          </div>
          <p class="text-xs text-gray-500">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
    </div>
{:else}
<span class="cursor-pointer" on:click={() => photoURL=undefined}>Update photo</span>

{/if}
                    </div>



                </div>


            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button on:click|preventDefault={handleCTA} class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" >
                    { quizFormState }
                </button>
            </div>
        </div>
</div><br> <br>

{#if quizFormState !== 'ADD'}
    <QUESTION_FORM />
{/if}
