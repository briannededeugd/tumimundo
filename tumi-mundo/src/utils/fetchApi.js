export async function fetchApi(path, method = 'GET', data) {
	// later token meegeven en authorization header weer aanzetten
	const url = `https://fdnd-agency.directus.app/items${path}`; // Moet een variabele worden (tm_profile)

	try {
		const response = await fetch(url, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		const result = await response.json();
        const dataJSON = result.data;

		if (response.ok) {
			console.log('Success:', dataJSON);
		} else {
			console.error('Error:', dataJSON);
		}

		return dataJSON;
	} catch (error) {
		throw Error(error.message);
	}
}
