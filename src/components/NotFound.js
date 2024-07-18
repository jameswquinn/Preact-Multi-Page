import { h } from 'preact';
import { route } from 'wrouter';
import DynamicHead from './DynamicHead';

const NotFound = () => {
  const goHome = () => route('/');

  return (
    <div>
      <DynamicHead
        title="404 - Page Not Found"
        meta={[
          { name: "description", content: "The requested page was not found" },
          { name: "robots", content: "noindex" }
        ]}
      />
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={goHome}>Go to Home</button>
    </div>
  );
};

export default NotFound;
