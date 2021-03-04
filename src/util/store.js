import { writable } from 'svelte/store';

export let isDarkMode = writable(false);


export let currentUser = writable();
export let currentUserProfile = writable([]);
