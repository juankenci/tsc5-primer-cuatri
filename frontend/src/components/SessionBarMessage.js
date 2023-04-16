import React  from "react";
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';


                                                                                                     
function SessionBarMessage(props) { 
    
    
    return (                                                                   
      <Modal
              size="sm"
              show={props.show}
              onHide={props.onHide}
              aria-labelledby="modal-message"
              animation={true}
              centered
          >
              <Modal.Header closeButton>
                  <Modal.Title id="modal-message">
                  {props.title}           
                  </Modal.Title>
              </Modal.Header>
              
              <Modal.Body>
                {props.text} 
              </Modal.Body>
              <Modal.Footer>
                  <Button className="btn btn-primary" onClick={props.onHide}> {props.buttonOk}</Button>                                                                                                                                                                                        
              </Modal.Footer>
              
          </Modal>
      )                                                                                                
                                                                                                       
  }                                                                                                    
                                                                                                     
export default SessionBarMessage;      