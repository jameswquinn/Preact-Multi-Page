# Preact Multi-Page Website with Dynamic Features

This project is a multi-page website built with Preact, featuring routing, lazy loading, dynamic meta tags, and a time ago component. It demonstrates several advanced concepts in a lightweight, fast-performing web application.

## Project Structure

```
src/
├── components/
│   ├── Home.js
│   ├── About.js
│   ├── Contact.js
│   ├── NotFound.js
│   ├── DynamicHead.js
│   └── TimeAgo.js
├── index.js
└── index.html
```

## Code Overview

### 1. Main Application (index.js)

```javascript
import { h, render } from 'preact';
import { Router } from 'wrouter';
import { lazy, Suspense } from 'preact/compat';

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const NotFound = lazy(() => import('./components/NotFound'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
      <Router.Switch>
        <Router.Route path="/" component={Home} />
        <Router.Route path="/about" component={About} />
        <Router.Route path="/contact" component={Contact} />
        <Router.Route component={NotFound} />
      </Router.Switch>
    </Suspense>
  </Router>
);

render(<App />, document.body);
```

### 2. Home Component (components/Home.js)

```javascript
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
```

### 3. About Component (components/About.js)

```javascript
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
```

### 4. Contact Component (components/Contact.js)

```javascript
import { h } from 'preact';
import DynamicHead from './DynamicHead';

const Contact = () => (
  <div>
    <DynamicHead
      title="Contact Us"
      meta={[
        { name: "description", content: "Get in touch with us" },
        { name: "keywords", content: "contact, email, phone, preact" }
      ]}
    />
    <h1>Contact Us</h1>
    <p>You can reach us at contact@example.com</p>
  </div>
);

export default Contact;
```

### 5. NotFound Component (components/NotFound.js)

```javascript
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
```

### 6. DynamicHead Component (components/DynamicHead.js)

```javascript
import { h, Component } from 'preact';

class DynamicHead extends Component {
  componentDidMount() {
    this.updateHead();
  }

  componentDidUpdate() {
    this.updateHead();
  }

  componentWillUnmount() {
    this.removeHead();
  }

  updateHead() {
    this.removeHead();

    const { title, meta = [], link = [] } = this.props;

    if (title) {
      document.title = title;
    }

    meta.forEach(({ name, content }) => {
      if (name && content) {
        const metaTag = document.createElement('meta');
        metaTag.name = name;
        metaTag.content = content;
        metaTag.setAttribute('data-dynamic-head', 'true');
        document.head.appendChild(metaTag);
      }
    });

    link.forEach(({ rel, href }) => {
      if (rel && href) {
        const linkTag = document.createElement('link');
        linkTag.rel = rel;
        linkTag.href = href;
        linkTag.setAttribute('data-dynamic-head', 'true');
        document.head.appendChild(linkTag);
      }
    });
  }

  removeHead() {
    const elements = document.head.querySelectorAll('[data-dynamic-head="true"]');
    elements.forEach(el => el.remove());
  }

  render() {
    return null;
  }
}

export default DynamicHead;
```

### 7. TimeAgo Component (components/TimeAgo.js)

```javascript
import { h, Component } from 'preact';
import { formatDistanceToNow } from 'date-fns';

class TimeAgo extends Component {
  state = {
    timeAgo: ''
  };

  componentDidMount() {
    this.updateTimeAgo();
    this.timer = setInterval(() => this.updateTimeAgo(), 60000); // Update every minute
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateTimeAgo() {
    const { date } = this.props;
    const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
    this.setState({ timeAgo });
  }

  render() {
    const { timeAgo } = this.state;
    return <span>{timeAgo}</span>;
  }
}

export default TimeAgo;
```

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/jameswquinn/Preact-Multi-Page.git
   ```

2. Navigate to the project directory:
   ```
   cd Preact-Multi-Page
   ```

3. Install dependencies:
   ```
   npm install preact wrouter date-fns
   ```

4. Set up a build process using a tool like Webpack or Parcel to handle JSX transformation and module bundling.

5. Start your development server.

## Key Features Explained

1. **Routing**: We use `wrouter` for client-side routing. Routes are defined in `index.js` using `<Router.Switch>` and `<Router.Route>` components.

2. **Lazy Loading**: Components are lazy-loaded using Preact's `lazy` function and wrapped in a `Suspense` component for better performance.

3. **Dynamic Meta Tags**: The `DynamicHead` component allows for dynamic updating of meta tags, title, and link tags in the document head.

4. **Time Ago**: The `TimeAgo` component uses `date-fns` to display relative timestamps, updating every minute.

5. **404 Handling**: A catch-all route renders the `NotFound` component for any unmatched URLs.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
