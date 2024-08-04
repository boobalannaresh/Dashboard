import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./retailerRequestReport.css";
import norecordfound from "../../../images/norecordfound.gif";

const retailerOptions = [
  'Star Lubricants Spares- K R Puram',
  'A R AUTOMBILES-SIRA',
  'ARB Automobile- Tmk',
  'ATN Automobiles- Turuvekere',
].map((option) => ({ label: option, value: option }));

const orderStatusOptions = [
  'All',
  'Completed',
  'Pending',
].map((option) => ({ label: option, value: option }));

const dummyData = [
  {
    sl: '01',
    personName: 'Syed Khadeer',
    retailer: 'Star Lubricants Spares- K R Puram',
    requestId: '06',
    refNo: '06/04-07-2024',
    itemName: 'Quartz 7000FUT.GF6 5W30 3X3.5L',
    boxes: '03',
    quantity: '09',
    litres: '31.5',
    totalLitres: '32',
    estimateAmount: '₹11,718',
    status: 'Completed',
  },
  {
    sl: '02',
    personName: 'Syed Khadeer',
    retailer: 'Star Lubricants Spares- K R Puram',
    requestId: '09',
    refNo: '09/05-07-2024',
    itemName: 'Quartz 7000FUT.GF6 5W30 3X3.5L',
    boxes: '03',
    quantity: '09',
    litres: '33.5',
    totalLitres: '34',
    estimateAmount: '₹11,720',
    status: 'Pending',
  },
  {
    sl: '03',
    personName: 'Mukesh',
    retailer: 'A R AUTOMBILES-SIRA',
    requestId: '02',
    refNo: '02/10-07-2024',
    itemName: 'Quartz 7000FUT.GF6 5W30 3X3.5L',
    boxes: '03',
    quantity: '09',
    litres: '33.5',
    totalLitres: '34',
    estimateAmount: '₹11,720',
    status: 'Completed',
  },
  {
    sl: '04',
    personName: 'Mukesh',
    retailer: 'A R AUTOMBILES-SIRA',
    requestId: '05',
    refNo: '05/15-07-2024',
    itemName: 'Quartz 7000FUT.GF6 5W30 3X3.5L',
    boxes: '03',
    quantity: '09',
    litres: '33.5',
    totalLitres: '34',
    estimateAmount: '₹11,720',
    status: 'Pending',
  },
  // Add more dummy data as needed
];

export default function RetailerRequestReport() {
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showTable, setShowTable] = useState(false);

  const parseDateFromRefNo = (refNo) => {
    const datePart = refNo.split('/')[1];
    const [day, month, year] = datePart.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const handleFilter = () => {
    let filtered = dummyData;

    if (!selectedRetailer) {
      setErrorMessage('Please select a retailer');
      return;
    } else {
      setErrorMessage('');
    }

    filtered = filtered.filter(data => data.retailer === selectedRetailer.value);

    if (selectedOrderStatus && selectedOrderStatus.value !== 'All') {
      filtered = filtered.filter(data => data.status === selectedOrderStatus.value);
    }

    if (startDate && endDate) {
      if (startDate > endDate) {
        alert("Pick From Date cannot be later than Pick To Date.");
        return;
      }

      filtered = filtered.filter(data => {
        const refDate = parseDateFromRefNo(data.refNo);
        return refDate >= startDate && refDate <= endDate;
      });
    }

    setFilteredData(filtered);
    setShowTable(true); // Show table after filtering
  };

  const handleReset = () => {
    setSelectedRetailer(null);
    setSelectedOrderStatus(null);
    setStartDate(null);
    setEndDate(null);
    setFilteredData([]);
    setShowTable(false); // Hide table after resetting
    setErrorMessage('');
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: errorMessage && !selectedRetailer ? 'red' : provided.borderColor,
      '&:hover': {
        borderColor: errorMessage && !selectedRetailer ? 'red' : provided.borderColor,
      },
    }),
  };

  return (
    <main id='main' className='main'>
      <Container className="mt-4">
        <Row className="mb-4">
          <Col>
            <h4 style={{ textAlign: "center" }}>Item Request Report Retailerwise</h4>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formRetailer">
              <Form.Label>Select Retailer</Form.Label>
              <Select
                value={selectedRetailer}
                onChange={setSelectedRetailer}
                options={retailerOptions}
                placeholder="Select Retailer"
                styles={customSelectStyles}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formOrderStatus">
              <Form.Label>Select Order Status</Form.Label>
              <Select
                value={selectedOrderStatus}
                onChange={setSelectedOrderStatus}
                options={orderStatusOptions}
                placeholder="Select Order Status"
                styles={customSelectStyles}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <Form.Label>Pick From Date</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="form-control"
              placeholderText="Pick From Date"
            />
          </Col>
          <Col md={6}>
            <Form.Label>Pick To Date</Form.Label>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              className="form-control"
              placeholderText="Pick To Date"
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6} className="mb-3">
            <Button variant="primary" onClick={handleFilter} block>Apply Filter</Button>
          </Col>
          <Col md={6}>
            <Button variant="secondary" onClick={handleReset} block>Reset</Button>
          </Col>
        </Row>
        {showTable && (
          <Row className="mt-4">
            <Col>
              {filteredData.length === 0 ? (
                <div className="text-center">
                  <img src={norecordfound} alt="No Record Found" style={{ width: '50%' }} />
                </div>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Person-Name</th>
                      <th>Retailer</th>
                      <th>Request ID</th>
                      <th>Ref No</th>
                      <th>ItemName</th>
                      <th>Box(es)</th>
                      <th>Quantity</th>
                      <th>Litres</th>
                      <th>Total Litres</th>
                      <th>Estimate Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.personName}</td>
                        <td>{data.retailer}</td>
                        <td>{data.requestId}</td>
                        <td>{data.refNo}</td>
                        <td>{data.itemName}</td>
                        <td>{data.boxes}</td>
                        <td>{data.quantity}</td>
                        <td>{data.litres}</td>
                        <td>{data.totalLitres}</td>
                        <td>{data.estimateAmount}</td>
                        <td>{data.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        )}
      </Container>
    </main>
  );
}
