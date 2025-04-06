import React, { useState } from "react";
import "../styles/practice.css"; 

const practiceAreas = [
    { title: "Intellectual Property", content: "Content for Intellectual Property" },
    { title: "Suspension of Payment/Bankruptcy Law & Debt Recovery", content: "Content for Suspension of Payment/Bankruptcy Law & Debt Recovery" },
    { title: "Corporate and Investment", content: "Content for Corporate and Investment" },
    { title: "Mergers & Acquisitions", content: "Content for Mergers & Acquisitions" },
    { title: "Antitrust & Competition Law", content: "Content for Antitrust & Competition Law" },
    { title: "Dispute Resolution", content: "Content for Dispute Resolution" },
    { title: "Family Law", content: "Content for Family Law" },
    { title: "Private Data Protection", content: "Content for Private Data Protection" }
];

const PracticeAreas = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="practice-container">
            {/* Add the title at the top of the section */}
            <h1 className="practice-title">AREAS OF PRACTICE</h1>
            
            <div className="practice-content">
                <div className="practice-list">
                    <ul>
                        {practiceAreas.map((area, index) => (
                            <li
                                key={index}
                                className={index === activeIndex ? "active" : ""}
                                onClick={() => setActiveIndex(index)}
                            >
                                {area.title}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="practice-text">
                    <h2>{practiceAreas[activeIndex].title}</h2>
                    <p>{practiceAreas[activeIndex].content}</p>
                </div>
            </div>
        </div>
    );
};

export default PracticeAreas;
