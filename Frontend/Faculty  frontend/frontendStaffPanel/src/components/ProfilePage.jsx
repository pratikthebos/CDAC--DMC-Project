import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./ProfilePage.css"; // Import the updated CSS

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No token found, please log in again.");
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const id = decodedToken.facultyId;

            if (!id) {
                setError("User ID missing in token.");
                return;
            }

            axios.get(`http://localhost:5000/api/faculty/getFacultyById/${id}`, {
                headers: { Authorization: `${token}` },
            })
                .then((response) => setUser(response.data))
                .catch(() => setError("Failed to load profile. Please try again."));
        } catch (error) {
            setError("Invalid token, please log in again.");
        }
    }, []);

    if (error) return <div className="error-message">{error}</div>;
    if (!user) return <div className="loading">Loading profile...</div>;

    return (
        <div className="profile-container">
            <h2 className="profile-header">Profile Information</h2>
            {user.photoImageName && (
                <img 
                    src={`http://localhost:5000/uploads/${user.photoImageName}`} 
                    alt="Profile" 
                    className="profile-image"
                />
            )}
            <div className="profile-details">
                <p className="profile-info"><strong>First Name:</strong> {user.firstName}</p>
                <p className="profile-info"><strong>Last Name:</strong> {user.lastName}</p>
                <p className="profile-info"><strong>Email:</strong> {user.email}</p>
                <p className="profile-info"><strong>Course ID:</strong> {user.courseId || "N/A"}</p>
                <p className="profile-info"><strong>Address:</strong> {user.address || "N/A"}</p>
                <p className="profile-info">
                    <strong>Birth Date:</strong> {user.birthDate ? new Date(user.birthDate).toLocaleDateString() : "N/A"}
                </p>
                <p className="profile-info">
                    <strong>Gender:</strong> {user.gender === "M" ? "Male" : user.gender === "F" ? "Female" : "Other"}
                </p>
            </div>
        </div>
    );
};

export default Profile;
