import React, { Component } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';
import { faPlusSquare, faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {myToast} from './myToast'

export default class Voiture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marque: '',
      modele: '',
      couleur: '',
      annee: '',
      prix: '',
      immatricule: ''
    };

    // Liaison des fonctions
    this.voitureChange = this.voitureChange.bind(this);
    this.submitVoiture = this.submitVoiture.bind(this);
    this.resetVoiture = this.resetVoiture.bind(this);
  }

  initialState = {
    marque: '',
    modele: '',
    couleur: '',
    immatricule: '',
    annee: '',
    prix: ''
  };

  // Réinitialisation du formulaire
  resetVoiture() {
    this.setState(this.initialState);
  }

  // Fonction pour gérer les changements de valeur dans les inputs
  voitureChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Fonction pour gérer la soumission du formulaire
  submitVoiture(event) {
    event.preventDefault();
    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      immatricule: this.state.immatricule,
      annee: this.state.annee,
      prix: this.state.prix
    };

    // Envoi de la requête POST via Axios
    axios.post("http://localhost:8080/voitures/add", voiture)
      .then(response => {
        if (response.data != null) {
          this.setState({
            showToast: true,
            message: "Voiture ajoutée avec succès",
          });
          setTimeout(() => this.setState({ showToast: false }), 3000); // Cacher le toast après 3 secondes
          this.resetVoiture(); // Réinitialiser le formulaire
        }
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout de la voiture :", error);
      });
  }

  render() {
    return (
      <Card className="border border-dark bg-dark text-white">
        <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> Ajouter Voiture</Card.Header>
        <Form onReset={this.resetVoiture} onSubmit={this.submitVoiture} id="VoitureFormId">
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridMarque">
                <Form.Label>Marque</Form.Label>
                <Form.Control
                  required
                  name="marque"
                  type="text"
                  className="bg-dark text-white"
                  placeholder="Entrez Marque Voiture"
                  value={this.state.marque}
                  onChange={this.voitureChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridModele">
                <Form.Label>Modèle</Form.Label>
                <Form.Control
                  required
                  name="modele"
                  type="text"
                  className="bg-dark text-white"
                  placeholder="Entrez Modèle Voiture"
                  value={this.state.modele}
                  onChange={this.voitureChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCouleur">
                <Form.Label>Couleur</Form.Label>
                <Form.Control
                  required
                  name="couleur"
                  type="text"
                  className="bg-dark text-white"
                  placeholder="Entrez Couleur Voiture"
                  value={this.state.couleur}
                  onChange={this.voitureChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridImmatricule">
                <Form.Label>Immatricule</Form.Label>
                <Form.Control
                  required
                  name="immatricule"
                  type="text"
                  className="bg-dark text-white"
                  placeholder="Entrez Immatricule Voiture"
                  value={this.state.immatricule}
                  onChange={this.voitureChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridAnnee">
                <Form.Label>Année</Form.Label>
                <Form.Control
                  required
                  name="annee"
                  type="text"
                  className="bg-dark text-white"
                  placeholder="Entrez Année Voiture"
                  value={this.state.annee}
                  onChange={this.voitureChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPrix">
                <Form.Label>Prix</Form.Label>
                <Form.Control
                  required
                  name="prix"
                  type="text"
                  className="bg-dark text-white"
                  placeholder="Entrez Prix Voiture"
                  value={this.state.prix}
                  onChange={this.voitureChange}
                />
              </Form.Group>
            </Form.Row>
          </Card.Body>
          <Card.Footer style={{ textAlign: "right" }}>
            <Button size="sm" variant="success" type="submit">
              <FontAwesomeIcon icon={faSave} /> Submit
            </Button>
            <Button size="sm" variant="info" type="reset">
              <FontAwesomeIcon icon={faUndo} /> Reset
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    );
  }
}
