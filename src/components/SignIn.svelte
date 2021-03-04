<script>
    import ToggleDarkMode from './ToggleDarkMode.svelte';
    import SignUp from './SignUp.svelte';

    import firebase from 'firebase/app';
    const db = firebase.firestore();

    import { notifier } from '@beyonk/svelte-notifications';
    import Form from '@svelteschool/svelte-forms';
    let values;

    export let auth;

    let formState = 'LOGIN';

    function signIn(){
        let {email,password} = values;
        // TODO VALIDATE DATA
            /* password 6 characters minimum */

            auth.signInWithEmailAndPassword(email, password)
                .then(() => notifier.success('User Signed In successfully'))
                .catch(error => console.log(error.code, error.message));
    }

    function signInGoogle(){
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(result => {
                    notifier.success('User Signed In successfully');

                    /* GENERATE USER PROFILE IF USER DOESN'T HAVE USER PROFILE */
                    const {email, photoURL, displayName, metadata, uid} = result.user;
                    const newUserProfile = {email, photoURL, fullName:displayName, createdAt:metadata.creationTime, uid, bio:'', website:'', location:''};
                     db.collection("userProfiles").doc(email).get().then(doc => {
                    if(!doc.exists)
                        db.collection("userProfiles").doc(email).set(newUserProfile).then(() => notifier.success('User Profile created successfully')).catch(error => console.log(error.code, error.message));
                    });
            })
            .catch(error => console.error(error.code, error.message));
    }

    function signUp(credential){
            let {email, password} = credential.detail;

            /* USER SIGN UP */
            auth.createUserWithEmailAndPassword(email, password)
                .then((credentials) => {
                        let { email, uid, metadata } = credentials.user;
                    const newUserProfile = {email, photoURL: 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png', fullName:'', createdAt:metadata.creationTime, uid, bio:'', website:'', location:''};
                    notifier.success('Account created successfully')

                    /* GENERATING USER PROFILE */
                    db.collection("userProfiles").doc(email).set(newUserProfile)
                        .then(() => notifier.success('User Profile created successfully'))
                        .catch(error => console.error(error.code, error.message));
                })
                .catch(error => console.error(error.code, error.message));
    }
</script>

<ToggleDarkMode />

{#if formState==='LOGIN'}

<div class="flex items-center justify-center w-full mb-12 mt-4">
    <div class="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-600 sm:px-6 md:px-8 lg:px-10">
        <div class="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
            Sign In To Your Account
        </div>

        <div>
            <a href="#" class="flex items-center justify-center mt-4 text-gray-600 rounded-lg shadow-md dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                <div class="px-4 py-3">
                    <svg class="w-6 h-6" viewBox="0 0 40 40">
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107"/>
                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00"/>
                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50"/>
                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2"/>
                    </svg>
                </div>

                <span on:click={signInGoogle} class="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
            </a>
            <br>

            <Form bind:values>

                <div class="flex flex-col mb-2">
                    <div class="flex relative ">
                        <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clip-rule="evenodd" />
                            </svg>
                        </span>
                        <input required name="email" type="email" class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your email"/>
                        </div>
                    </div>
                    <div class="flex flex-col mb-6">
                        <div class="flex relative ">
                            <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                                </svg>
                            </span>
                            <input required name="password" type="password" class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your password"/>
                            </div>
                        </div>
                        <div class="flex items-center mb-12 -mt-4">

                        </div>
                        <div class="flex w-full">
                            <button on:click|preventDefault={signIn} class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Sign In
                            </button>
                        </div>
            </Form>


                </div>
                <div class="cursor-pointer flex items-center justify-center mt-6">
                    <a on:click={() => formState = 'REGISTER'} class="cursor-pointer inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white">
                        <span class="ml-2">
                            You don&#x27;t have an account?
                        </span>
                    </a>
                </div>
            </div>
    </div>
{:else}
    <SignUp on:signUpGoogle={signInGoogle} on:signUp={signUp} on:changeState={() => formState='LOGIN'}/>
{/if}


<pre>{JSON.stringify(values, undefined, 1)}</pre>
