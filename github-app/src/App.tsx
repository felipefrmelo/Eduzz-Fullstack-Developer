import { Repositories } from "./components/repositories";
function App() {
  return (
    <div className="App">
      <Repositories
        repos={[
          {
            name: "react",
            full_name: "facebook/react",
            language: "TypeScript",
          },
          {
            name: "react-dom",
            full_name: "facebook/reactss",
            language: "TypeScript",
          },
        ]}
      />{" "}
    </div>
  );
}

export default App;
