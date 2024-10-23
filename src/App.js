import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Voiture from './Components/Voiture';
import VoitureListe from './Components/VoitureListe';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const marginTop = { marginTop: "20px" }

  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Container>
          <Row>
            <Col lg={12} style={marginTop}>
              <Routes>
                <Route path="/" element={<Bienvenue />} />
                <Route path="/add" element={<Voiture />} />
                <Route path="/edit/:id" exact component={Voiture}/>
                <Route path="/list" element={<VoitureListe />} />
                <Route path="/voitures" component={VoitureListe} />

              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
