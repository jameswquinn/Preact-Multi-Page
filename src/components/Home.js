import { h } from 'preact';
import DynamicHead from './DynamicHead';
import TimeAgo from './TimeAgo';

const Home = () => (
  <div>
    <DynamicHead
      title="Home Page"
      meta={[
        { name: "description", content: "Welcome to our home page" },
        { name: "keywords", content: "home, preact, example" }
      ]}
    />
    <h1>Welcome to the Home Page</h1>
    <p>This page was last updated <TimeAgo date={new Date(2023, 6, 18)} />.</p>
  </div>
);

export default Home;
