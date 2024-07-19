import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import TextEditor from "./examples/QuillJs/TextEditor";
import AdvancedTextEditor from "./examples/QuillJs/Advanced";
import BackToHome from "./common/BackToHome";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/quill-basic"
          element={
            <BackToHome>
              <TextEditor />
            </BackToHome>
          }
        />
        <Route
          path="/quill-advanced"
          element={
            <BackToHome>
              <AdvancedTextEditor />
            </BackToHome>
          }
        />
      </Routes>
    </>
  );
}

export default App;
