import Counter from "./components/counter/Counter";
import UserForm from "./components/userform/UserForm";
import TextEditor from "./components/text-editor/TextEditor";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <div className="top-section">
        <section className="counter-section">
          <Counter />
        </section>
        <section className="editor-section">
          <TextEditor />
        </section>
      </div>
      <section className="form-section">
        <UserForm />
      </section>
    </div>
  );
};

export default App;
