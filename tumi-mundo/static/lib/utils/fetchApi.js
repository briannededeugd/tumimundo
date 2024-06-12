<<<<<<< tumi-frontend
export async function fetchApi(path, method = 'GET', data) {
	// later token meegeven en authorization header weer aanzetten
	const url = `https://fdnd-agency.directus.app/items${path}`; // Moet een variabele worden (tm_profile)
	// const token = process.env.DIRECTUS_TOKEN;

	try {
		const response = await fetch(url, {
			method,
			headers: {
				'Content-Type': 'application/json'
				// Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(data)
		});

		const result = await response.json();

		if (response.ok) {
			console.log('Success:', result);
		} else {
			console.error('Error:', result);
		}

		return result;
	} catch (error) {
		throw Error(error.message);
	}
}
=======
export async function fetchApi(url, payload = {}) {
	return await fetch(url, payload)
		.then((response) => response.json())
		.catch((error) => error);
}
>>>>>>> main
