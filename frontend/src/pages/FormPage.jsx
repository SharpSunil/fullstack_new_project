import React from 'react'
import "./Formpage.scss"
const FormPage = () => {
    return (
        <>

            <div className="form-parent parent">
                <div className="form-cont cont">
                    <h2>Form Heading</h2>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" placeholder="Enter your name" />
                            <label>Email:</label>
                            <input type="email" placeholder="Enter your email" />
                                <label>Upload Image</label>
                                <input type="file" />
                                    <button type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormPage
