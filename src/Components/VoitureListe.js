import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Importer Link pour la navigation
import axios from 'axios';

export default class VoitureListe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voitures: [] // Initialisation de l'état pour stocker les voitures
    };
  }

  // Méthode de cycle de vie pour récupérer les données après le montage du composant
  componentDidMount() {
    axios.get("http://localhost:8080/voitures/all")
      .then(response => {
        this.setState({ voitures: response.data }); // Mise à jour de l'état avec les données récupérées
      })
      .catch(error => {
        console.log("Erreur lors de la récupération des voitures : ", error);
      });
  }

  deleteVoiture = (voitureId) => {
    axios.delete("http://localhost:8080/voitures/delete/" + voitureId)
      .then(response => {
        if (response.data != null) {
          alert("Voiture supprimée avec succès.");
          this.setState({
            voitures: this.state.voitures.filter(voiture => voiture.id !== voitureId)
          });
        }
      })
      .catch(error => {
        console.log("Erreur lors de la suppression de la voiture : ", error);
      });
  }

  render() {
    return (
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>
          <FontAwesomeIcon icon={faList} /> Liste des Voitures
        </Card.Header>
        <Card.Body>
          <Table bordered hover striped variant="dark">
            <thead>
              <tr>
                <th>Marque</th>
                <th>Modèle</th>
                <th>Couleur</th>
                <th>Année</th>
                <th>Prix</th>
                <th>Actions</th> {/* Colonne pour boutons d'actions */}
              </tr>
            </thead>
            <tbody>
              {this.state.voitures.length === 0 ? (
                <tr align="center">
                  <td colSpan="6">Aucune Voiture n'est disponible</td>
                </tr>
              ) : (
                this.state.voitures.map((voiture) => (
                  <tr key={voiture.id}>
                    <td><FontAwesomeIcon icon={faCar} /> {voiture.marque}</td>
                    <td>{voiture.modele}</td>
                    <td>{voiture.couleur}</td>
                    <td>{voiture.annee}</td>
                    <td>{voiture.prix} €</td>
                    <td>
                      <Link to={"edit/" + voiture.id} className="btn btn-sm btn-outline-primary">
                        <Button variant="warning" size="sm">
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                      </Link>{' '}
                 
\                      <Button size="sm" variant="outline-danger" onClick={this.deleteVoiture.bind(this, voiture.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}
