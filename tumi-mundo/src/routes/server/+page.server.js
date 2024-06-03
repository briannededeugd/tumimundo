import { fetchApi } from '/static/lib/utils/fetchApi.js';
import dotenv from 'dotenv';
dotenv.config();

// Script link test
console.log('Hello, world!');

// Fetch data
export async function load() {
	const directusEndpoint = 'https://fdnd-agency.directus.app/items';

	try {
		const data = await fetchApi(directusEndpoint + '/tm_profile');
		return {
			data
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			data: null,
			error: error.message
		};
	}
}

// Post data
async function postDataToDirectus() {
	const url = 'https://fdnd-agency.directus.app/items/tm_profile';
	const token = process.env.DIRECTUS_TOKEN;

	const data = {
		name_of_child: 'Test',
		gender: 'Male',
		date_of_birth: '2023-10-09',
		new_language_to_learn: 2
	};

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(data)
		});

		const result = await response.json();

		if (response.ok) {
			console.log('Success:', result);
		} else {
			console.error('Error:', result);
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}

postDataToDirectus();
