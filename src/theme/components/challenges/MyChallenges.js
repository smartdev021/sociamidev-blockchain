import React from 'react';

const Challenges = (props) => {
  return (
    <div className="col-box-wp p-0">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Success</th>
              <th>Validation</th>
              <th>Reward</th>
              <th>Detail</th>
              <th>Submitted</th>
              <th>Company</th>
              <th>Refresh</th>
              <th>Quota</th>
              <th>Public/Private</th>
            </tr>
          </thead>
          <tbody>
          {
            _.map(props.challenges,(que, index)=>{
              return(
              <tr key={que._id}>
              <td>{que.name}</td>
              <td className="gray-text">{que.description}</td>
              <td className="yellow-text">{que.success ? que.success : ''}</td>
              <td>{que.validation ? que.validation : ''}</td>
              <td>{que.reward ? que.reward : ''}</td>
              <td>{que.rewardValue ? que.rewardValue : ''}</td>
              <td className="yellow-text">{que.reward ? que.reward : ''}</td>
              <td>{que.company ? que.company : ''}</td>
              <td>{que.refresh ? que.refresh : ''}</td>
              <td>{que.quota ? que.quota : ''}</td>
              <td>{que.access ? que.access : ''}</td>
            </tr>
            )
          })
        }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Challenges;
