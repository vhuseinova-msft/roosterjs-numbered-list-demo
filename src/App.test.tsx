// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// import React from "react";
import { RichTextEditor } from "./App";
import { render, screen } from "@testing-library/react";
import { registerIcons } from "@fluentui/react";
// import userEvent from "@testing-library/user-event";
// import { act } from 'react-dom/test-utils';

describe("RichTextEditor should be shown correctly", () => {
  beforeAll(() => {
    registerIcons({
      icons: {
        richtextboldbuttonicon: <></>,
        richtextitalicbuttonicon: <></>,
        richtextunderlinebuttonicon: <></>,
        richtextbulletlistbuttonicon: <></>,
        richtextnumberlistbuttonicon: <></>,
        richtextindentdecreasebuttonicon: <></>,
        richtextindentincreasebuttonicon: <></>,
        richtextdividericon: <></>,
      },
    });
  });

  test("html should be correct", async () => {
    render(<RichTextEditor onChange={() => {}} />);
    render(<div data-testid="div-test" contentEditable={true} />);
    const richTextEditor = screen.queryByTestId("rooster-rich-text-editor");
    const div = screen.queryByTestId("div-test");
    console.log("richTextEditor", richTextEditor?.outerHTML);
    console.log("div", div?.outerHTML);
    expect(richTextEditor).not.toBeNull();
  });
});
