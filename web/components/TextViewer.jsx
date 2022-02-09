import React from "react";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

export default function TextViewer({ rawEditor }) {
  return (
    <>
      <Editor
        editorState={EditorState.createWithContent(rawEditor)}
        toolbarHidden="true"
        editorClassName="noselect"
        wrapperClassName="noselect"
      />
    </>
  );
}
