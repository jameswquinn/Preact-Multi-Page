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
