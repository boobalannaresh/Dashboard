import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import norecordfound from "../../../images/norecordfound.gif"; // Ensure the path to the image is correct
import "./retailerAccountStatement.css";

const retailerOptions = [
  'Star Lubricants Spares- K R Puram',
  'A R AUTOMBILES-SIRA',
  'ARB Automobile- Tmk',
  'ATN Automobiles- Turuvekere',
].map((option) => ({ label: option, value: option }));

const dummyData = [
  {
    sl: '01',
    selectRetailer: 'Star Lubricants Spares- K R Puram',
    date: '04-07-2023',
    particulars: 'Invoice No-1234',
    debit: '₹20,000',
    credit: '',
  },
  {
    sl: '02',
    selectRetailer: 'Star Lubricants Spares- K R Puram',
    date: '05-07-2023',
    particulars: 'UPI-ReferNo-131323',
    debit: '',
    credit: '₹15,000',
  },
  {
    sl: '03',
    selectRetailer: 'Star Lubricants Spares- K R Puram',
    date: '06-07-2023',
    particulars: 'Invoice No-12345',
    debit: '₹25,000',
    credit: '',
  },
  {
    sl: '04',
    selectRetailer: 'A R AUTOMBILES-SIRA',
    date: '06-07-2023',
    particulars: 'Invoice No-124',
    debit: '₹10,000',
    credit: '',
  },
  {
    sl: '05',
    selectRetailer: 'A R AUTOMBILES-SIRA',
    date: '07-07-2023',
    particulars: 'UPI-ReferNo-13323',
    debit: '',
    credit: '₹55,000',
  },
  {
    sl: '06',
    selectRetailer: 'A R AUTOMBILES-SIRA',
    date: '08-07-2023',
    particulars: 'Invoice No-2345',
    debit: '₹15,000',
    credit: '',
  },
];

export default function RetailerAccountStatement() {
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State to manage error message

  const handleFilter = () => {
    if (!selectedRetailer) {
        setErrorMessage('Please select a retailer');
        return;
      } else {
        setErrorMessage('');
      }
    
    let filtered = dummyData;

    if (selectedRetailer) {
      filtered = filtered.filter(data => data.selectRetailer === selectedRetailer.value);
    }

    if (startDate && endDate) {
      if (startDate > endDate) {
        alert("Pick From Date cannot be later than Pick To Date.");
        return;
      }

      filtered = filtered.filter(data => {
        const dataDate = new Date(data.date.split('-').reverse().join('-'));
        return dataDate >= startDate && dataDate <= endDate;
      });
    }

    setFilteredData(filtered);
    setIsFilterApplied(true);  // Set filter applied to true when filter button is clicked
    setErrorMessage(''); // Clear error message after successful filtering
  };

  const handleReset = () => {
    setSelectedRetailer(null);
    setStartDate(null);
    setEndDate(null);
    setFilteredData([]);
    setIsFilterApplied(false); // Reset filter applied state
    setErrorMessage(''); // Clear error message
  };

  const totalDebit = filteredData.reduce((total, item) => total + (item.debit ? parseFloat(item.debit.replace(/₹|,/g, '')) : 0), 0);
  const totalCredit = filteredData.reduce((total, item) => total + (item.credit ? parseFloat(item.credit.replace(/₹|,/g, '')) : 0), 0);

  // Custom styles for react-select
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
            <h4 style={{ textAlign: "center" }}>Account Statement</h4>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formRetailer">
              <Select
                value={selectedRetailer}
                onChange={setSelectedRetailer}
                options={retailerOptions}
                placeholder="Select Retailer"
                styles={customSelectStyles} // Apply custom styles here
              />

            </Form.Group>
          </Col>
          <br className="mt-3" />
          <Col md={6} >
            <Row>
              <Col>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  placeholderText="Pick From Date"
                />
              </Col>
              <br />
              <Col>
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  placeholderText="Pick To Date"
                />
              </Col>
            </Row>
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

        <Row className="mt-4">
          <Col>
            {isFilterApplied && (
              filteredData.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Sl</th>
                      <th>Date</th>
                      <th>Particulars</th>
                      <th>Debit</th>
                      <th>Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.date}</td>
                        <td>{data.particulars}</td>
                        <td>{data.debit}</td>
                        <td>{data.credit}</td>
                      </tr>
                    ))}
                    {/* Adding totals row */}
                    <tr>
                      <td colSpan="3" className='text-end'>Collection Amount:</td>
                      <td></td>
                      <td>₹{totalCredit.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className='text-end'>Closing Balance:</td>
                      <td></td>
                      <td>₹{totalDebit.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className='text-end'>Total:</td>
                      <td>₹{totalDebit.toLocaleString('en-IN')}</td>
                      <td>₹{(totalDebit + totalCredit).toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </Table>
              ) : (
                <div className="text-center">
                <img src={norecordfound} alt="No Record Found" style={{ width: '50%' }} />
              </div>
              )
            )}
          </Col>
        </Row>
      </Container>
    </main>
  );
}
