import React, { useState } from 'react';
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((module) => module.Editor),
    {
        ssr: false,
    }
);

export default function TextEditor({ nextCallback }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }

    return (
        <>
            <div style={{ zoom: 0.85, maxWidth: "110vw" }}>
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarNew"
                    editorClassName="editorNew"
                    onEditorStateChange={onEditorStateChange}
                    spellCheck={true}
                />
                <hr />
            </div>
            <button
                className="nextButton"
                onClick={() => nextCallback(editorState)}
            >
                Next
            </button>
            <style jsx>
                {`
                .toolbarNew {
                    display : flex !important;
                    position : sticky !important;
                    margin-top : 0px !important;
                    z-index : 50 !important;
                    margin-left : auto !important;
                    margin-right : auto !important;
                }

                .editorNew {
                    margin-top : 6px !important;
                    padding: 10px !important;
                    background-color : white !important;
                    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important;
                    margin-left : auto !important;
                    margin-right : auto !important;
                    margin-bottom : 12px !important;
                    border-width: 1px !important;
                }

                .nextButton {
                    width: 100px;
                    height: 45px;
                    font-size: 16px;
                    font-weight: 600;
                    font-family : var(--mainfont);
                    color: #fff;
                    cursor: pointer;
                    margin: 20px;
                    text-align: center;
                    border: none;
                    background-size: 300% 100%;
                    border-radius: 50px;
                    background-image: linear-gradient(
                      to right,
                      #25aae1,
                      #4481eb,
                      #04befe,
                      #3f86ed
                    );
                    box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
                    -o-transition: all 0.4s ease-in-out;
                    -webkit-transition: all 0.4s ease-in-out;
                    transition: all 0.4s ease-in-out;
                  }
                  
                  .nextButton:hover {
                    background-position: 100% 0;
                    -o-transition: all 0.4s ease-in-out;
                    -webkit-transition: all 0.4s ease-in-out;
                    transition: all 0.4s ease-in-out;
                  }
                  
                  .nextButton:focus {
                    outline: none;
                  }
                `}
            </style>
        </>
    )
}
