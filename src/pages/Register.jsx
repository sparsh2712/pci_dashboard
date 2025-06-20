// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import iitblogo from '../assets/iitblogo.jpeg';
// import zplogo from '../assets/zplogo.jpeg';
// import roadLP2 from '../assets/roadLP2.png';

// const Register = () => {
//   const [userName, setUserName] = useState("");
//   const [phoneNum, setPhoneNum] = useState("");
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       const response = await axios.post('http://127.0.0.1:5000/user_signup', {
//         username: userName,
//         phone: phoneNum,
//         email: email,
//       });

//       if (response.data.success) {
//         alert("Registration successful! You can now log in.");
//         navigate('/');  // or navigate('/login') if you have a separate login route
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "An error occurred during registration";
//       alert(errorMessage);
//     }
//   };

//   return (
//     <div
//       style={{
//         width: "100vw",
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${roadLP2})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         color: "#fff",
//         fontFamily: "'Segoe UI', sans-serif",
//         position: "relative",
//         padding: "20px",
//       }}
//     >
//       <img src={zplogo} alt="Zilla Parishad Logo" style={{ position: "absolute", top: "50px", left: "50px", width: "100px", height: "100px", borderRadius: "50%" }} />
//       <img src={iitblogo} alt="IITB Logo" style={{ position: "absolute", top: "50px", right: "50px", width: "100px", height: "100px", borderRadius: "50%" }} />

//       <div style={{ textAlign: "center", marginBottom: "40px" }}>
//         <h1 style={{ fontSize: "2.8rem", fontWeight: "bold" }}>Register</h1>
//         <p style={{ fontSize: "1rem", fontStyle: "italic", color: "#ddd" }}>
//           - Zilla Parishad, Ratnagiri in collaboration with IITB Unnat Maharashtra Abhiyan
//         </p>
//       </div>

//       <div style={{ backgroundColor: "#2e2e2e", padding: "30px", paddingTop: '10px', borderRadius: "20px", width: "90%", maxWidth: "400px", boxShadow: "0 8px 20px rgba(0,0,0,0.4)" }}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//           style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #666", marginBottom: "15px", backgroundColor: "#1f1f1f", color: "#fff" }}
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #666", marginBottom: "15px", backgroundColor: "#1f1f1f", color: "#fff" }}
//         />

//         <input
//           type="text"
//           placeholder="Phone Number"
//           value={phoneNum}
//           onChange={(e) => setPhoneNum(e.target.value)}
//           style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #666", marginBottom: "15px", backgroundColor: "#1f1f1f", color: "#fff" }}
//         />

//         <button
//           onClick={handleRegister}
//           style={{ width: "100%", padding: "12px", backgroundColor: "#fff", color: "#000", fontWeight: "bold", borderRadius: "10px", border: "none", cursor: "pointer" }}
//         >
//           Register
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import iitblogo from '../assets/iitblogo.jpeg';
import zplogo from '../assets/zplogo.jpeg';
import roadLP2 from '../assets/roadLP2.png';

const Login = () => {
    const [userName, setUserName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/user_signup', {
        username: userName,
        phone: phoneNum,
        email: email,
      });

      if (response.data.success) {
        alert("Registration successful! You can now log in.");
        navigate('/');  // or navigate('/login') if you have a separate login route
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred during registration";
      alert(errorMessage);
    }
  };

  // Responsive style helper
  const isSmallScreen = window.innerWidth < 768;

  return (
    <div
      style={{
        width: "95vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${roadLP2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        fontFamily: "'Segoe UI', sans-serif",
        position: "relative",
        padding: "20px",
      }}
    >
      {/* Top logos */}
      <img
        src={zplogo}
        alt="Zilla Parishad Logo"
        style={{
          position: "absolute",
          top: isSmallScreen ? "20px" : "50px",
          left: isSmallScreen ? "20px" : "50px",
          width: isSmallScreen ? "60px" : "100px",
          height: isSmallScreen ? "60px" : "100px",
          borderRadius: "50%",
        }}
      />
      <img
        src={iitblogo}
        alt="IITB Logo"
        style={{
          position: "absolute",
          top: isSmallScreen ? "20px" : "50px",
          right: isSmallScreen ? "20px" : "50px",
          width: isSmallScreen ? "60px" : "100px",
          height: isSmallScreen ? "60px" : "100px",
          borderRadius: "50%",
        }}
      />

      {/* Heading Section */}
      <div style={{ textAlign: "center", marginBottom: "30px", padding: "0 10px" }}>
        <h1 style={{ fontSize: isSmallScreen ? "1.8rem" : "2.8rem", fontWeight: "bold" }}>
          Pavement Condition Index (PCI) Dashboard
        </h1>
        <p style={{ fontSize: isSmallScreen ? "0.85rem" : "1rem", fontStyle: "italic", color: "#ddd" }}>
          - Zilla Parishad, Ratnagiri in collaboration with IITB Unnat Maharashtra Abhiyan
        </p>
      </div>

      {/* Login Card */}
      <div
        style={{
          backgroundColor: "#2e2e2e",
          padding: isSmallScreen ? "20px" : "30px",
          paddingTop: '10px',
          borderRadius: "20px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.4)"
        }}
      >
        <h2 style={{ fontSize: isSmallScreen ? "1.2rem" : "1.5rem", fontWeight: "bold", marginBottom: "20px" }}>Sign Up</h2>

        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #666",
            marginBottom: "15px",
            backgroundColor: "#1f1f1f",
            color: "#fff",
            fontSize: isSmallScreen ? "0.9rem" : "1rem"
          }}
        />

        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #666",
            marginBottom: "10px",
            backgroundColor: "#1f1f1f",
            color: "#fff",
            fontSize: isSmallScreen ? "0.9rem" : "1rem"
          }}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #666",
            marginBottom: "10px",
            backgroundColor: "#1f1f1f",
            color: "#fff",
            fontSize: isSmallScreen ? "0.9rem" : "1rem"
          }}
        />

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#fff",
            color: "#000",
            fontWeight: "bold",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            marginBottom: "15px",
            fontSize: isSmallScreen ? "0.95rem" : "1rem"
          }}
        >
          Register
        </button>

        <button
          onClick={() => navigate('/login')}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#fff",
            color: "#000",
            fontWeight: "bold",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontSize: isSmallScreen ? "0.95rem" : "1rem"
          }}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Login;

