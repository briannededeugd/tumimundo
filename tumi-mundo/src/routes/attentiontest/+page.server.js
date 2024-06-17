import { fetchApi } from '../../utils/fetchApi';
import { fetchTest } from '../../utils/fetchTest';

// Fetch data
export async function load() {
	try {
		const dataJSON = await fetchApi('/tm_tests');
		const test = await fetchTest(3, dataJSON);

		return {
            dataJSON,
            test
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
// async function postDataToDirectus() {

// 	const data = {
// 		name_of_child: 'Test',
// 		gender: 'Male',
// 		date_of_birth: '2023-10-09',
// 		new_language_to_learn: 2
// 	};

// 	fetchApi('/tm_profile', 'POST', data);
// }

// postDataToDirectus();
