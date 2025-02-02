import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FaBuilding, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import company_logo from "../../images/logo.gif";
import './myProfile.css';

export default function MyProfile() {
  return (
    <main id='main' className='main'>
      <Container className="my-4">
        <Row className="justify-content-center text-start">
          <Col xs={12} md={8} className="profile-card">
            <Row className="justify-content-center mb-4">
              <Col xs={6} md={4}>
                <Image src={company_logo} className="profile-image" fluid />
              </Col>
            </Row>
         <Row>
         <h4><FaBuilding /> SVL Agency</h4>
            <h5><FaUser /> Balaji</h5>
            <h5><FaPhone /> 8056282159</h5>
            <h5><FaEnvelope /> balaji@centroides.com</h5>
         </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
