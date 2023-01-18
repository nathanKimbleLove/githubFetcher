import React from 'react';

const Repo = ({ repo }) => {
  return (
    <div>
        <a href={`http://github.com/${repo.ownerName}/${repo.name}`}>{repo.name}</a>
      <p>
        {repo.ownerName}<br></br>
        {repo.watcherCount}
      </p>
    </div>
  )
}

export default Repo;