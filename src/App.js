/* eslint-disable */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/*eslint-enable*/
import Dropzone from "./componentes/dropzone/dropzone";
import Prev from "./componentes/preview/preview";
import Editor from "./componentes/editor/editor";
import Landing from "./componentes/landing/landing";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route exact path="/home" element={<Dropzone />} />
        <Route path="/preview" element={<Prev />} />
        <Route path="/edit" element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;
