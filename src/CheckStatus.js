// CheckStatus.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckStatus = () => {
    const [mobileNo, setMobileNo] = useState('');
    const [newStatus, setNewStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [eligibilityMessage, setEligibilityMessage] = useState('');

    useEffect(() => {
        const fetchStatus = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/check-status/${mobileNo}`);
                const status = response.data.status;
                setEligibilityMessage(status ? 'You are eligible for the loan!' : 'Sorry, please try again in a few days.');
            } catch (error) {
                console.error('Error fetching status:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (mobileNo.length === 10) { // Check if mobile number length is exactly 10
            fetchStatus();
        } else {
            setEligibilityMessage('Sorry, please try again in a few days');
        }
    }, [mobileNo]);

    const handleUpdateStatus = async () => {
        try {
            await axios.post('http://localhost:5000/update-status', { mobileNo, status: newStatus });
            setEligibilityMessage(newStatus ? 'You are eligible for the loan!' : 'Sorry, please try again in a few days.');
            alert("Status updated successfully!");
        } catch (error) {
            console.error('Error updating status:', error);
            alert("User not found in the database!");
        }
    };

    return (
        <div>
            <input
                type="text"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                placeholder="Enter Mobile Number"
            />
            <input
                type="checkbox"
                checked={newStatus}
                onChange={() => setNewStatus(!newStatus)}
            /> 
            <button onClick={handleUpdateStatus}>Update Status</button>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <p>{eligibilityMessage}</p>
            )}
        </div>
    );
};

export default CheckStatus;
