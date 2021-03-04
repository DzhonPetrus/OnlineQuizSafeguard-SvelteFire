<script>
    import {isDarkMode} from '../util/store.js';
    $: $isDarkMode
        ? document.body.classList.add("dark")
        : document.body.classList.remove("dark");

</script>

<div class="flex items-center justify-center w-full mb-12 mt-4">
            <div class="mr-3 text-gray-700 font-medium">
                {@html !$isDarkMode ? `<svg width="32" height="32" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 2a1.4 1.4 0 011.4 1.4v1.4a1.4 1.4 0 11-2.8 0V3.4A1.4 1.4 0 0116 2zM6.1 6.1a1.4 1.4 0 011.98 0l.99.99a1.4 1.4 0 11-1.98 1.98l-.99-.99a1.4 1.4 0 010-1.98zm19.8 0a1.4 1.4 0 010 1.98l-.99.99a1.4 1.4 0 01-1.98-1.98l.99-.99a1.4 1.4 0 011.98 0zM9 16a7 7 0 1114 0 7 7 0 01-14 0zm-7 0a1.4 1.4 0 011.4-1.4h1.4a1.4 1.4 0 110 2.8H3.4A1.4 1.4 0 012 16zm23.8 0a1.4 1.4 0 011.4-1.4h1.4a1.4 1.4 0 110 2.8h-1.4a1.4 1.4 0 01-1.4-1.4zm-2.87 6.93a1.4 1.4 0 011.98 0l.99.99a1.4 1.4 0 01-1.98 1.98l-.99-.99a1.4 1.4 0 010-1.98zm-15.84 0a1.4 1.4 0 011.98 1.98l-.99.99a1.4 1.4 0 01-1.98-1.98l.99-.99zM16 25.8a1.4 1.4 0 011.4 1.4v1.4a1.4 1.4 0 11-2.8 0v-1.4a1.4 1.4 0 011.4-1.4z" fill="url(#paint0_linear)"></path><defs><linearGradient id="paint0_linear" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse"><stop class="transition-all duration-200" stop-color="#FACC15"></stop><stop class="transition-all duration-200" offset="1" stop-color="#FA9D16"></stop></linearGradient></defs></svg>` : `<svg width="32" height="32" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 2a1.4 1.4 0 011.4 1.4v1.4a1.4 1.4 0 11-2.8 0V3.4A1.4 1.4 0 0116 2zM6.1 6.1a1.4 1.4 0 011.98 0l.99.99a1.4 1.4 0 11-1.98 1.98l-.99-.99a1.4 1.4 0 010-1.98zm19.8 0a1.4 1.4 0 010 1.98l-.99.99a1.4 1.4 0 01-1.98-1.98l.99-.99a1.4 1.4 0 011.98 0zM9 16a7 7 0 1114 0 7 7 0 01-14 0zm-7 0a1.4 1.4 0 011.4-1.4h1.4a1.4 1.4 0 110 2.8H3.4A1.4 1.4 0 012 16zm23.8 0a1.4 1.4 0 011.4-1.4h1.4a1.4 1.4 0 110 2.8h-1.4a1.4 1.4 0 01-1.4-1.4zm-2.87 6.93a1.4 1.4 0 011.98 0l.99.99a1.4 1.4 0 01-1.98 1.98l-.99-.99a1.4 1.4 0 010-1.98zm-15.84 0a1.4 1.4 0 011.98 1.98l-.99.99a1.4 1.4 0 01-1.98-1.98l.99-.99zM16 25.8a1.4 1.4 0 011.4 1.4v1.4a1.4 1.4 0 11-2.8 0v-1.4a1.4 1.4 0 011.4-1.4z" fill="url(#paint0_linear)"></path><defs><linearGradient id="paint0_linear" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse"><stop class="transition-all duration-200" stop-color="#d4d4d8"></stop><stop class="transition-all duration-200" offset="1" stop-color="#d4d4d8"></stop></linearGradient></defs></svg>`}
            </div>
            <!-- Toggle Button -->
            <label for="toogleA" class="flex items-center cursor-pointer">
                <!-- toggle -->
                <div class="relative">
                    <!-- input -->
                    <input bind:checked={$isDarkMode} id="toogleA" type="checkbox" class="hidden" />
                    <!-- line -->
                    <div
                        class="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"
                    />
                    <!-- dot -->
                    <div
                        class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"
                    />
                </div>
                <!-- label -->

                <div class="ml-3 text-gray-700 font-medium">
                    {@html !$isDarkMode ? `<svg width="24" height="24" fill="currentColor" class="transition-colors duration-200 text-gray-300"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.353 2.939a1 1 0 01.22 1.08 8 8 0 0010.408 10.408 1 1 0 011.301 1.3A10.003 10.003 0 0112 22C6.477 22 2 17.523 2 12c0-4.207 2.598-7.805 6.273-9.282a1 1 0 011.08.22z"></path></svg>` : `<svg width="24" height="24" fill="currentColor" class="transition-colors duration-200 text-gray-900"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.353 2.939a1 1 0 01.22 1.08 8 8 0 0010.408 10.408 1 1 0 011.301 1.3A10.003 10.003 0 0112 22C6.477 22 2 17.523 2 12c0-4.207 2.598-7.805 6.273-9.282a1 1 0 011.08.22z"></path></svg>`}
                </div>
            </label>
        </div>


<style>
    .toggle__dot {
        top: -0.25rem;
        left: -0.25rem;
        transition: all 0.3s ease-in-out;
    }
    input:checked ~ .toggle__dot {
        transform: translateX(100%);
        background-color: #48bb78;
    }
</style>
