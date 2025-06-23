import React, { useState, useRef, useEffect } from "react";

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const modalRef = useRef(null);

  // Close modal when clicking outside of modal-content
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isModalOpen]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = () => {
    const { username, email, phone, dob } = formData;

    if (!username) {
      alert("Please fill out the username field.");
      return;
    }

    if (!email) {
      alert("Please fill out the email field.");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    if (!phone) {
      alert("Please fill out the phone field.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    if (!dob) {
      alert("Please fill out the dob field.");
      return;
    }

    const selectedDate = new Date(dob);
    const today = new Date();
    if (selectedDate > today) {
      alert("Invalid date of birth. Please select a valid date.");
      return;
    }

    // All validations passed
    setIsModalOpen(false);
    setFormData({
      username: "",
      email: "",
      phone: "",
      dob: "",
    });
  };

  return (
    <div className="modal">
      {!isModalOpen && (
        <button onClick={() => setIsModalOpen(true)}>Open Form</button>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <h2>Fill the Form</h2>
            <div>
              <label htmlFor="username">Username: </label>
              <input id="username" type="text" value={formData.username} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="email">Email: </label>
              <input id="email" type="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="phone">Phone: </label>
              <input id="phone" type="text" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="dob">Date of Birth: </label>
              <input id="dob" type="date" value={formData.dob} onChange={handleInputChange} />
            </div>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
