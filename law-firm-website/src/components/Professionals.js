import React, { useState } from "react";
import "../styles/Professionals.css";

const professionals = [
    {
        id: 1,
        img: "/images/1.jpg",
        name: "John Doe",
        email: "johndoe@aco-law.com",
        role: "Associate",
        background: `John has worked in various commercial disputes, with a focus on intellectual property and restructuring.`,
        experience: `John has over 5 years of experience in commercial litigation and corporate law.`,
    },
    {
        id: 2,
        img: "/images/2.jpg",
        name: "Jane Smith",
        email: "janesmith@aco-law.com",
        role: "Senior Associate",
        background: `Jane specializes in family law and legal consulting for startups.`,
        experience: `With 8 years in the legal field, Jane has helped several tech companies navigate complex legal landscapes.`,
    },
    {
        id: 3,
        img: "/images/3.jpg",
        name: "Mike Johnson",
        email: "mikejohnson@aco-law.com",
        role: "Partner",
        background: `Mike is a partner at the firm, focusing on real estate and commercial disputes.`,
        experience: `Mike has been in practice for over 10 years, handling high-profile real estate litigation cases.`,
    },
    {
        id: 4,
        img: "/images/4.jpg",
        name: "John Doe",
        email: "johndoe@aco-law.com",
        role: "Associate",
        background: `John has worked in various commercial disputes, with a focus on intellectual property and restructuring.`,
        experience: `John has over 5 years of experience in commercial litigation and corporate law.`,
    },
    {
        id: 5,
        img: "/images/5.jpg",
        name: "Jane Smith",
        email: "janesmith@aco-law.com",
        role: "Senior Associate",
        background: `Jane specializes in family law and legal consulting for startups.`,
        experience: `With 8 years in the legal field, Jane has helped several tech companies navigate complex legal landscapes.`,
    },
    {
        id: 6,
        img: "/images/1.jpg",
        name: "Mike Johnson",
        email: "mikejohnson@aco-law.com",
        role: "Partner",
        background: `Mike is a partner at the firm, focusing on real estate and commercial disputes.`,
        experience: `Mike has been in practice for over 10 years, handling high-profile real estate litigation cases.`,
    },
    {
        id: 7,
        img: "/images/5.jpg",
        name: "Jane Smith",
        email: "janesmith@aco-law.com",
        role: "Senior Associate",
        background: `Jane specializes in family law and legal consulting for startups.`,
        experience: `With 8 years in the legal field, Jane has helped several tech companies navigate complex legal landscapes.`,
    },
    {
        id: 8,
        img: "/images/1.jpg",
        name: "Mike Johnson",
        email: "mikejohnson@aco-law.com",
        role: "Partner",
        background: `Mike is a partner at the firm, focusing on real estate and commercial disputes.`,
        experience: `Mike has been in practice for over 10 years, handling high-profile real estate litigation cases.`,
    },
    
];

const Professionals = () => {
    const [expandedProfessionalId, setExpandedProfessionalId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedProfessionalId(expandedProfessionalId === id ? null : id);
    };

    return (
        <div className="professionals-section">
            <h2 className="section-title">OUR PROFESSIONALS</h2>
            <div className="professionals-grid">
                {professionals.map((pro) => (
                    <div
                        key={pro.id}
                        className={`professional-card ${expandedProfessionalId === pro.id ? "expanded" : ""}`}
                        onClick={() => toggleExpand(pro.id)}
                    >
                        <img src={pro.img} alt={pro.name} />
                        <div className="professional-name">{pro.name}</div>
                        {expandedProfessionalId === pro.id && (
                            <div className="professional-details">
                                <p><strong>Role:</strong> {pro.role}</p>
                                <p><strong>Email:</strong> {pro.email}</p>
                                <p><strong>Background:</strong> {pro.background}</p>
                                <p><strong>Experience:</strong> {pro.experience}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Professionals;