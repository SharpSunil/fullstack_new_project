import React, { useState } from 'react';
import axios from "axios";
import "./Formpage.scss";

const FormPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !file) {
            alert("All fields are required");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("photo", file);

        try {
            setLoading(true);

            await axios.post(
                "http://localhost:5000/api/submit",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            alert("Form submitted & email sent ✅");

            // reset
            setName("");
            setEmail("");
            setFile(null);

        } catch (err) {
            console.error(err);
            alert("Something went wrong ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="form-parent parent">
                <div className="form-cont cont">
                    <h2>Form Heading</h2>

                    {/* IMPORTANT: form tag */}
                    <form className="form-group" onSubmit={handleSubmit}>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            className="files"
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />

                        <button className="btn" type="submit" disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
};

export default FormPage;
