import React from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Contact me</h1>
      <form name="contact-naga" method="POST">
        <input type="hidden" name="form-name" value="contact-naga" />
        <div>
          <label htmlFor="name">
            <strong>Name: </strong>
            <input id="name" name="name" placeholder="your name..." />
          </label>
        </div>
        <div>
          <label htmlFor="title">
            <strong>Title: </strong>
            <input id="title" name="title" placeholder="what is it about..." />
          </label>
        </div>
        <div>
          <label htmlFor="message">
            <strong>Message: </strong>
            <br />
            <textarea
              id="message"
              name="message"
              placeholder="tell me how I can help..."
            />
          </label>
        </div>
        <div>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}
