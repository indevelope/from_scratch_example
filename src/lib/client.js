import axios from 'axios';

const API_TOKEN = 'keyyzI91DWk4Bq4tK';

const httpClient = axios.create({
  baseURL: 'https://api.airtable.com/v0/appVd6hlVHwfZZKaJ',
  timeout: 10000,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`
  }
});

export function createProduct(fields) {
  return (
    httpClient.post('/Products', {
      records: [
        {
          fields
        }
      ]
    })
      .then(result => result.data)
  );
}