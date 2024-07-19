import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = () => {
  // State to handle changes in the text editor content
  const [content, setContent] = useState("");

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  // Handle changes in the quill text editor
  const handleChange = (content, delta, source, editor) => {
    setContent(editor.getContents());
  };

  // Handle save button click
  const handleSave = () => {
    console.log("Content saved:", content);
    // Add your logic to save the content to a database or API
  };

  return (
    <>
      <div>
        <div className="flex justify-center items-center h-[10rem]">
          <h1 className="text-6xl font-extrabold">Quill.Js Text Editor</h1>
        </div>
        <div className="flex justify-center flex-col items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-20 ml-[34%] mb-6"
            onClick={() => handleSave()}
          >
            Save
          </button>
          <div className="w-[100%] flex justify-center items-center flex-col">
            <ReactQuill
              className="h-[10rem]"
              theme="snow"
              formats={[
                "header",
                "font",
                "ize",
                "bold",
                "italic",
                "underline",
                "trike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "video",
              ]}
              placeholder="Write something amazing..."
              modules={modules}
              value={content}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TextEditor;
