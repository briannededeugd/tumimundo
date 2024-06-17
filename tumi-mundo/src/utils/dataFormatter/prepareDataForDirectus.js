export async function prepareDataForDirectus(dataType, timestampsObject, testData) {
    if (dataType === 'isSegmentData') {
        let formattedSegmentDataArray = [];

        timestampsObject.map((obj) => {
            const formattedSegmentData = {
                test_id: testData[0].test_id,
                type: obj.type,
                duration: obj.time,
            }
            formattedSegmentDataArray.push(formattedSegmentData);
        });
        return formattedSegmentDataArray;
    } else if (dataType === 'isResultData') {
        const startTimeArr = timestampsObject.filter((obj) => obj.type === 'attention_start');
        const endTimeArr = timestampsObject.filter((obj) => obj.type === 'attention_stop');
        console.log("START TIME ARRAY:", startTimeArr);
        console.log("END TIME ARRAY:", endTimeArr);

        let differenceArr = [];
    
        for (let i = 0; i < endTimeArr.length; i++) {
            differenceArr.push(Math.ceil((new Date(endTimeArr[i].time).getTime() - new Date(startTimeArr[i].time).getTime()) / 1000))
        }

        const maxAttentionSpan = Math.max(...differenceArr);
        console.log("DIFFERENCE ARRAY", differenceArr)
        console.log("MAX ATTENTION SPAN:", maxAttentionSpan)
        const formattedMaxAttentionSpan = maxAttentionSpan / 60 >= 1 ? `${Math.floor(maxAttentionSpan / 60)}:${(maxAttentionSpan % 60).toString().padStart(2, '0')}` : `${maxAttentionSpan}s`;
        
        const formattedResultData = {
            test_id: testData[0].test_id,
            max_attention_span: `${formattedMaxAttentionSpan}`
        }
        return formattedResultData;
    } 
}