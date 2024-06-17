export async function fetchApi(path, method = 'GET', data = null) {
	const url = `https://fdnd-agency.directus.app/items${path}`;

	const options = {
		method,
		headers: {
			'Content-Type': 'application/json'
		}
	};

	if (method !== 'GET' && data) {
		options.body = JSON.stringify(data);
	}

	try {
		const response = await fetch(url, options);
		const result = await response.json();
        const dataJSON = result.data;

		if (response.ok) {
			console.log('Success:', dataJSON);
		} else {
			console.error('Error:', dataJSON);
		}

		return dataJSON;
	} catch (error) {
		throw new Error(error.message);
	}
}
