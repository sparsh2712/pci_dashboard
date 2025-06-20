// import React from 'react'
// import { useState } from 'react'
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import iitblogo from '../assets/iitblogo.jpeg'
// import zplogo from '../assets/zplogo.jpeg'

// const Login = () => {
//   const [userName, setUserName] = React.useState("")
//   const [phoneNum, setPhoneNum] = React.useState("")
//   const navigate = useNavigate();
//   return (
//     <div style={{ padding: "0px", textAlign: "center", width: "100vw", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
//       <div style={{ background: "linear-gradient(to right, #000000, #242424)", color: "white", height: "750px", width: "650px", borderRadius: "30px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: "30px", textAlign: "center", }}>
//         <h1 style={{ fontSize: "50px", fontWeight: "550", marginBottom: "20px", textAlign: "left", }}>
//           Pavement Condition Index (PCI) Dashboard
//         </h1>
//         <div style={{ height: "120px" }}></div>
//         <div style={{ display: "flex", alignItems: "center",gap: "15px", textAlign: "left",  }}>
//           <img src={iitblogo} alt="IITB Logo" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
//           <h3 style={{ fontSize: "26px",fontFamily:"cursive", fontWeight: "100", fontStyle:"italic",margin: 0,letterSpacing:"2px"  }}>IITB - Unnat Maharashtra Abhiyan </h3>
//         </div>
//         <h3 style={{ fontSize: "20px", fontWeight: "100", fontFamily:"cursive", margin: "20px 0", marginLeft:"200px" }}>in collaboration with</h3>
//         <div style={{ display: "flex", alignItems: "center", gap: "15px",textAlign: "left" }}>
//           <img src={zplogo} alt="Zilla Parishad Logo" style={{ width: "120px", height: "120px", borderRadius: "50%" }} />
//           <h3 style={{ fontSize: "26px", fontFamily:"cursive", fontWeight: "100",fontStyle:"italic", margin: 0,letterSpacing:"2px"  }}>Zilla Parishad, Ratnagiri</h3>
//         </div>
//       </div>
//       <div style={{ borderRadius: "30px", width: "400px", height: "500px", backgroundColor: "#343434", padding: "10px" }}>
//         <h1
//           style={{
//             fontSize: "1.875rem",
//             fontWeight: "bold",
//             marginBottom: "1rem",
//             textAlign: "left",
//             padding: "20px"
//           }}
//         >
//           Login
//         </h1>
//         <div style={{ height: "10px" }}></div>
//         <input
//           type="text"
//           style={{ width: "85%", height: "25px", padding: "0.5rem 1rem", backgroundColor: "#2D2D2D", color: "#D1D5DB", border: "1px solid #5b5686", outline: "none", fontSize: "0.8rem", transition: "box-shadow 0.2s", borderRadius: "15px" }}
//           placeholder="Username / Email"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//         />
//         <div style={{ height: "30px" }}></div>
//         <input
//           type="text"
//           style={{ width: "85%", padding: "0.5rem 1rem", height: "25px", backgroundColor: "#2D2D2D", color: "#D1D5DB", border: "1px solid #5b5686", outline: "none", fontSize: "0.8rem", transition: "box-shadow 0.2s", borderRadius: "15px" }}
//           placeholder="Phone Number"
//           value={phoneNum}
//           onChange={(e) => setPhoneNum(e.target.value)}
//         />
//         <div style={{ height: "10px" }}></div>
//         <div style={{ textAlign: "right", marginBottom: "1.5rem" }}>
//           <a href="#" style={{ fontSize: "0.875rem", color: "#fff", textDecoration: "none", cursor: "pointer", }} >
//             Forgot Password?
//           </a>
//         </div>
//         <button
//           type="submit"
//           style={{ width: "90%", padding: "0.5rem", height: "40px", backgroundColor: "#fff", color: "black", borderRadius: "0.5rem", fontWeight: "200", fontSize: "1rem", cursor: "pointer", border: "none", transition: "background-color 0.2s", }}
//           onMouseOver={(e) =>
//             (e.target.style.backgroundColor = "#474646", e.target.style.color = "#fff")
//           }
//           onMouseOut={(e) =>
//             (e.target.style.backgroundColor = "#fff", e.target.style.color = "#000")
//           }
//           onClick={async () => {
//             try {
//               const response = await axios.post('http://127.0.0.1:5000/user_login', {
//                 username: userName,
//                 phone: phoneNum
//               });

//               if (response.data.success) {
//                 // alert("Welcome to PCI Dashboard");
//                 navigate('/');  // Redirect to Dashboard on successful login
//               } else {
//                 alert("No such user exists");
//               }
//             } catch (error) {
//               const errorMessage = error.response?.data?.message || "An error occurred";
//               alert(errorMessage);
//             }
//           }}
//         >Login</button>

//         <div style={{ height: "60px" }}></div>

//         <button
//           type="submit"
//           style={{ width: "90%", padding: "0.5rem", height: "40px", backgroundColor: "#fff", color: "black", borderRadius: "0.5rem", fontWeight: "200", fontSize: "1rem", cursor: "pointer", border: "none", transition: "background-color 0.2s", }}
//           onMouseOver={(e) =>
//             (e.target.style.backgroundColor = "#474646", e.target.style.color = "#fff")
//           }
//           onMouseOut={(e) =>
//             (e.target.style.backgroundColor = "#fff", e.target.style.color = "#000")
//           }
//         >Don't have an account? Register</button>
//       </div>
//     </div>
//   )
// }

// export default Login

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import iitblogo from '../assets/iitblogo.jpeg';
import zplogo from '../assets/zplogo.jpeg';
import roadLP2 from '../assets/roadLP2.png';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const navigate = useNavigate();

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
        <h2 style={{ fontSize: isSmallScreen ? "1.2rem" : "1.5rem", fontWeight: "bold", marginBottom: "20px" }}>Login</h2>

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

        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <a href="#" style={{ fontSize: "0.85rem", color: "#aaa", textDecoration: "none" }}>
            Forgot Password?
          </a>
        </div>

        <button
          onClick={async () => {
            try {
              const response = await axios.post('http://127.0.0.1:5000/user_login', {
                username: userName,
                phone: phoneNum,
              });

              if (response.data.success) {
                navigate('/');
              } else {
                alert("No such user exists");
              }
            } catch (error) {
              const errorMessage = error.response?.data?.message || "An error occurred";
              alert(errorMessage);
            }
          }}
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
          Login
        </button>

        <button
          onClick={() => navigate('/register')}
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
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
};

export default Login;

