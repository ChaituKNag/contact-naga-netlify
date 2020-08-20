import React from "react";
import "./App.css";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const defaultState = {
  name: "",
  title: "",
  email: "",
  message: ""
};

const contactFormReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        [action.fieldName]: action.fieldValue
      };
    case "RESET":
      return { ...defaultState };
    default:
      return state;
  }
};

function App() {
  const [submitted, setSubmitted] = React.useState(false);
  const [state, dispatch] = React.useReducer(contactFormReducer, defaultState);
  const firstElementRef = React.useRef();
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(false);
    fetch(`/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact-naga", ...state })
    });
    dispatch({ type: "RESET" });
    setSubmitted(true);
    if (firstElementRef.current) {
      firstElementRef.current.focus();
    }
  };

  const handleChange = e => {
    setSubmitted(false);
    e.persist();
    dispatch({
      type: "INPUT_CHANGE",
      fieldName: e.target.name,
      fieldValue: e.target.value
    });
  };

  console.log("appp is initializing");

  return (
    <div className="App">
      <h1>Contact Form</h1>
      {submitted && (
        <div>
          <em>Form submitted successfully</em>
        </div>
      )}
      <form name="contact-naga" method="POST" onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="contact-naga" />
        <div>
          <label htmlFor="name">
            <strong>Name: </strong>
            <br />
            <input
              ref={firstElementRef}
              id="name"
              name="name"
              type="text"
              placeholder="your name..."
              value={state.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="title">
            <strong>Title: </strong>
            <br />
            <input
              id="title"
              name="title"
              value={state.title}
              placeholder="what is it about..."
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            <strong>Email: </strong>
            <br />
            <input
              id="email"
              name="email"
              type="email"
              value={state.email}
              placeholder="so I can reach you..."
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="message">
            <strong>Message: </strong>
            <br />
            <textarea
              id="message"
              name="message"
              value={state.message}
              placeholder="tell me how I can help..."
              onChange={handleChange}
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

export default App;
