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
