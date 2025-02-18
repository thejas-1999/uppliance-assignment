import { useState, useEffect, useRef } from "react";
import { Bold, Italic, Underline, List, Save } from "lucide-react";
import "./textEditor.css";

const TextEditor = () => {
  const [savedStatus, setSavedStatus] = useState("");
  const [isBoldActive, setIsBoldActive] = useState(false);
  const [isItalicActive, setIsItalicActive] = useState(false);
  const [isUnderlineActive, setIsUnderlineActive] = useState(false);
  const [isListActive, setIsListActive] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent && editorRef.current) {
      editorRef.current.innerHTML = savedContent;
    }
  }, []);

  // Handle text formatting with toggle functionality
  const handleFormat = (command, toggleStateSetter, currentState) => {
    document.execCommand(command, false, null);
    toggleStateSetter(!currentState); // Toggle the active state
  };

  // Save the content on every input event
  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      // Set content back only if there's any change to avoid re-triggering input
      localStorage.setItem("editorContent", content);
    }
  };

  // Save button action
  const handleSave = () => {
    if (editorRef.current) {
      localStorage.setItem("editorContent", editorRef.current.innerHTML);
      setSavedStatus("Content saved!");
      setTimeout(() => setSavedStatus(""), 2000);
    }
  };

  // Dynamic style for active buttons
  const activeButtonStyle = {
    backgroundColor: "#3f51b5", // Change to your preferred color
    color: "white",
  };

  return (
    <div className="rich-text-editor">
      <div className="editor-header">
        <h2 className="editor-title">Rich Text Editor</h2>
        <div className="editor-toolbar">
          <button
            onClick={() => handleFormat("bold", setIsBoldActive, isBoldActive)}
            className="editor-button"
            title="Bold"
            style={isBoldActive ? activeButtonStyle : {}}
          >
            <Bold className="w-5 h-5" />
          </button>
          <button
            onClick={() =>
              handleFormat("italic", setIsItalicActive, isItalicActive)
            }
            className="editor-button"
            title="Italic"
            style={isItalicActive ? activeButtonStyle : {}}
          >
            <Italic className="w-5 h-5" />
          </button>
          <button
            onClick={() =>
              handleFormat("underline", setIsUnderlineActive, isUnderlineActive)
            }
            className="editor-button"
            title="Underline"
            style={isUnderlineActive ? activeButtonStyle : {}}
          >
            <Underline className="w-5 h-5" />
          </button>
          <button
            onClick={() =>
              handleFormat("insertUnorderedList", setIsListActive, isListActive)
            }
            className="editor-button"
            title="Bullet List"
            style={isListActive ? activeButtonStyle : {}}
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
          ref={editorRef}
          className="editor-content"
          contentEditable
          onInput={handleInput} // Update content while keeping typing intact
        />
      </div>
    </div>
  );
};

export default TextEditor;
