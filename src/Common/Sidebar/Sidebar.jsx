import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { withRouter } from "react-router";
import { Bookmark } from 'react-bootstrap-icons';

const menuItems = [
    {
        id: 1,
        name: 'Departments',
        path: '/university/departments',
        accessUserRoles: [1],
        component: Bookmark,

    },
    {
        id: 3,
        name: 'Courses',
        path: '/Department/Courses',
        accessUserRoles: [1, 2],
        component: Bookmark,

    },
    {
        id: 4,
        name: "Modules",
        path: '/Department/Modules',
        accessUserRoles: [1, 2],
        component: Bookmark,

    },
    {
        id: 5,
        name: "Enroll Course",
        path: '/Student/Enroll',
        accessUserRoles: [3],
        component: Bookmark,

    },
    {
        id: 6,
        name: 'Enrollment Request Status',
        path: '/Student/Enrollment_Request_Status',
        accessUserRoles: [3],
        component: Bookmark,

    },
    {
        id: 7,
        name: "Course Status",
        path: '/Student/Course_Status',
        accessUserRoles: [3],
        component: Bookmark,

    },
    {
        id: 8,
        name: "Exams",
        path: '/Tutor/Exam',
        accessUserRoles: [1, 3, 4],
        component: Bookmark,

    },
];

const Side = (props) => {
    const { history, user } = props;

    const [selectedMenu, setSelectedMenu] = useState(null);

    useState(() => {
        const activeMenuItem = menuItems.filter(i => i.path === history?.location?.pathname);
        if (activeMenuItem?.length > 0) setSelectedMenu(activeMenuItem[0])
        else setSelectedMenu(menuItems?.[0]);
    }, [history?.location?.pathname])

    const menuItemOnClick = (item) => {
        setSelectedMenu(item);
        history.push(item.path);
   }

    const isUserHaspermission = (accessUserRoles) => {
        const isPermissionExist = accessUserRoles?.includes(user[0].Role_Type_Code_Id);
        return isPermissionExist;
   }

    return (

        <ListGroup className="menu-items">
            {
                menuItems?.map((menu, index) => {
                    const isShowMenuItem = isUserHaspermission(menu?.accessUserRoles);
                    console.log(isShowMenuItem);
                     return (

                         isShowMenuItem &&
                         (<ListGroup.Item
                             className="menu-item-custom"
                             key={index} action
                             variant={menu?.id === selectedMenu?.id && 'primary'}
                             onClick={() => menuItemOnClick(menu)}>
                             {menu.name}
                         </ListGroup.Item>)
                    )
                })
            }
        </ListGroup>

        );
}



const Sidebar = withRouter(Side);

export { Sidebar };   
