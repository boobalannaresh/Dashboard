import React, {useState} from 'react';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./addUser.css";

export default function AddUser() {

  const [formData, setFormData] = useState({
    userType: '',
    shopName: '',
    name: '',
    email: '',
    mobileNumber: '',
    address: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, userType: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.userType) newErrors.userType = 'User type is required';
    if (!formData.shopName) newErrors.shopName = 'Shop Name is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile Number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Handle form submission
      console.log(formData);
      setErrors({});
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main id='main' className='main'>
      <Container>
      <Row>
            <Col>
            <h4 style={{textAlign:"center"}}>Register User</h4>
            </Col>
        </Row>
      <Row className="justify-content-md-center mt-4">
        <Col md={6}>
         
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUserType" className="mb-3">
              <Form.Label>Select One</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Retailer"
                  name="userType"
                  type="radio"
                  value="Retailer"
                  onChange={handleRadioChange}
                  isInvalid={!!errors.userType}
                />
                <Form.Check
                  inline
                  label="Representative"
                  name="userType"
                  type="radio"
                  value="Representative"
                  onChange={handleRadioChange}
                  isInvalid={!!errors.userType}
                />
                <Form.Check
                  inline
                  label="Mechanic"
                  name="userType"
                  type="radio"
                  value="Mechanic"
                  onChange={handleRadioChange}
                  isInvalid={!!errors.userType}
                />
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.userType}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formShopName" className="mb-3">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                isInvalid={!!errors.shopName}
                placeholder="Shop Name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.shopName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                placeholder="Name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                placeholder="Email"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formMobileNumber" className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                isInvalid={!!errors.mobileNumber}
                placeholder="Mobile Number"
              />
              <Form.Control.Feedback type="invalid">
                {errors.mobileNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
                placeholder="Address"
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  placeholder="Password"
                />
                <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit" block>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
</main>
    
  )
}
