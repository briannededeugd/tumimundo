import { fetchApi } from '../../utils/fetchApi';
import dotenv from 'dotenv';
dotenv.config();

// Script link test
console.log('Hello, world!');

export async function load() {
	try {
		const data = await fetchApi('/tm_profile');
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
// Deze functie in utils, algemener houden (dus naam is fetchApi en tm_profile wordt steeds een datatype (variabele))
async function postDataToDirectus() {
	const data = {
		name_of_child: 'Test',
		gender: 'Male',
		date_of_birth: '2023-10-09',
		new_language_to_learn: 2
	};

	fetchApi('/tm_profile', 'POST', data);
}

postDataToDirectus();
