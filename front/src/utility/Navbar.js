import { useState } from 'react'

const { Container, Row, Col } = require('react-grid-system')

const Navbar = () => {
    const [user, setUser] = useState('')
    if(localStorage.getItem('username')) {
        setUser(localStorage.getItem('username'))
    }

    return(
        <div className="navbar">
            <Container fluid>
            <Row debug xs={12}>
                <Col debug className='navbarBlock' xs={2}><b>Welcome {user}</b></Col>
                <Col debug className='navbarBlock' xs={7}><h3><b>Newton Pay</b></h3></Col>
                <Col debug className='navbarBlock' xs={3}>3 of 3</Col>
            </Row>
            </Container>
        </div>
    )
};

export default Navbar;