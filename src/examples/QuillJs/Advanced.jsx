import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiFillFacebook,
} from "react-icons/ai";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Input, Modal } from "antd";

export const modules = {
  toolbar: {
    container: "#toolbar",
  },
};

/*
 ** Options for Social Media Embeds
 **/
const socialToolOptions = {
  twitter: {
    label: "Twitter",
    active: true,
    description: "Add Twitter Url",
  },
  instagram: {
    label: "Instagram",
    active: true,
    description: "Add Instagram Url",
  },
  facebook: {
    label: "FaceBook",
    active: true,
    description: "Add FaceBook Embed Code",
  },
};
/*
 ** Quill Toolbar component
 **/

const AdvancedQuillEditor = (props) => {
  const [uniqueId, setUniqueId] = useState("dfwrbgrwkigrekhgmrkm");
  const [editorData, setEditorData] = useState();
  const [socialTools, setSocialTools] = useState({
    active: false,
    label: "",
    code: "",
    description: "",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const quillRef = React.useRef();
  const Embed = ReactQuill.Quill.import("blots/block/embed");

  /*
   ** Quill Twitter Embed component
   **/
  class TwitterEmbedBlot extends Embed {
    static create(tweetId) {
      let node = super.create();
      node.dataset.tweetId = tweetId;
      window.twttr.widgets.createTweet(tweetId, node);
      return node;
    }

    static value(node) {
      return node.getAttribute("data-tweet-id");
    }
  }
  TwitterEmbedBlot.blotName = "tweet";
  TwitterEmbedBlot.tagName = "div";
  ReactQuill.Quill.register(TwitterEmbedBlot);

  /*
   ** Quill Instagram Embed component
   **/
  class InstagramPostBlot extends Embed {
    static create(actualUrl) {
      console.log(actualUrl)
      const node = super.create();
      const embedCode = `<iframe src="${actualUrl}embed" width="400" height="500" frameborder="0" allowtransparency="true"></iframe>`;
      node.innerHTML = embedCode;
      return node;
    }
  }

  InstagramPostBlot.blotName = "Instagram";
  InstagramPostBlot.tagName = "div";
  InstagramPostBlot.className = `instagram-${"asdfghjkiuygfc"}`;//pass unique id
  Quill.register(InstagramPostBlot);

  /*
   ** Quill Facebook Embed component
   **/
  class FacebookEmbedBlot extends Embed {
    static create(postUrl) {
      const node = super.create();
      node.innerHTML = postUrl;
      return node;
    }
  }

  FacebookEmbedBlot.blotName = "Facebook";
  FacebookEmbedBlot.tagName = "div";
  FacebookEmbedBlot.className = `facebook-${uniqueId}`;
  ReactQuill.Quill.register(FacebookEmbedBlot);

  // Replacing classNames of facebook and instagram of editorData for rendering the content in quillEditor:
  const modifiedEditorData = editorData
    ?.replace(/facebook-/g, "Facebook")
    .replace(/instagram-/g, "Instagram");

  /*
   ** Twitter Hanlde Functions
   **/
  const getTweetIdFromUrl = (url) => {
    const regex = /https?:\/\/twitter\.com\/\w+\/status\/(\d+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  const handleTwitterEmbed = (mediaUrl) => {
    const quill = quillRef.current.getEditor();
    quillRef.current.focus();
    const range = quill.getSelection();
    let twId = mediaUrl;
    if (mediaUrl) {
      if (mediaUrl.indexOf("http") >= 0) {
        twId = getTweetIdFromUrl(mediaUrl);
      }
      quill.insertText(range.index, "\n", Quill.sources.USER);
      quill.insertEmbed(range.index + 1, "tweet", twId, Quill.sources.USER);
      quill.setSelection(range.index + 2, Quill.sources.SILENT);
    }
  };

  /*
   ** Instagram Hanlde Function
   **/
  const insertInstagramPost = (mediaUrl) => {
    debugger
    const quill = quillRef.current.getEditor();
    quillRef.current.focus();
    const range = quill.getSelection();
    if (mediaUrl !== null && mediaUrl !== "") {
      let modifiedUrl = mediaUrl.split("?");
      let actualUrl = modifiedUrl[0];

      if (actualUrl) {
        if (range) {
          quill.insertText(range.index, "\n", Quill.sources.USER);
          quill.insertEmbed(range.index + 1, "Instagram", actualUrl);
          quill.setSelection(range.index + 2, Quill.sources.SILENT);
        } else {
          const length = quillRef.getLength();
          quill.insertEmbed(length, "Instagram", mediaUrl);
        }
      }
    }
  };
  /*
   ** Facebook Hanlde Function
   **/
  const handleFacebookEmbed = (embedCode) => {
    const quill = quillRef.current.getEditor();
    quillRef.current.focus();
    const range = quill.getSelection();
    if (embedCode) {
      quill.insertText(range.index, "\n", Quill.sources.USER);
      quill.insertEmbed(
        range.index + 1,
        "Facebook",
        embedCode,
        Quill.sources.USER
      );
      quill.setSelection(range.index + 2, Quill.sources.SILENT);
    }
  };
  /*
   ** Get Social Media Content
   **/
  const fetchSocialMediaContent = () => {
    setSocialTools({
      ...socialTools,
      active: false,
    });
    switch (socialTools.label) {
      case "Instagram":
        insertInstagramPost(socialTools.code);
        break;
      case "FaceBook":
        handleFacebookEmbed(socialTools.code);
        break;
      case "Twitter":
        handleTwitterEmbed(socialTools.code);
        break;
      default:
        console.log("none");
        break;
    }
  };
  /*
   ** Modal for Social Media Content
   **/
  const modal = (data) => {
    return (
      <Modal
        title=""
        open={socialTools.active}
        onOk={fetchSocialMediaContent}
        className="listdeletemodal"
        onCancel={() =>
          setSocialTools({
            ...socialTools,
            active: false,
            label: "",
            code: "",
            description: "",
          })
        }
      >
        <h3>{data.label} Tool</h3>
        <Input
          placeholder={data.description}
          onChange={(e) => {
            setSocialTools({ ...socialTools, code: e.target.value });
          }}
        />
      </Modal>
    );
  };

  // Handle save button click
  const handleSave = () => {
    alert('Check your console')
    console.log("Content saved:", content);
    // Add your logic to save the content to a database or API
  };
  return (
    <div className="text-editor flex justify-center flex-col items-center">
      {/*
       *** @ #toolbar
       *
       ** #toolbar is given to the toolbar conatiner full custom options and buttons
       */}
      <div className="flex justify-center items-center h-[10rem]">
        <h1 className="text-6xl font-extrabold">Custom Quill.Js Text Editor</h1>
      </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-20 ml-[34%] mb-6"
          onClick={() => handleSave()}
        >
          Save
        </button>
      <div id="toolbar" className="quillEditor-tollbar ">
        <span className="ql-formats">
          <select className="ql-size" defaultValue="medium">
            <option value="large">Large</option>
            <option value="medium">Medium</option>
            <option value="small">Small</option>
          </select>
          <select className="ql-header" defaultValue="3">
            <option value="1">Heading</option>
            <option value="2">Subheading</option>
            <option value="3">Normal</option>
          </select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold" />
          formats
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
          <button className="ql-indent" value="-1" />
          <button className="ql-indent" value="+1" />
        </span>
        <span className="ql-formats">
          <button className="ql-script" value="super" />
          <button className="ql-script" value="sub" />
          <button className="ql-blockquote" />
          <button className="ql-direction" />
        </span>
        <span className="ql-formats">
          <select className="ql-align" />
          <select className="ql-color" />
          <select className="ql-background" />
        </span>
        <span className="ql-formats">
          <button className="ql-link" />
          <button className="ql-image" />
          <button className="ql-video" />
          {/* *
           **==> Custom Twitter Button
           * */}
          <button
            className="ql-twitter"
            onClick={() => {
              setSocialTools({
                ...socialTools,
                active: true,
                ...socialToolOptions.twitter,
              });
            }}
          >
            <AiOutlineTwitter />
          </button>
          {/* *
           **==> Custom Instagram Button
           * */}
          <button
            className="ql-instagram"
            onClick={() => {
              setSocialTools({
                ...socialTools,
                active: true,
                ...socialToolOptions.instagram,
              });
            }}
          >
            <AiOutlineInstagram />
          </button>
          {/* *
           **==> Custom Facebook Button
           * */}
          <button
            className="ql-facebook"
            onClick={() => {
              setSocialTools({
                ...socialTools,
                active: true,
                ...socialToolOptions.facebook,
              });
            }}
          >
            <AiFillFacebook />
          </button>
        </span>
        <span className="ql-formats">
          <button className="ql-formula" />
          <button className="ql-code-block" />
          <button className="ql-clean" />
        </span>
      </div>
      
      <div className=" ">
 
        <ReactQuill
          className="quillEditor-container w-[54.4vw] h-[40vh]"
          modules={modules}
          value={modifiedEditorData}
          placeholder="Enter Something...."
          theme="snow"
          ref={quillRef}
          onChange={(value) => {
            setEditorData(value);
          }}
        />
        {socialTools.active === true && modal(socialTools)}
      
      </div>
    </div>
  );
};

export default AdvancedQuillEditor;
