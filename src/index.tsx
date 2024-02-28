import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RichTextEditor } from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeIcons } from "@fluentui/react";
initializeIcons();

const RichTextEditorWrapper = (): JSX.Element => {
  const [content, setContent] = useState<string | undefined>(undefined);

  return (
    <RichTextEditor
      content={content}
      onChange={(newContent) => {
        setTimeout(() => {
          setContent(newContent);
        }, 1);
      }}
      placeholderText="Type something here"
    />
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RichTextEditorWrapper />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();