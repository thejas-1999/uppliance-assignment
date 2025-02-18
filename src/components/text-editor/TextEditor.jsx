import { useState, useEffect } from "react";
import { Bold, Italic, Underline, List, Save } from "lucide-react";
import "./textEditor.css";

const TextEditor = () => {
  const [content, setContent] = useState("");
  const [savedStatus, setSavedStatus] = useState("");

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const handleFormat = (command) => {
    document.execCommand(command, false, null);
  };

  const handleSave = () => {
    localStorage.setItem("editorContent", content);
    setSavedStatus("Content saved!");
    setTimeout(() => setSavedStatus(""), 2000);
  };

  const handleContentChange = (e) => {
    setContent(e.target.innerHTML);
  };

  return (
    <div className="rich-text-editor">
      <div className="editor-header">
        <h2 className="editor-title">Rich Text Editor</h2>
        <div className="editor-toolbar">
          <button
            onClick={() => handleFormat("bold")}
            className="editor-button"
            title="Bold"
          >
            <Bold className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleFormat("italic")}
            className="editor-button"
            title="Italic"
          >
            <Italic className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleFormat("underline")}
            className="editor-button"
            title="Underline"
          >
            <Underline className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleFormat("insertUnorderedList")}
            className="editor-button"
            title="Bullet List"
          >
            <List className="w-5 h-5" />
          </button>
          <div className="flex-grow" />
          <button onClick={handleSave} className="editor-save">
            <Save className="w-4 h-4" />
            Save
          </button>
          {savedStatus && <span className="saved-status">{savedStatus}</span>}
        </div>
      </div>
      <div className="p-4">
        <div
          className="editor-content"
          contentEditable
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
