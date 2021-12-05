import 'Components/Home/scss/Second.scss';
import SecondImage from 'Assets/Home/Background.jpg';
export default function Second(): JSX.Element {
  return (
    <section className="Second__Container">
      <img
        className="Second__Background"
        src={SecondImage}
        alt="테스트 이미지"
      />
      <div className="Second__Contents">
        <div className="Second__Image">
          <img src={SecondImage} alt="이미지" />
        </div>
        <div className="Second__Text">
          <div className="Second__Title">
            <h1>for your plant,</h1>
            <h1>for our planet</h1>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quos
            tempora quia dolore, accusamus error necessitatibus repellendus eum
            recusandae officiis assumenda aliquid maiores similique odit! Aut
            excepturi quis quia fugiat? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Animi quos tempora quia dolore, accusamus error
            necessitatibus repellendus eum recusandae officiis assumenda aliquid
            maiores similique odit! Aut excepturi quis quia fugiat?
          </p>
        </div>
      </div>
    </section>
  );
}
