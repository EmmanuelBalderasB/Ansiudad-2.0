export default async function sendPrompt(e) {
    e.preventDefault();
    console.log('Button clicked');
    //const inputField = document.querySelector('inputField');
    //const textBox = document.querySelector('textBox');
    //const btn = document.querySelector('submitBtn');

    const prompt = "test"//inputField.value;
    prompt.trim();
    try {
        const response = await fetch('https://h3lv2miu1x1kda-3000.proxy.runpod.net/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt,
                stream: false
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