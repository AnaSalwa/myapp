import React, { Component } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';
import { faSave, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

class VoitureEditClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,  
      marque: '',
      modele: '',
      couleur: '',
      annee: '',
      prix: '',
      immatricule: ''
    };
  }

  componentDidMount() {
    console.log("Composant monté, récupération des données pour l'ID :", this.state.id);
    
    axios.get(`http://localhost:8080/voitures/${this.state.id}`)
      .then(response => {
        console.log("Données récupérées :", response.data);
        
        if (response.data) {
          this.setState({
            marque: response.data.marque || '',
            modele: response.data.modele || '',
            couleur: response.data.couleur || '',
            annee: response.data.annee || '',
            prix: response.data.prix || '',
            immatricule: response.data.immatricule || ''
          }, () => {
            console.log("État mis à jour :", this.state);
          });
        } else {
          console.warn("Aucune donnée trouvée pour l'ID :", this.state.id);
        }
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de la voiture : ", error);
      });
  }

  handleChange = (event) => {
    console.log("Changement de champ :", event.target.name, "Nouvelle valeur :", event.target.value);
    
    this.setState({
      [event.target.name]: event.target.value
    }, () => {
      console.log("État mis à jour après changement :", this.state);
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Soumission du formulaire, état actuel :", this.state);
    
    const updatedVoiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      annee: this.state.annee,
      prix: this.state.prix,
      immatricule: this.state.immatricule
    };

    axios.put(`http://localhost:8080/voitures/${this.state.id}`, updatedVoiture)
      .then(response => {
        console.log("Réponse après mise à jour :", response.data);
        
        if (response.data) {
          alert("Voiture mise à jour avec succès");
          this.props.navigate("/list"); 
        }
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour de la voiture : ", error);
      });
  }

  handleReset = () => {
    console.log("Réinitialisation du formulaire");
    this.setState({
      marque: '',
      modele: '',
      couleur: '',
      annee: '',
      prix: '',
      immatricule: ''
    });
  }

  render() {
    return (
      <Card className="border border-dark bg-dark text-white">
        <Card.Header><FontAwesomeIcon icon={faEdit} /> Modifier Voiture</Card.Header>
        <Form onReset={this.handleReset} onSubmit={this.handleSubmit} id="VoitureEditFormId">
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridMarque">
                <Form.Label>Marque</Form.Label>
                <Form.Control
                  required
                  name="marque"
                  type="text"
                  className="bg-dark text-white"
                  value={this.state.marque}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridModele">
                <Form.Label>Modèle</Form.Label>
                <Form.Control
                  required
                  name="modele"
                  type="text"
                  className="bg-dark text-white"
                  value={this.state.modele}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCouleur">
                <Form.Label>Couleur</Form.Label>
                <Form.Control
                  required
                  name="couleur"
                  type="text"
                  className="bg-dark text-white"
                  value={this.state.couleur}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridImmatricule">
                <Form.Label>Immatricule</Form.Label>
                <Form.Control
                  required
                  name="immatricule"
                  type="text"
                  className="bg-dark text-white"
                  value={this.state.immatricule}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridAnnee">
                <Form.Label>Année</Form.Label>
                <Form.Control
                  required
                  name="annee"
                  type="text"
                  className="bg-dark text-white"
                  value={this.state.annee}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPrix">
                <Form.Label>Prix</Form.Label>
                <Form.Control
                  required
                  name="prix"
                  type="text"
                  className="bg-dark text-white"
                  value={this.state.prix}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>
          </Card.Body>
          <Card.Footer style={{ textAlign: "right" }}>
            <Button size="sm" variant="success" type="submit">
              <FontAwesomeIcon icon={faSave} /> Sauvegarder
            </Button>
            <Button size="sm" variant="info" type="reset">
              <FontAwesomeIcon icon={faUndo} /> Réinitialiser
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    );
  }
}

// Création d'un composant fonctionnel pour récupérer les paramètres et le navigate
const VoitureEdit = (props) => {
  const { id } = useParams(); // Récupère l'ID depuis les paramètres de l'URL
  const navigate = useNavigate(); // Utiliser useNavigate
  return <VoitureEditClass {...props} id={id} navigate={navigate} />; // Passe l'ID et navigate au composant de classe
};

export default VoitureEdit;
