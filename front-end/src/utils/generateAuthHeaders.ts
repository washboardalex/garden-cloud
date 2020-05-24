export const generateAuthHeaders = () => {
    let gardenCloudToken = window.sessionStorage.getItem('gardenCloudToken');

	let requestHeaders;
	gardenCloudToken === 'undefined' || !gardenCloudToken
		? requestHeaders = { 'Accept': 'application/json','Content-Type': 'application/json'}
        : requestHeaders = { 'Accept': 'application/json','Content-Type': 'application/json', 'Authorization': gardenCloudToken };
        
    return requestHeaders;
}