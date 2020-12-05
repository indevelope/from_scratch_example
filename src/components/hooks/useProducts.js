import { useState, useEffect } from 'react';
import axios from 'axios';

const API_TOKEN = 'keyyzI91DWk4Bq4tK';

const httpClient = axios.create({
  baseURL: 'https://api.airtable.com/v0/appVd6hlVHwfZZKaJ',
  timeout: 10000,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`
  }
});

function _fetchData(searchQuery) {
  return (
    httpClient.get('/Products', {
      params: {
        maxRecords: 10,
        view: 'Grid view',
        filterByFormula: searchQuery ? `SEARCH("${searchQuery}",LOWER({Title}))` : undefined
      }
    })
      .then(result => result.data)
      .then(_mapFromAirtable)
  );
}

function _mapFromAirtable(data) {
  return data.records.map(
    record => ({
      Id: record.id,
      Title: record.fields.Title,
      Discount: record.fields.Discount,
      Description: record.fields.Description,
      Cover: record.fields.Cover[0].thumbnails && record.fields.Cover[0].thumbnails.large.url,
      Price: record.fields.Price
    })
  );
}

const useProducts = (searchQuery) => {
  const [records, setRecords] = useState(null);

  useEffect(() => {
    setRecords(null);
    _fetchData(searchQuery).then(records => {
      setRecords(records);
    })
  }, [searchQuery]);

  return records;
};

export default useProducts;

export const useProduct = (productId) => {
  const [record, setRecord] = useState(null);

  useEffect(() => {
    setRecord(null);
    _fetchData().then(records => {
      setRecord(records.filter(r => r.Id === productId)[0]);
    })
  }, [productId]);

  return record;
}