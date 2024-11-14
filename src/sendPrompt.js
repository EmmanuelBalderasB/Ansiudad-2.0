export default async function sendPrompt(e) {
    e.preventDefault();
    console.log('Button clicked');
    const inputField = document.querySelector('.inputField');
    const textBox = document.querySelector('.textBox');

    const prompt = inputField.value;
    const _numberOfTeams = 2//numOfTeamsField.value;
    const _numberOfRoles = 5//numOfPlayersField.value;
    prompt.trim();
    try {
        const response = await fetch('https://h3lv2miu1x1kda-3000.proxy.runpod.net/api/generateEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt,
                stream: false,
                numberOfTeams: _numberOfTeams,
                numberOfRoles: _numberOfRoles,
            })
        });

        console.log('Response:', response);

        // Convert response to text instead of JSON
        const responseData = await response.json();
        console.log('Response data:', responseData);
        const responses = responseData.responses;
        let fullResponse = '';

        for (let i = 0; i < responses.length; i++) {
            fullResponse += responses[i].response;
        }
        console.log(fullResponse);
        textBox.textContent = fullResponse;
        return fullResponse;

    } catch (error) {
        console.error('Error processing response:', error);
        textBox.textContent = 'Error: Failed to process response';
    }
}