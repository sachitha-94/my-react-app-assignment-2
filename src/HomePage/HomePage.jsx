import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginPage } from '../LoginPage';
import { Sidebar } from '../Common/Sidebar/Sidebar';
import { AddDepartment, Departments } from '../University';
import { AddCourse, Courses, AddModule, Modules } from '../Department';
import { Enroll, StudentEnrollmentStatus, CourseStatusPage } from '../Student';
import { userActions } from '../_actions';
import { Container, Row, Col, Card, Form, Button, Navbar } from "react-bootstrap";
import { withRouter } from "react-router";
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../_components';
import { history } from '../_helpers';

const HomePage = (props) => {


    const { user } = props;
    return (
        <Container fluid>
            <Row>
                <Col className="flex-parent">
                    <Row className=" flex-header">
                        <Navbar className="top-bar" expand="lg" variant="light" bg="light">
                            <span className="logged-user">Hi {user[0].First_Name} {user[0].Last_Name}!</span>
                            <span className=" log-out">
                                <Link to="/login">Logout</Link>
                            </span>
                        </Navbar>
                    </Row>
                    <Row className="home-page-body flex-body">
                        <Col xs={3} id="sidebar-wrapper">
                            <Row className="side-bar">
                                <Sidebar user={user} />
                            </Row>
                        </Col>
                        <Col xs={9} id="page-content-wrapper">
                            <Switch>
                                <Route exact path="/university/departments">
                                    <Departments />
                                </Route>
                                {/* <Route exact path="/university/add_department">
                                    <AddDepartment key='add_Dep' />
                                </Route> */}
                                <Route exact path="/Department/Courses">
                                    <Courses />
                                </Route>
                                {/* <Route exact path="/Department/Add_Course">
                                    <AddCourse />
                                </Route> */}
                                <Route exact path="/Department/Add_Module">
                                    <AddModule />
                                </Route>
                                <Route exact path="/Department/Modules">
                                    <Modules />
                                </Route>
                                <Route exact path="/Student/Enroll">
                                    <Enroll user={user} />
                                </Route>
                                <Route exact path="/Student/Enrollment_Request_Status">
                                    <StudentEnrollmentStatus user={user} ></StudentEnrollmentStatus>
                                </Route>
                                <Route exact path="/Student/Course_Status">
                                    <CourseStatusPage user={user} />
                                </Route>
                            </Switch>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

function mapState(state) {
    const { authentication } = state;
    const { user } = authentication;
    return { user };
}

const actionCreators = {
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };   