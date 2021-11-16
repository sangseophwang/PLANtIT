import './scss/Third.scss';
import Test from '../../Assets/test.jpeg';
export default function Third(): JSX.Element {
  return (
    <section className="Third__Container">
      <img className="Third__Background" src={Test} alt="테스트 이미지" />
      <div className="Third__Contents">
        <div className="Third__Image">
          <img src={Test} alt="테스트 이미지" />
        </div>
        <div className="Third__Text">
          <h1>for your plant,</h1>
          <h1>for our planet</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quos tempora quia dolore, accusamus error necessitatibus repellendus eum recusandae officiis assumenda aliquid maiores
            similique odit! Aut excepturi quis quia fugiat? Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quos tempora quia dolore, accusamus error necessitatibus repellendus eum
            recusandae officiis assumenda aliquid maiores similique odit! Aut excepturi quis quia fugiat?
          </p>
        </div>
      </div>
    </section>
  );
}
