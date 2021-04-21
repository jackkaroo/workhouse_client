function getFetchHeaders() {
  const headers = {};

  headers['Content-Type'] = 'application/json';
  headers.Accept = 'application/json';

  const token = localStorage.getItem('token');
  headers.Authorization = `Bearer ${token}`;

  console.log(headers);

  return {
    headers
  };
}

module.exports = { getFetchHeaders };
