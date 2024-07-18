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
