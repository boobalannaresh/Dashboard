import React,{useState} from 'react';
import "./allDsrDayKeyRoute.css";
import { Container, Row, Col, Button, Form, Table } from 'react-bootstrap';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const representativeOptions = [
 'Bharath' ,
   'GM Khan' ,
  'Layeeq' ,
 'Prashanth' ,
'Basavaraj' 
].map((option) => ({ label: option, value: option }));

const dayOptions = [
 'Sunday' ,
   'Monday' ,
   'Tuesday' ,
  'Wednesday' ,
'Thursday' ,
 'Friday' ,
 'Saturday' 
].map((option) => ({ label: option, value: option }));

const dummyData = [
  { id: 1, account: 'Bharath', visitingDay: 'Monday' },
  { id: 2, account: 'GM Khan', visitingDay: 'Tuesday' },
  { id: 3, account: 'Layeeq', visitingDay: 'Wednesday' },
  { id: 4, account: 'Prashanth', visitingDay: 'Thursday' },
  { id: 5, account: 'Basavaraj', visitingDay: 'Friday' },
  { id: 6, account: 'Bharath', visitingDay: 'Tuesday' },
  { id: 7, account: 'GM Khan', visitingDay: 'Monday' },
  { id: 8, account: 'Layeeq', visitingDay: 'Thursday' },
  { id: 9, account: 'Prashanth', visitingDay: 'Wednesday' },
  { id: 10, account: 'Basavaraj', visitingDay: 'Monday' },
  { id: 11, account: 'Bharath', visitingDay: 'Friday' },
  { id: 12, account: 'GM Khan', visitingDay: 'Saturday' },
  { id: 13, account: 'Layeeq', visitingDay: 'Sunday' },
  { id: 14, account: 'Prashanth', visitingDay: 'Tuesday' },
  { id: 15, account: 'Basavaraj', visitingDay: 'Wednesday' },
  { id: 16, account: 'Bharath', visitingDay: 'Thursday' },
  { id: 17, account: 'GM Khan', visitingDay: 'Friday' }
];


export default function AllDsrDayKeyRoute() {

  const [selectedRepresentative, setSelectedRepresentative] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [filteredData, setFilteredData] = useState(dummyData);
  const navigate = useNavigate();

  const handleReset = () => {
    setSelectedRepresentative(null);
    setSelectedDay(null);
    setFilteredData(dummyData);
  };

  const handleFilter = () => {
    let filtered = dummyData;
    if (selectedRepresentative) {
      filtered = filtered.filter(data => data.account === selectedRepresentative.value);
    }
    if (selectedDay) {
      filtered = filtered.filter(data => data.visitingDay === selectedDay.value);
    }
    setFilteredData(filtered);
  };


  return (
    <main id='main' className='main'>
 <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Form.Group controlId="formRepresentative">
            <Form.Label>Select Representative</Form.Label>
            <Select
              value={selectedRepresentative}
              onChange={setSelectedRepresentative}
              options={representativeOptions}
              placeholder="Select Representative"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formDay">
            <Form.Label>Select Visiting Day</Form.Label>
            <Select
              value={selectedDay}
              onChange={setSelectedDay}
              options={dayOptions}
              placeholder="Select Visiting Day"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <Button variant="primary" onClick={handleFilter} block>Filter</Button>
        </Col>
        <br/>
        <Col md={6}>
          <Button variant="secondary" onClick={handleReset} block>Reset</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>SL</th>
                <th>Account</th>
                <th>Visiting Day</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.account}</td>
                  <td>{data.visitingDay}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={()=> navigate("/portal/retailer-summary")}>Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
    </main>
  )
}
