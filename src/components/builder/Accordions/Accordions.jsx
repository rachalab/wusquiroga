"use client";

import { useState } from "react";

function Accordions({ firstOpen = true, accordion = [] }) {

  return (
    <div className="accordions-block">
      {accordion.map((item, index) => (
        <div key={index} className="accordion-item">
            <h3>
            {item.title}
            </h3>
          
            <div
              className="accordion-text"
              dangerouslySetInnerHTML={{ __html: item.text }}
            />

        </div>
      ))}
    </div>
  );
}

export default Accordions;
