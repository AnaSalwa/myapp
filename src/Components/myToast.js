import React from 'react';
import { Toast } from 'react-bootstrap';

class MyToast extends React.Component {
  render() {
    const toastCss = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: '1',
      boxShadow : '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      minWidth: '250px'
    };

    return (
      <div style={this.props.children.show ? toastCss : null}>
        <Toast
          className={"border border-success bg-success text-white"}
          show={this.props.children.show}
          onClose={this.props.onClose}
          delay={3000}
          autohide
        >
          <Toast.Header className={"bg-success text-white"}>
            <strong className="mr-auto">Succès</strong>
          </Toast.Header>
          <Toast.Body>{this.props.children.message}</Toast.Body>
        </Toast>
      </div>
    );
  }
}

export default MyToast;
