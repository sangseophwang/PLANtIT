import React from 'react';
import Member from 'Assets/Dummy/Member';
import 'Components/Member/scss/MemberList.scss';

const MemberList = () => {
  return (
    <section className="Member__Container">
      {Member.map(option => (
        <div className="Member__Container-Box">
          <div className="Member__Container-Query">
            <div className="Member__Image-Container">
              <img
                src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
                alt=""
                className="Member__Image"
              />
            </div>
            <div className="Member__Text-Container">
              <div className="Member__Role">{option.role}</div>
              <div className="Member__Name">{option.name}</div>

              <article className="Member__Introduction">{option.content}</article>
              <div className="Member__Tag-Container ">
                <button className="Member__Tag">
                  <span>{option.tag1}</span>
                </button>
                <button className="Member__Tag">
                  <span>{option.tag2}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MemberList;
