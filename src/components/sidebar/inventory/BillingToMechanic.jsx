import React, { useState }from 'react';
import "./billingToMechanic.css";
import Select from 'react-select';
import { Button, Modal, Form, Container, Row, Col} from 'react-bootstrap';

const mechanicsArray = [
  "A S K MOTORS", "ARS Auto Centre- Tumkur", "AAPE AUTO WORKS", "AM MOTORS- Chelur",
  "ARHA INDUSTRIES", "ASHWINI MOTORS", "CANARA CAR CARE", "FDN MOTORS", "HI TECH AUTO WORKS",
  "HK MOTO MECH", "HKGN MOTORS", "KDS BIKE POINT", "KHT Chevrolet ( A Div of Morzaria Realtech Pvt Ltd )",
  "KSS MOTORS- Tumkur", "MANI MOTORS", "MK MOTORS", "NEW MOTOR BIKE BULLET GARAGE", 
  "RAJKUMAR BIKE POINT", "RIDERS GARAGE", "SAHARA MOTORS", "SRI LOKESH BIKE SERVICE", 
  "SRI MARUTHI AUTO GARAGE", "SRI THIRUMALA BIKE CENTRE", "SRI VARSHA BIKE SERVICE- Bsk", 
  "SRI VENKATESHWARA GARAGE", "SRI VINAYAKA AUTOMOBILE WORKS", "SRI VINAYAKA GARAGE", 
  "SRI VINAYAKA MOTORS - Mallur", "Vinayaka Bike Service Centre- Mico", "Amrutha Motors- Masthi", 
  "Anjaneya Automobiles- Huliyar", "DHK Motors- Tumkur", "Ekatra Car Care-Jp Nagar", 
  "G H Motors- Tumkur", "Ismail Car Service- Tumkur", "Krishna Bike Service", "Motomechs- Bsk", 
  "Mudaseer Bike Service- EC", "Pratham Motors- Kudur", "S B Auto Garage- Begur Road", 
  "Setu Service Centre- Gubbi", "ZOOM MOTO PIT", "BASAVESHWARA NAGAR"
];


const mechanicsOptions = mechanicsArray.map(mechanic => ({ label: mechanic, value: mechanic }));

const options = [
    "Cooltech ECO 12X1L", "Cooltech ECO 20X0.5L", "Agritech Plus 15W40 7.5L Elf",
    "Agritec Plus 15w40 10L", "Dynatrans SF3I 18+2L(20L)", "Dynatrans SF3I 3X5L",
    "Fluidmatic DIII MV 12X1L", "Rubia Fleet HD 300 15W40 12X1L",
    "Rubia Fleet HD 300 15W40 7.5L", "Rubia Fleet HD 500 15W40 10L",
    "Rubia Fleet HD 500 15W40 12X1L", "Rubia Fleet HD 500 15W40 7.5L",
    "Rubia Fleet HD 500 15W40 10L"
  ].map(option => ({ label: option, value: option }));
  

export default function BillingToMechanic() {

    const [selectedMechanic, setSelectedMechanic] = useState(null);
    const [isValid, setIsValid] = useState(true);
  

    const handleChange = (selectedOption) => {
      setSelectedMechanic(selectedOption);
      setIsValid(true);  // Reset validation state when user selects an option
    };
  
    const [show, setShow] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [isValidModel, setIsValidModel] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleModelSubmit = (e) => {
      e.preventDefault();
      if (!selectedOption || !quantity) {
        setIsValidModel(false);
      } else {
        // Handle form submission logic
        console.log(`Selected Option: ${selectedOption.value}, Quantity: ${quantity}`);
        handleClose();
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!selectedMechanic) {
        setIsValid(false);
      } else {
        // Handle form submission logic
        console.log(`Selected Mechanic: ${selectedMechanic.value}`);
      }
    };

    return (

        <main id='main' className='main'>
        <Container className="mt-4">
        <Row>
            <Col>
            <h5 style={{textAlign:"center"}}>Billing To Mechanic</h5>
            </Col>
        </Row>
        <br />
        <Row >
        <Col className="d-flex justify-content-end mb-2">
          <Button 
            variant="success" 
            onClick={handleShow} 
            style={{ width: '100px' }} 
            className="add-button"
          >
           <i class="bi bi-plus-lg" ></i> ADD
          </Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleModelSubmit}>
            <Form.Group controlId="formSelectOption">
              <Form.Label>Select Option</Form.Label>
              <Select
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Select an option"
                className={!isValidModel && !selectedOption ? 'is-invalid' : ''}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor: !isValidModel && !selectedOption ? 'red' : base.borderColor,
                    '&:hover': {
                      borderColor: !isValidModel && !selectedOption ? 'red' : base.borderColor
                    }
                  })
                }}
              />
              {!isValidModel && !selectedOption && <div className="invalid-feedback d-block">Please select an option.</div>}
            </Form.Group>

            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                className={!isValidModel && !quantity ? 'is-invalid' : ''}
              />
              {!isValidModel && !quantity && <div className="invalid-feedback">Please enter a quantity.</div>}
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="mechanicSelect">
          <Form.Label>Select Mechanic</Form.Label>
          <Select
            value={selectedMechanic}
            onChange={handleChange}
            options={mechanicsOptions}
            placeholder="Select Mechanic"
            className={!isValid ? 'is-invalid' : ''}
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: !isValid ? 'red' : base.borderColor,
                '&:hover': {
                  borderColor: !isValid ? 'red' : base.borderColor
                }
              })
            }}
          />
          {!isValid && <div className="invalid-feedback d-block">Please select a mechanic.</div>}
        </Form.Group>
        <br/>
        <div style={{ display: "flex", justifyContent:"center",margin:"0px auto"}}>
        <Button type="submit" variant="primary" className="mt-3" style={{width:"500px"}} >Submit</Button>

        </div>
      </Form>
    </Container>
    </main>
     
    );
  };