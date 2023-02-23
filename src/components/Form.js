import React, { useEffect, useState } from 'react'
// import "../index.css"
import "./Form.css"


export default function Form() {
    const getLocalItems = () => {
        let list = localStorage.getItem('lists');

        if (list) {
            return JSON.parse(localStorage.getItem('lists'));
        } else {
            return []
        }

    }
    const data = { StudentsName: "", RollNumber: ""}
    const [StudentRegisteration, setStudentRegisteration] = useState(data)
    function handleInput(e) {
        setStudentRegisteration({ ...StudentRegisteration, [e.target.name]: e.target.value })
        console.log(StudentRegisteration)

    }
    const [records, setRecords] = useState(getLocalItems());
    const handleDelete = (id) => {
        const updateditems = records.filter((elems, ind) => {
            return ind !== id;
        })
        setRecords(updateditems);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecord = { ...StudentRegisteration, id: new Date().getTime().toString() };

        // console.log(records)
        setRecords([...records, newRecord]);
        // console.log(records);
        setStudentRegisteration({
            StudentsName: "",
            RollNumber: ""
        })
    }
    var showdate = new Date();
    var displaytodaystime = showdate.getHours() + ':' + showdate.getMinutes();
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(records))
    }, [records]);
    return (
        <>
            <div className="input">
                <label htmlFor="exampleFormControlInput1" className="inp1">Student's Name</label>
                <input  type="email" autoComplete="off"
                    value={StudentRegisteration.StudentsName}
                    onChange={handleInput}
                    className="name" name='StudentsName' placeholder="" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="inp1">Student's Roll number</label>
                <input type="text" autoComplete="off"
                    value={StudentRegisteration.RollNumber}
                    onChange={handleInput}

                    className="roll" name='RollNumber' placeholder="" />
            </div>

            <input className="btn" type="submit" value="Add to class" onClick={handleSubmit}></input>


            <div className='total'>
                <h3>Total student present in the class : </h3>
                <h3>{  records.length}</h3>
            </div>
            <div className='tablediv'>
                <table className='table'>
                    <thead  className='head'>
                        <tr className='row'>
                            <th>Sno.</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Roll no.</th>
                            <th scope="col" className="px-6 py-3">Time</th>
                        </tr>
                    </thead>
                </table>
                {
                    records.map((currElem, ind) => {
                        return (
                            <>
                            <div  key={ind}>

                                <tbody >
                                    <tr className='ans'>
                                        <td>{ind + 1}</td>
                                        <td>{currElem.StudentsName}</td>
                                        <td>{currElem.RollNumber}</td>
                                        <td>{displaytodaystime}</td>
                                        <button className='mx-3' onClick={() => handleDelete(ind)}>Remove from class</button>
                                    </tr>
                                </tbody>
                            </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}
