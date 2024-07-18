import { h } from 'preact';
import DynamicHead from './DynamicHead';

const About = () => (
  <div>
    <DynamicHead
      title="About Us"
      meta={[
        { name: "description", content: "Learn more about our company" },
        { name: "keywords", content: "about, company, preact" }
      ]}
    />
    <h1>About Us</h1>
    <p>We are a company dedicated to creating amazing Preact applications.</p>
  </div>
);

export default About;
