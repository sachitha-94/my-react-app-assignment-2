import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from "react-bootstrap";
import { courseActions } from '../_actions';
import { CourseTypeCodes } from '../_constants';
const AddCourse = (props) => {

    const { show, handleClose, addCourse } = props;

    const [Course_Name, setCourse_Name] = useState('');
    const [Course_Type_Code_Id, setCourse_Type_Code_Id] = useState('');
    const [Pre_Course_Req, setPre_Course_Req] = useState('');
    const [submitted, setSubmitted] = useState(false);


    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === 'Course_Name') setCourse_Name(value);
        else if (name === 'Course_Type_Code_Id') setCourse_Type_Code_Id(value);
        else if (name === 'Pre_Course_Req') setPre_Course_Req(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);

        if (Course_Name && Course_Type_Code_Id && Pre_Course_Req) {
            const data = {
                Course_Name,
                Course_Type_Code_Id,
                Pre_Course_Req

            }

            addCourse(data);
            handleClose();
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form name="form" onSubmit={handleSubmit}>
                    <div className={'form-group' + (submitted && !Course_Name ? ' has-error' : '')}>
                        <label htmlFor="Course_Name">Course Name</label>
                        <input type="text" className="form-control" name="Course_Name" value={Course_Name} onChange={handleChange} />
                        {submitted && !Course_Name &&
                            <div className="help-block">Course Name is required</div>
                        }
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="Pre_Course_Req">Course Pre Requesites</label>
                        <input type="textarea" className="form-control" name="Pre_Course_Req" value={Pre_Course_Req} onChange={handleChange} />
                    </div>

                    <div className={'form-group' + (submitted && !Course_Type_Code_Id ? ' has-error' : '')}>
                        <label htmlFor="Course_Type_Code_Id">Course Type</label>
                        <select className="form-control" name="Course_Type_Code_Id" value={Course_Type_Code_Id} onChange={handleChange}>

                            <option value="0">
                                Select
                            </option>


                            {CourseTypeCodes?.map((option, index) => {

                                    return (

                                        <option value={option.id} key={index}>
                                            {option.value}
                                        </option>

                                    )
                                })

                            }
                        </select>
                        {submitted && !Course_Type_Code_Id &&
                            <div className="help-block">Course Type is required</div>
                        }
                    </div>

                    <div className="form-group">
                        <button className="btn btn-info">Submit</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>

    );

}

function mapState(state) {
    return {
        course: state.coursesReducer.course,
    };
}

const actionCreators = {
    addCourse: courseActions.addCourse,
};

const connectedAddCoursePage = connect(mapState, actionCreators)(AddCourse);
export { connectedAddCoursePage as AddCourseModal };