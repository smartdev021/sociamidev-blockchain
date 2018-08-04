import React from 'react';

const Friends = (props) => {

  return (
    <div className="col-box-wp">
      <div className="my-friends-wp">
        <h3 className="col-heading">{props.heading}</h3>
        <ul>
          <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-1.png" /></span>
          <p>John</p> </li>
          <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-2.png" /></span>
          <p>Lina</p> </li>
          <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-3.png" /></span>
          <p>Sona</p> </li>
          <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-4.png" /></span>
          <p>John</p> </li>
          <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-5.png" /></span>
          <p>Anna</p> </li>
          <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-6.png" /></span>
          <p>John</p> </li>
          <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-7.png" /></span>
          <p>Masha</p> </li>
          <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-8.png" /></span>
          <p>Karina</p> </li>
          <li><span className="img-wp"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/homepage/my-friends-9.png" /></span>
          <p>Anahit</p> </li>
        </ul>
      </div>
    </div>
  );
}

export default Friends;
