import Counter from "./components/counter/Counter";
import UserForm from "./components/UserForm";
import "./App.css"; // Import global styles if needed

const App = () => {
  return (
    <div className="app-container">
      <section className="counter-section">
        <Counter />
      </section>
      <section className="form-section">
        <UserForm />
      </section>
    </div>
  );
};
export default App;
