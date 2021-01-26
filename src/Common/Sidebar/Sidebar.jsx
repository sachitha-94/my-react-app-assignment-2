import React from "react";
import { Nav, ListGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { Bookmark } from 'react-bootstrap-icons';

const menuItems = [
    {
        id: 1,
        name: 'Departments',
        path: '/university/departments',
        role: 1,
        component: Bookmark,

    },
    {
        id: 2,
        name: 'Add Departments',
        path: '/university/add_department',
        role: 1,
        component: Bookmark,

    },
    {
        id: 3,
        name: 'Courses',
        path: '/Department/Courses',
        role: 2,
        component: Bookmark,

    },
    {
        id: 4,
        name: "Modules",
        path: '/Department/Modules',
        role: 2,
        component: Bookmark,

    },
    {
        id: 3,
        name: 'Add Course',
        path: '/Department/Add_Course',
        role: 2

    },
    {
        id: 4,
        name: "Add Module",
        path: '/Department/Add_Module',
        role: 2,
        component: Bookmark,

    },
    {
        id: 5,
        name: "Enroll",
        path: '/Student/Enroll',
        role: 3,
        component: Bookmark,

    },
    {
        id: 6,
        name: 'Enrollment Request Status',
        path: '/Student/Enrollment_Request_Status',
        role: 3,
        component: Bookmark,

    },
    {
        id: 7,
        name: "Course Status",
        path: '/Student/Course_Status',
        role: 3,
        component: Bookmark,

    },
];



//<ListGroup.Item variant="primary">Primary</ListGroup.Item>
//<ListGroup.Item variant="secondary">Secondary</ListGroup.Item>
//<ListGroup.Item variant="success">Success</ListGroup.Item>
//<ListGroup.Item variant="danger">Danger</ListGroup.Item>
//<ListGroup.Item variant="warning">Warning</ListGroup.Item>
//<ListGroup.Item variant="info">Info</ListGroup.Item>
//<ListGroup.Item variant="light">Light</ListGroup.Item>
//<ListGroup.Item variant="dark">Dark</ListGroup.Item>

class Side extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            activeMenu: '',
        };


    }

    componentDidMount() {
        //this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }
    getVariant(index) {
        if (index === 0) {
            return 'primary';
        }
        if (index === 1) {
            return 'secondary';
        }
        if (index === 2) {
            return 'success';
        }
        if (index === 3) {
            return 'danger';
        }
        if (index === 4) {
            return 'warning';
        }
        if (index === 5) {
            return 'info';
        }
    }

    render() {
        const { user } = this.props;
        const user_role = user[0].Role_Type_Code_Id;
        return (
            <>
                <ListGroup className="menu-items">
                    {
                        menuItems.filter(x => x.role === user_role).map((menu, index) => {
                            return (

                                <ListGroup.Item className="menu-item-custom" key={index} variant={this.getVariant(index)} action>
                                    <Link className="menu-item-content btn btn-link" to={menu.path}>
                                        {menu.name}
                                    </Link>
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>

            </>
        );
    }
}



const Sidebar = withRouter(Side);

export { Sidebar as Sidebar };   
