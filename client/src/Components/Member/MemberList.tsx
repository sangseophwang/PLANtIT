import Member from 'Variables/MemberList';
import 'Components/Member/scss/MemberList.scss';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faGithub);

export default function MemberList(): JSX.Element {
  return (
    <section className="Member__Container">
      {Member.map(option => (
        <div
          className="Member__Container-Box"
          key={option.key}
          onClick={() => window.open(option.github)}
        >
          <span className="Member__Github">
            More on Github
            <FontAwesomeIcon icon={faGithub} />
          </span>
          <div className="Member__Wrapper">
            <div className="Member__Container-Query">
              <div className="Member__Image-Container">
                <img src={option.src} alt="" className="Member__Image" />
              </div>
              <div className="Member__Text-Container">
                <div className="Member__Role">{option.role}</div>
                <div className="Member__Name">{option.name}</div>

                <article className="Member__Introduction">
                  {option.content}
                </article>
                <div className="Member__Tag-Container ">
                  <button className="Member__Tag">
                    <span>{option.tag1}</span>
                  </button>
                  <button className="Member__Tag">
                    <span>{option.tag2}</span>
                  </button>
                  <button className="Member__Tag">
                    <span>{option.tag3}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
