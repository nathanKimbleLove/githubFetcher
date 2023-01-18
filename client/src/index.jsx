import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

const App = () => {

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: '/repos'
    })
    .then(response => {
      setRepos(response.data);
    })
    .catch(err => console.log(err));
  }, [])


  const search = (term) => {
    axios.post('/repos', {'term': term})
    .then(res => {
      setRepos(res.data);
    })
    .catch(err => console.error(err));
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={search} class="row"/>
      <RepoList repos={repos} class="row"/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));