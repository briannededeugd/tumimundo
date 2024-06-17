import { fetchApi } from '../../utils/fetchHelpers/fetchApi';
import { retrieveTest } from '../../utils/fetchHelpers/retrieveTest';
import { prepareDataForDirectus } from '../../utils/dataFormatter/prepareDataForDirectus'

// Fetch data
export async function load() {
    try {
		const dataJSON = await fetchApi('/tm_tests');
		const test = await retrieveTest(3, dataJSON);
        
		return {
            dataJSON,
			test
        };
    }   catch (error) {
            console.error('Error fetching data:', error);
            return {
                data: null,
                error: error.message
            };
        }
}
    

// On form data post
export const actions = {
    default: async ({ request }) => {
		const dataJSON = await fetchApi('/tm_tests');
        const testData = await retrieveTest(1, dataJSON);

        const formData = await request.formData();
        const stringifiedTimestampsObject = formData.get('timestampsObjectInput');
        const timestampsObject = JSON.parse(stringifiedTimestampsObject);

        const segmentData = await prepareDataForDirectus('isSegmentData', await timestampsObject, await testData);
        const resultData = await prepareDataForDirectus('isResultData', await timestampsObject, await testData);

        segmentData.forEach((segment) => {
            console.log("SEGMENT:", segment);
            fetchApi('/tm_segments', 'POST', segment);
        });
        await fetchApi('/tm_results', 'POST', resultData);

        return {
            success: true,
            message: 'Form data received and posted successfully'
        };
    }
};