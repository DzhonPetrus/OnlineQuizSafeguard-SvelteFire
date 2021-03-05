<script>
    import { Doc } from "sveltefire";

    import { url, isActive } from "@sveltech/routify";
    import { currentUser, currentUserProfile } from '../util/store.js';
    import { checkEmptyArray } from '../util/helper.js';

    export let auth;
    export let user;
    $:currentUser.set(user);

    import ToggleDarkMode from './ToggleDarkMode.svelte';

    let hideMenuDropdown = true;
    let hideUserDropdown = true;

    let links = [
            ["./index", 'Home'],
            ["./quizzes", 'Quizzes'],
        ];
    let linksUser = [
            [`./user`, 'Account'],
            ["./settings", 'Settings'],
            [`./user/quizzes/${user.email}`, 'My Quizzes'],
        ];
</script>
<Doc path={`userProfiles/${user.email}`} let:data={userProfile} on:data={e => currentUserProfile.set(e.detail.data)} >

<div>
    <nav class="z-50 bg-white dark:bg-gray-600  shadow ">
        <div class="max-w-7xl mx-auto px-8">
            <div class="flex items-center justify-between h-16">
                <div class=" flex items-center">
                    <a  class="flex-shrink-0" href="/">
                        <img class="h-8 w-8" src="/favicon.png" alt="OnlineQuizSafeguard"/>
                    </a>
                    <div  class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            {#each links as [path, name] }
                                <a href={$url(path)} class="{$isActive(path) ? 'text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-300'} hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-lg font-medium" >
                                    {name}
                                </a>
                            {/each}
                        </div>
                    </div>
                </div>
                <div class="block">
                    <div class="ml-4 flex items-center md:ml-6">
                                <div>
                                    <ToggleDarkMode />
                                </div>
                        <div class="ml-3 relative">
                            <div class="relative inline-block text-left">
                                <div>
                                    <button on:click={() => hideUserDropdown = !hideUserDropdown} type="button" class="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500" id="options-menu">
                                        <img class="h-8 w-8 rounded-full" src={userProfile.photoURL} alt="Avatar">
                                    </button>
                                </div>
                                <div hidden={hideUserDropdown} class="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                                    <div class="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    {#each linksUser as [path, name] }
                                        <a on:click={() => hideUserDropdown = true} href={$url(path)} class="{$isActive(path) ? 'text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-300'} block block px-4 py-2 text-md hover:bg-gray-100 hover:text-gray-900 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                                            <span class="flex flex-col">
                                                <span>
                                                    {name}
                                                </span>
                                            </span>
                                        </a>
                                        {/each}
                                        <a on:click={() => auth.signOut()} class="cursor-pointer block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                                            <span class="flex flex-col">
                                                <span>
                                                    Logout
                                                </span>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="-mr-2 flex md:hidden">
                    <button on:click={() => hideMenuDropdown = !hideMenuDropdown} class="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                        <svg width="20" height="20" fill="currentColor" class="h-8 w-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="md:hidden">
            <div  hidden={hideMenuDropdown} class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {#each links as [path, name] }
                    <a on:click={() => hideMenuDropdown = true} href={$url(path)} class="{$isActive(path) ? 'text-gray-800 dark:text-white' : 'text-gray-400 dark:text-gray-400'} hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-lg font-medium" >
                        {name}
                    </a>
                {/each}
            </div>
        </div>
    </nav>
</div>
</Doc>
