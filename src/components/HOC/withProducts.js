import React from 'react';

import axios from 'axios';

const API_TOKEN = 'keyyzI91DWk4Bq4tK';

const httpClient = axios.create({
  baseURL: 'https://api.airtable.com/v0/appVd6hlVHwfZZKaJ',
  timeout: 1000,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`
  }
});

const withProducts = EnhancedComponent => class WithProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      records: null,
      searchQuery: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.searchQuery !== prevState.searchQuery) {
      return {
        records: null,
        searchQuery: nextProps.searchQuery
      };
    }

    return null;
  }

  componentDidMount() {
    this._fetchData();
  }

  componentDidUpdate() {
    if (!this.state.records)
      this._fetchData(this.props.searchQuery);
  }

  render() {
    const { records } = this.state;
    const { searchQuery } = this.props;

    return (
      <>
        <EnhancedComponent isLoading={!records} searchQuery={searchQuery} products={records} />
      </>
    );
  }

  _fetchData(searchQuery) {
    httpClient.get('/Products', {
      params: {
        maxRecords: 3,
        view: 'Grid view',
        filterByFormula: searchQuery ? `SEARCH("${searchQuery}",LOWER({Title}))` : undefined
      }
    })
      .then(result => result.data)
      .then(this._mapFromAirtable)
      .then(records => {
        this.setState({
          records
        });
      });
  }

  _mapFromAirtable(data) {
    return data.records.map(
      record => ({
        Id: record.id,
        Title: record.fields.Title,
        Discount: record.fields.Discount,
        Description: record.fields.Description,
        Cover: record.fields.Cover[0].thumbnails.large.url,
        Price: record.fields.Price
      })
    );
  }
};

export default withProducts;

