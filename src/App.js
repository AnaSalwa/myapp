import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import Bienvenue from './Components/Bienvenue';
import Voiture from './Components/Voiture';
import VoitureListe from './Components/VoitureListe';
import VoitureEdit from './Components/VoitureEdit';

function App() {
  const marginTop = { marginTop: "20px" };

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
                <Route path="/list" element={<VoitureListe />} />
                <Route path="/edit/:id" element={<VoitureEdit />} /> {/* Correction ici */}
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
