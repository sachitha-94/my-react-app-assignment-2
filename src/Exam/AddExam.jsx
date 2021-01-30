import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import { connect } from 'react-redux';
import { examActions, courseActions } from '../_actions';
import { ExamTypeCodes } from '../_constants';

const AddExam = (props) => {

    const [Module_Id, setModule_Id] = useState('');
    const [Exam_Type_Code_Id, setExam_Type_Code_Id] = useState('');
    const [Exam_Name, setExam_Name] = useState('');
    const [Date, setDate] = useState('');


    const [submitted, setSubmitted] = useState(false);

    const {
        show,
        handleClose,
        addExamRequest,
        getAllModules,
        modules
    } = props;

    useEffect(() => {
        getAllModules();
    }, [])



    const handleChange = (e) => {

        const { name, value } = e.target;
        if (name === 'Module_Id') setModule_Id(value);
        else if (name === 'Exam_Type_Code_Id') setExam_Type_Code_Id(value);
        else if (name === 'Exam_Name') setExam_Name(value);
        else if (name === 'Date') setDate(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true);

        if (Module_Id && Exam_Type_Code_Id && Exam_Name && Date) {
            const data = {
                Module_Id,
                Exam_Type_Code_Id,
                Exam_Name,
                Date
            }
            await addExamRequest(data);
            setModule_Id('');
            setExam_Type_Code_Id('');
            setExam_Name('');
            setDate('');
            setSubmitted(false);
            handleClose()
        }
    }

    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form name="form" onSubmit={handleSubmit}>
                    <div className={'form-group' + (submitted && !Exam_Name ? ' has-error' : '')}>
                        <label htmlFor="Exam_Name">Exam Name</label>
                        <input type="Department_Name" className="form-control" name="Exam_Name" value={Exam_Name} onChange={handleChange} />
                        {submitted && !Exam_Name &&
                            <div className="help-block">Exam Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !Module_Id ? ' has-error' : '')}>
                        <label htmlFor="Module_Id"></label>
                        <select className="form-control" name="Module_Id" value={Module_Id} onChange={handleChange}>

                            <option value="0">
                                Select Module
                            </option>


                            {modules?.map((option, index) => {

                                return (

                                    <option value={option.Module_Id} key={index}>
                                        {`${option.Module_Id} - ${option.Module_Name}`}
                                    </option>

                                )
                            })

                            }
                        </select>
                        {submitted && !Module_Id &&
                            <div className="help-block">Module is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !Exam_Type_Code_Id ? ' has-error' : '')}>
                        <label htmlFor="Exam_Type_Code_Id"></label>
                        <select className="form-control" name="Exam_Type_Code_Id" value={Exam_Type_Code_Id} onChange={handleChange}>

                            <option value="0">
                                Select Exam Type
                            </option>


                            {ExamTypeCodes?.map((option, index) => {

                                return (

                                    <option value={option.id} key={index}>
                                        {option.value}
                                    </option>

                                )
                            })

                            }
                        </select>
                        {submitted && !Exam_Type_Code_Id &&
                            <div className="help-block">Exam Type is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !Date ? ' has-error' : '')}>
                        <label htmlFor="Date">Date</label>
                        <input type="date" className="form-control" name="Date" value={Date} onChange={handleChange} />
                        {submitted && !Date &&
                            <div className="help-block">Date is required</div>
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
        exams: state.examReducer.exams,
        modules: state.coursesReducer.modules,
    };
}

const actionCreators = {
    addExamRequest: examActions.addExam,
    getAllModules: courseActions.getAllModules,
};

const connectedAddExamPage = connect(mapState, actionCreators)(AddExam);
export { connectedAddExamPage as AddExamModal };