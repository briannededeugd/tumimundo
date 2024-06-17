export async function submitForm() {
    try {
        const form = document.querySelector("form");
        if (!form) {
            throw new Error('Form not found');
        }

        const formData = new FormData(form);
        const url = form.action;

        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log('Form submitted to server successfully');
            const responseData = await response.json();
            console.log('Response data:', responseData);
        } else {
            console.error('Error submitting form to server:', response.status, response.statusText);
            const errorData = await response.json().catch(() => null);
            if (errorData) {
                console.error('Error data:', errorData);
            }
        }
    } catch (error) {
        console.error('Caught error:', error.message);
        throw error;
    }
}
