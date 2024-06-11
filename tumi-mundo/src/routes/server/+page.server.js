import { fetchApi } from '/static/lib/utils/fetchApi.js';
import dotenv from 'dotenv';
dotenv.config();

// Script link test
console.log('Hello, world!');

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
/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const name_of_child = formData.get('name_of_child');
		const gender = formData.get('gender');
		const date_of_birth = formData.get('date_of_birth');
		const current_languages = formData.getAll('current_languages').map(id => ({ id }));
		const new_language_to_learn = formData.getAll('new_language_to_learn').map(id => ({ id }));

		const data = {
			name_of_child,
			gender,
			date_of_birth,
			current_languages,
			new_language_to_learn
		};

		const directusEndpoint = 'https://fdnd-agency.directus.app/items/tm_profile';

		try {
			const response = await fetch(directusEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data)
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.error('Error sending data to Directus:', errorData);
				return {
					success: false,
					error: 'Failed to submit data to Directus'
				};
			}

			const responseData = await response.json();
			console.log('Data successfully sent to Directus:', responseData);

			return {
				success: true,
				data: responseData
			};
		} catch (error) {
			console.error('Error sending data to Directus:', error);
			return {
				success: false,
				error: 'An error occurred while submitting the data'
			};
		}
	}
};
