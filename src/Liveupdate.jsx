// Liveupdate.js
 
import React, { useState } from 'react';
import axios from 'axios';

const Liveupdate = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNo: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/submit-form', formData)
            .then(response => {
                console.log(response.data);
                // Reset form after successful submission
                setFormData({
                    fullName: '',
                    mobileNo: '',
                });
                // Redirect after state update
                window.location.href = 'http://localhost:3000/check-status'; 
            })
            .catch(error => {
                console.error('Error submitting form:', error);
            });
    };
    
    return (
        <div>
            <div className="py-5" style={{ backgroundColor: "#E7E5E5" }}>
                <div style={{ backgroundColor: "#edf2f4" }} className="container contact_box-shadow ">
                    <div className="row">
                        <div className="col-12 col-lg-6 col-md-6 py-5 contact_form-shadow">
                            <h2 style={{ color: "#264653", fontWeight: 600 }} className="text-center">
                                Explore Loan Options
                            </h2>
                            <form style={{ width: "90%", paddingLeft: "50px" }} onSubmit={handleSubmit}>
                                <div className="form-group py-2">
                                    <label htmlFor="fullName">FullName</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your Name"
                                        required
                                    />
                                </div>
                                <div className="form-group py-2">
                                    <label htmlFor="mobileNo">Mobile No</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="mobileNo"
                                        name="mobileNo"
                                        value={formData.mobileNo}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your Mobile No"
                                        required
                                        pattern="[0-9]*" // Only accept numeric characters
                                        maxLength="10" // Restrict to a maximum length of 10 characters
                                        title="Please enter a valid 10-digit mobile number"
                                    />
                                    <button
                                        style={{ backgroundColor: "#036E8C", width: 160, marginLeft: 100, marginTop: 20 }}
                                        type="submit"
                                        className="btn text-white mt-3 button_class text-center"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Liveupdate;

 