import React from 'react';
import Repo from './Repo.jsx'

const RepoList = ({ repos }) => {
  return (
    <div>
      <h4> Repo List Component </h4>
      {repos.map((element, index) => <Repo repo={element} key={index} className="repo"/>)}
    </div>
  )
}

export default RepoList;