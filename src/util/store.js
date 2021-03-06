import { writable } from 'svelte/store';

export let isDarkMode = writable(false);


export let currentUser = writable();
export let currentUserProfile = writable([]);

export let selectedQuizId = writable();
export let selectedQuestionnaireId = writable();


export let quizAttempt = writable([]);
export let faceDetected = writable(0);
