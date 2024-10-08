
export async function saveChatbotSettings(settings_dict) {
    const response = await fetch('/save_chatbot_settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({settings_dict: settings_dict})
    });
    if(!response.ok) {
        throw new Error('Failed to save chatbot settings');
    }

    let response_json = await response.json();
    if("message" in response_json) {
        console.log(response_json["message"]);
    }
    return response_json["message"];
}

export async function getChatbotSettings() {

    const response = await fetch('/get_chatbot_settings');
    if(!response.ok) {
        throw new Error('Failed to get chatbot settings');
    }

    let response_json = await response.json();
    return response_json;

}

export async function saveRecording(recording) {

    const response = await fetch('/save_recording', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({recording:recording})
    });
    if(!response.ok) {
        throw new Error('Failed to save recording');
    }

    let response_json = await response.json();
    if("message" in response_json) {
        console.log(response_json["message"]);
    }
    return response_json["message"];
}


export async function saveFeedbackList(feedback_list) {
    const response = await fetch("/save_feedback_list", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({feedback_list: feedback_list})
    });
    if(!response.ok) {
        throw new Error("Failed to save feedback list");
    }

    let response_json = await response.json();
    if("message" in response_json) {
        console.log(response_json["message"]);
    }

    return response_json["message"];
}

export async function saveDisplayChatbotMessages(display_chatbot_messages) {
    const response = await fetch("/save_display_chatbot_messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({display_chatbot_messages: display_chatbot_messages})
    });
    if(!response.ok) {
        throw new Error("Failed to save display chatbot messages");
    }

    let response_json = await response.json();
    if("message" in response_json) {
        console.log(response_json["message"]);
    }

    return response_json["message"];
}

export async function saveMyNotes(my_notes) {
    const response = await fetch("/save_my_notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({my_notes: my_notes})
    });
    if(!response.ok) {
        throw new Error("Failed to save my notes");
    }

    let response_json = await response.json();
    if("message" in response_json) {
        console.log(response_json["message"]);
    }

    return response_json["message"];
}

export async function saveMyFeedbackNotes(feedback_notes) {
    const response = await fetch("/save_feedback_notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({feedback_notes: feedback_notes})
    });
    if(!response.ok) {
        throw new Error("Failed to save my feedback notes");
    }

    let response_json = await response.json();
    if("message" in response_json) {
        console.log(response_json["message"]);
    }

    return response_json["message"];
}
