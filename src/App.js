import Nav from "./components/Nav";
import IndexRouter from "./routers/IndexRouter";

import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {

  return (

          <div>
              <Container>
                  <IndexRouter></IndexRouter>
              </Container>

          </div>


  );
}



export default App;
