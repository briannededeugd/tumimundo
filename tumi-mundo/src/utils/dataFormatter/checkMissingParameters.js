export function checkMissingParameters(params) {
    const missing = Object.keys(params).filter(key => !params[key]);
    if (missing.length > 0) {
        console.log(`Please provide the necessary parameters: ${missing.join(', ')}.`);
        return true;
    }
    return false;
}