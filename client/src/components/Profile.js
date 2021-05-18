import React from 'react';
import { useSelector } from 'react-redux'


function Profile(props) {

  const user = useSelector(store => store?.user)

  return (
    <>
      {
        user.role === 'user' &&
        <div className="card" style={{ "width": "18rem", "margin": "0 auto", "marginTop": "5rem", "display": "flex", "alignItems": "center", "justifyContent": "center"}}>
          <img src="https://img.icons8.com/ios/452/administrator-male--v1.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{user.name + ' ' + user.surname}</h5>
            <p className="card-text">{user.email}</p>
          </div>
        </div>
      }
      {
        user.role === 'admin' &&
        <div className="card" style={{ "width": "18rem", "margin": "0 auto", "marginTop": "5rem", "display": "flex", "alignItems": "center", "justifyContent": "center"}}>
          <img src="https://dk-public.ru/files/forums_imgs/1581684179.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{user.name + ' ' + user.surname}</h5>
            <p className="card-text">{user.email}</p>
          </div>
        </div>
      }
    </>
  );
}

export default Profile;
