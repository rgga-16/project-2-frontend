<script>
	import { onMount } from 'svelte';
    import {setCookie, getCookie, pause} from './utils.js';

	import FeedbackSelector from './components/FeedbackSelector.svelte';
	import FeedbackList from './components/FeedbackList.svelte';
    import LoadingBar from './components/LoadingBar.svelte';

    import { register, init, t, addMessages, locale } from 'svelte-i18n';
    import en from "./locales/en.json";
    import ja from "./locales/ja.json";
    import { writable } from 'svelte/store';

    addMessages("en", en)
    addMessages("ja", ja)
    

    init({
        fallbackLocale: 'en',
        initialLocale: 'en',
    });

    let currentLocale = writable($locale);
    // Subscribe to the locale store to keep `currentLocale` in sync
    locale.subscribe(value => {
        currentLocale.set(value);
    });

    // Update the locale whenever `currentLocale` changes
    $: locale.set($currentLocale);

	let currentStep = 0;
	let steps=3;
    let uname = "";
    let uID="";
    let is_loading = false;
    let progress = 0;
    let load_status = "Initializing...";

    let left_display_styles={
        0:"grid",
        1:"grid",
    };

	let recording={};
	

    let feedback_list=[];

    let documents = [];

    let chatbot_messages = [{
        "content": "You are an expert senior interior designer who is tasked to assist less experienced interior designers like students and junior interior designers with their work by answering their questions on a wide range of interior design topics. ",
        "role": "system"
    }];

    let my_notes = [];
    let feedback_notes = {};

    function setLanguage(lang) {
        locale.set(lang);
    }


    async function register_user() {
        if(uname == null || uname == "") {
            const message = $t('Please_enter_a_valid_username');
            alert(message);
            throw new Error('Please enter a valid username');
        }

        let username_response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: uname})
        });

        const data = await username_response.json();
        if(!username_response.ok) {
            alert(data.message);
        } else if (username_response.ok) {
            uID = data.user_id;
            setCookie("username", uname, 30);
            setCookie("user_id", uID, 30);

            progress=50;
            load_status = $t('Loading documents...');
            documents = await fetch("/get_documents", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(r => r.json()).then(r => r.documents);

            progress=100;
            load_status = $t('Done!');
            pause(1500);

            currentStep=1;
        }
    }

    async function login() {
        if(uname == null || uname == "") {
            const message = $t('Please_enter_a_valid_username');
            alert(message);
            throw new Error('Please enter a valid username');
        }

        let username_response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: uname})
        });

        const data = await username_response.json();
        if(!username_response.ok) {
            alert(data.message);
            return;
        } else if (username_response.ok) {
            uID = data.user_id;
            setCookie("username", uname, 30);
            setCookie("user_id", uID, 30);
            
            await loadFiles(uID);
            currentStep=1;
        }
    }

    function logout() {
        setCookie("username", "", 0);
        setCookie("user_id", "", 0);

        
        uname = "";
        uID = "";
        recording = {};
        my_notes = [];
        feedback_notes = {};
        feedback_list = [];
        documents = [];
        feedback_list = [];
        chatbot_messages = [{
            "content": "You are an expert senior interior designer who is tasked to assist less experienced interior designers like students and junior interior designers with their work by answering their questions on a wide range of interior design topics. ",
            "role": "system"
        }];
        currentStep = 0;
    }

    async function loadFiles(user_id) {

        progress = 15;
        load_status = $t('Loading documents');
        
        documents = await fetch("/get_documents", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(r => r.json()).then(r => r.documents);

        if (Object.keys(recording).length <= 0) {
            progress = 30;
            load_status = $t('Loading recording');
            let recording_response = await fetch("/get_recording", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let recording_json = await recording_response.json();
            recording = recording_json["recording"];

            if("video_path" in recording && recording["video_path"] != null) { 
                progress = 45;
                load_status = $t('Loading video');
                const vidsrc_response = await fetch("/fetch_video", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({path: recording["video_path"]})
                });
                if(!vidsrc_response.ok) {
                    throw new Error('Failed to fetch video');
                }
                const vidblob = await vidsrc_response.blob();
                recording["video"] = URL.createObjectURL(vidblob);
            }

            if("audio_path" in recording && recording["audio_path"] != null) {
                progress=50;
                load_status = $t('Loading audio');
                const audiosrc_response = await fetch("/fetch_audio", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({audio_path: recording["audio_path"]})
                });
                if(!audiosrc_response.ok) {
                    throw new Error('Failed to fetch audio');
                }
                const audioblob = await audiosrc_response.blob();
                recording["audio"] = URL.createObjectURL(audioblob);
            }

            progress = 60;
            load_status = $t('Loading feedback');
            
            const feedback_list_response = await fetch("/get_feedback_list", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!feedback_list_response.ok) {
                throw new Error('Failed to fetch feedback list');
            }
            const feedback_list_json = await feedback_list_response.json();
            feedback_list = feedback_list_json["feedback_list"];

            progress=70;
            load_status = $t('Loading chatbot messages');
            
            const display_chatbot_messages_response = await fetch("/get_display_chatbot_messages", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!display_chatbot_messages_response.ok) {
                throw new Error('Failed to fetch chatbot messages');
            }
            const display_chatbot_messages_json = await display_chatbot_messages_response.json();
            chatbot_messages = display_chatbot_messages_json["display_chatbot_messages"];

            for (let message of chatbot_messages) {
                if("image_path" in message && message["image_path"] != null) {
                    const imgsrc_response = await fetch("/fetch_image", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({image_path: message["image_path"]})
                    });
                    if(!imgsrc_response.ok) {
                        throw new Error('Failed to fetch image');
                    }
                    const imgblob = await imgsrc_response.blob();
                    message["image"] = URL.createObjectURL(imgblob);
                }
            }

            progress = 80;
            load_status = $t('Loading notes');
            const my_notes_response = await fetch("/get_my_notes", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!my_notes_response.ok) {
                throw new Error('Failed to fetch my notes');
            }
            const my_notes_json = await my_notes_response.json();
            my_notes = my_notes_json["my_notes"];

            const feedback_notes_response = await fetch("/get_feedback_notes", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!feedback_notes_response.ok) {
                throw new Error('Failed to fetch feedback notes');
            }
            const feedback_notes_json = await feedback_notes_response.json();
            feedback_notes = feedback_notes_json["feedback_notes"];

            progress = 100;
            load_status = $t('Done!');
            pause(1500);

            
        }
            

    }

    onMount(async () => {
        // uname = getCookie("username");
        // uID = getCookie("user_id");
        // if(uname != null && uname != "") {
        //     await loadFiles(uID);
        //     currentStep=1;
        // }
    });
</script>

<style>
    .header {
        height: 5%;
        justify-content: flex-end;
        align-items: center;
    }
	.carousel-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 90%;
	}

	.navigation {
		height: 5%;
	}

	button {
		margin: 0 10px;
	}
</style>

<main>
    <div class:bordered={currentStep>0} class="header row padded"> 
        <h5 class:gone={currentStep==0}> {$t('Welcome', {values: {username: uname}})}</h5> 
        <div class="row">
            <button class="action-button" on:click={() => setLanguage('en')}>
                <img src="./logos/usa.png" alt="United Kingdom flag" class="mini-icon">
            </button>
            <button class="action-button" on:click={() => setLanguage('ja')}>
                <img src="./logos/jp.png" alt="Japan flag" class="mini-icon">
            </button>
        </div>
        <button class:gone={currentStep==0} on:click={() => logout()} class="row mini-padded">
            {$t('Logout')}
        </button>
    </div>
	<div class="carousel-container">
            

            {#if currentStep === 0}
                <div class="centered spaced" class:gone={currentStep != 0} style="width: 100%; height: 100%;">

                    <div class="overlay centered padded" class:invisible={is_loading===false}> 
                        <LoadingBar bind:progress={progress} bind:status={load_status} />
                    </div>


                    <div class="column centered spaced" style="width: 75%; height: 75%;">
                        <label for="username"> {$t('Enter your username')} </label>
                        <input type="text" name="username" id="username" bind:value={uname}>
                        <div class="row">
                            <button on:click={async() => {
                                is_loading = true;
                                await register_user();
                                is_loading = false;
                                progress=0;
                            }}> 
                                {$t('Register')}
                            </button>

                            <button on:click={async() => {
                                is_loading = true;
                                await login();
                                is_loading = false;
                                progress=0;
                            }}> 
                                {$t('Login')}
                            </button>
                        </div>

                    </div>
                </div>

            {:else if currentStep ===1}
                <div class:gone={currentStep != 1} style="width: 100%; height: 100%; background-color: #F8F9FA;">
                    <FeedbackSelector bind:recording={recording} bind:feedback_list={feedback_list} bind:currentLocale={$currentLocale}/>
                </div>
            {:else if currentStep ===2}
                <div class:gone={currentStep != 2} style="width: 100%; height: 100%; background-color: #F8F9FA;"> 
                    <FeedbackList 
                    bind:chatbot_messages={chatbot_messages} 
                    bind:documents={documents} 
                    bind:feedback_list={feedback_list} 
                    bind:recording={recording}
                    bind:my_notes={my_notes}
                    bind:feedback_notes={feedback_notes}
                    bind:left_display_styles={left_display_styles}
                    bind:currentLocale={$currentLocale}/>
                </div>
            {/if}

            
	</div>
	<div class="navigation centered spaced bordered row">
			<button class:invisible={currentStep !=2 || currentStep==0 } class="action-button row centered" on:click={() => {currentStep=1}} disabled={currentStep === 0}>
                <img src="./logos/move-to-the-prev-page-symbol-svgrepo-com.svg" alt="Previous page" class="mini-icon">
                {$t('Previous Page')}
            </button>

            <button class:invisible={currentStep !=1 || currentStep==0 } class="action-button row centered" on:click={() => {currentStep=2}} disabled={currentStep === steps.length - 1 || feedback_list.length <=0}>
                {$t('Next Page')}
                <img src="./logos/move-to-the-next-page-symbol-svgrepo-com.svg" alt="Next page" class="mini-icon">
            </button>
	</div>
</main>

