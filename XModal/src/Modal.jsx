import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import "./Modal.css";
const ModalC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const modalRef = useRef(null);

  
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, phone, dob } = formData;

    // if (!username) {
    //   alert("Please fill out the username field.");
    //   return;
    // }

    // if (!email) {
    //   alert("Please fill out the email field.");
    //   return;
    // }

    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // if (!phone) {
    //   alert("Please fill out the phone field.");
    //   return;
    // }

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

    
    setIsModalOpen(false);
    setFormData({
      username: "",
      email: "",
      phone: "",
      dob: "",
    });
  };

  return (
    <div className="main">
      <h1>User Details Modal</h1>
      {/* {!isModalOpen && ( */}
        <button className="btn" onClick={() => setIsModalOpen(true)}>Open Form</button>
      {/*  )} */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modalCC"
        overlayClassName="modal"
      >
        <form className="modal-content" ref={modalRef} onSubmit={handleSubmit}>
          <h2>Fill the Form</h2>
          <div>
            <label htmlFor="username">Username: </label>
            <br />
            <input id="username" type="text" value={formData.username} required onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <br />
            <input id="email" type="email" value={formData.email} required onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="phone">Phone: </label>
            <br />
            <input id="phone" type="text" value={formData.phone} required onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="dob">Date of Birth: </label>
            <br />
            <input id="dob" type="date" value={formData.dob} required onChange={handleInputChange} />
          </div>
          <br />
          <button className="submit-button btn" type="submit">Submit</button>
        </form>

      </Modal>

    </div>
  );
};

export default ModalC;
