/* eslint-disable */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/*eslint-enable*/
import Dropzone from './componentes/dropzone/dropzone'
import Prev from './componentes/preview/preview'
import Editor from './componentes/editor/editor'
import Webc from "./componentes/webcam/webcam";

function App() {
  return (
    <div >
      <Routes>
      <Route exact path="/" element={ <Dropzone/>} />
      <Route path="/preview" element={ <Prev/>} />
      <Route path="/edit" element={ <Editor/>} />
      <Route path="/webcam" element={<Webc/>} />
      </Routes>
    </div>
  );
}

export default App;
