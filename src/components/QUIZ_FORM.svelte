<script>
    import QUESTION_FORM from '../components/QUESTION_FORM.svelte'
    const { serverTimestamp } = firebase.firestore.FieldValue;

    import firebase from 'firebase/app';
    const db = firebase.firestore();

    import { notifier } from '@beyonk/svelte-notifications';
    import Form from '@svelteschool/svelte-forms';

    import { selectedQuestionnaireId, selectedQuizId, currentUser } from '../util/store.js';

    let values;
    let quizFormState='ADD';

    const handleCTA = () => {
        if(quizFormState === 'ADD'){
                values.email = $currentUser.email;
                values.createdAt = serverTimestamp();
                db.collection("quizzes").add(values)
                    .then(quizDocRef => {
                            notifier.success('Quiz successfully created.');
                            selectedQuizId.set(quizDocRef.id);
                            db.collection("questionnaires").add({quizId: quizDocRef.id, createdAt: serverTimestamp(), questions:[]})
                                .then(questionnaireDocRef => {
                                        selectedQuestionnaireId.set(questionnaireDocRef.id);
                                        values.questionnaireId = questionnaireDocRef.id;

                                        db.collection("quizzes").doc($selectedQuizId).set(values);
                                        quizFormState='UPDATE';
                                    }).catch(err => console.error(err));
                        }).catch(err => console.error(err));
            }

            if(quizFormState === 'UPDATE'){
                values.email = $currentUser.email;
                    db.collection('quizzes').doc($selectedQuizId).set(values)
                        .then(() => notifier.success('Quiz successfully updated.'))
                        .catch(err => console.error(err));
            }
    };
    $:console.log($selectedQuestionnaireId);
    $:console.log($selectedQuizId);
</script>



<h1 class="text-3xl font-semibold text-gray-800 dark:text-white">
    QUIZ
</h1>
<div class="bg-gray-100 dark:bg-gray-800 mt-5 md:mt-0 md:col-span-2">
        <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">

                <Form bind:values>
                <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-6">
                        <label class="block text-sm font-medium text-gray-700" >
                            Quiz Title
                        </label >
                        <input
                            type="text"
                            name="title"
                            class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent " />
                    </div>

                    <div class="col-span-6 sm:col-span-6">
                        <label class="block text-sm font-medium text-gray-700" >
                            Quiz Description
                        </label >
                        <textarea
                            name="description"
                            class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent " ></textarea>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700" >
                            Number of Items
                        </label >
                        <input
                            type="number"
                            min="1"
                            name="noOfItems"
                            class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent " />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700" >
                            Duration (minutes)
                        </label >
                        <input
                            type="number"
                            min="1"
                            name="duration"
                            class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent " />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label class="block text-sm font-medium text-gray-700" >
                            PhotoURL
                        </label >
                        <input
                            type="text"
                            name="photoURL"
                            class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent " />
                    </div>
                </div>
            </Form>


            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button on:click|preventDefault={handleCTA} class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" >
                    { quizFormState }
                </button>
            </div>
        </div>
</div><br> <br>
<pre>{JSON.stringify(values, undefined, 1)}</pre>

<QUESTION_FORM />
