import React, { useState } from "react";
import "./itemRequest.css";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import Select from "react-select";

const itemOptions = [
  "Cooltech ECO 12X1L",
  "Cooltech ECO 20X0.5L",
  "Agritech Plus 15W40 7.5L Elf",
  "Agritec Plus 15w40 10L",
  "Dynatrans SF3I 18+2L(20L)",
  "Dynatrans SF3I 3X5L",
  "Fluidmatic DIII MV 12X1L",
  "Rubia Fleet HD 300 15W40 12X1L",
  "Rubia Fleet HD 300 15W40 7.5L",
  "Rubia Fleet HD 500 15W40 10L",
  "Rubia Fleet HD 500 15W40 12X1L",
  "Rubia Fleet HD 500 15W40 7.5L",
  "Rubia Fleet HD 500 15W40 10L",
].map((option) => ({ label: option, value: option }));

const retailerOptions = [
  "Star Lubricants Spares- K R Puram",
  "A R AUTOMBILES-SIRA",
  "ARB Automobile- Tmk",
  "ATN Automobiles- Turuvekere",
].map((option) => ({ label: option, value: option }));

export default function ItemRequest() {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedItem || !quantity || !selectedRetailer) {
      setIsValid(false);
    } else {
      // Handle form submission logic
      console.log({
        item: selectedItem.value,
        quantity,
        retailer: selectedRetailer.value,
      });
      handleClose();
    }
  };

  return (
    <main id="main" className="main">
      <Container className="mt-4">
        <Row>
          <Col>
            <h4 style={{ textAlign: "center" }}>Item Request</h4>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end mb-2">
            <Button
              variant="success"
              onClick={handleShow}
              style={{ width: "100px" }}
              className="add-button"
            >
              <i class="bi bi-plus-lg"></i> ADD
            </Button>
          </Col>
        </Row>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formRetailer">
            <Form.Label>Select Retailer</Form.Label>
            <Select
              value={selectedRetailer}
              onChange={setSelectedRetailer}
              options={retailerOptions}
              placeholder="Select Retailer"
              className={!isValid && !selectedRetailer ? "is-invalid" : ""}
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor:
                    !isValid && !selectedRetailer ? "red" : base.borderColor,
                  "&:hover": {
                    borderColor:
                      !isValid && !selectedRetailer ? "red" : base.borderColor,
                  },
                }),
              }}
            />
            {!isValid && !selectedRetailer && (
              <div className="invalid-feedback d-block">
                Please select a retailer.
              </div>
            )}
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formItem">
                <Form.Label>Select Item</Form.Label>
                <Select
                  value={selectedItem}
                  onChange={setSelectedItem}
                  options={itemOptions}
                  placeholder="Select an item"
                  className={!isValid && !selectedItem ? "is-invalid" : ""}
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      borderColor:
                        !isValid && !selectedItem ? "red" : base.borderColor,
                      "&:hover": {
                        borderColor:
                          !isValid && !selectedItem ? "red" : base.borderColor,
                      },
                    }),
                  }}
                />
                {!isValid && !selectedItem && (
                  <div className="invalid-feedback d-block">
                    Please select an item.
                  </div>
                )}
              </Form.Group>
              <Form.Group controlId="formQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  className={!isValid && !quantity ? "is-invalid" : ""}
                />
                {!isValid && !quantity && (
                  <div className="invalid-feedback">
                    Please enter a quantity.
                  </div>
                )}
              </Form.Group>
              <br />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </main>
  );
}
