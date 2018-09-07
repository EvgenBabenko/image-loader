import makeRequest from './makeRequest';
import toDataResponse from './toDataResponse';

export default async (url) => {
  const response = await makeRequest('get', url, 'blob');

  const binaryData = await toDataResponse(response);

  console.log(binaryData);

  return binaryData;
};
