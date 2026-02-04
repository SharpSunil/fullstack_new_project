import React from 'react'
import "./Formpage.scss"
const FormPage = () => {
    return (
        <>

            <div className="form-parent parent">
                <div className="form-cont cont">
                    <h2>Form Heading</h2>
                    <div className="form-group">

                        <input type="text" placeholder="Enter your name" />

                        <input type="email" placeholder="Enter your email" />

                        <input className='files' type="file" />
                        <button className='btn' type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormPage
