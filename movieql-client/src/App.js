import {BrowserRouter, Routers, Route} from "react-router-dom";
import Movies from "./routes/Movies";
import Movie from "./routes/Movie";
import Home from "./routes/Home";

function App() {
  return (
    <BrowserRouter>
      <Routers>
        <Route path="/" element={<Movies/>}/>
        <Rout path="/movies/:id" element={<Movie/>}/>
      </Routers>
    </BrowserRouter>
  );
}

export default App;
