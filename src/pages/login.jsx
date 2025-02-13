import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import iitblogo from '../assets/iitblogo.jpeg'
import zplogo from '../assets/zplogo.jpeg'

const Login = () => {
  const [userName, setUserName] = React.useState("")
  const [phoneNum, setPhoneNum] = React.useState("")
  const navigate = useNavigate();
  return (
    <div style={{ padding: "0px", textAlign: "center", width: "100vw", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
      <div style={{ background: "linear-gradient(to right, #000000, #242424)", color: "white", height: "750px", width: "650px", borderRadius: "30px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: "30px", textAlign: "center", }}>
        <h1 style={{ fontSize: "50px", fontWeight: "550", marginBottom: "20px", textAlign: "left", }}>
          Pavement Condition Index (PCI) Dashboard
        </h1>
        <div style={{ height: "120px" }}></div>
        <div style={{ display: "flex", alignItems: "center",gap: "15px", textAlign: "left",  }}>
          <img src={iitblogo} alt="IITB Logo" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
          <h3 style={{ fontSize: "26px",fontFamily:"cursive", fontWeight: "100", fontStyle:"italic",margin: 0,letterSpacing:"2px"  }}>IITB - Unnat Maharashtra Abhiyan </h3>
        </div>
        <h3 style={{ fontSize: "20px", fontWeight: "100", fontFamily:"cursive", margin: "20px 0", marginLeft:"200px" }}>in collaboration with</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "15px",textAlign: "left" }}>
          <img src={zplogo} alt="Zilla Parishad Logo" style={{ width: "120px", height: "120px", borderRadius: "50%" }} />
          <h3 style={{ fontSize: "26px", fontFamily:"cursive", fontWeight: "100",fontStyle:"italic", margin: 0,letterSpacing:"2px"  }}>Zilla Parishad, Ratnagiri</h3>
        </div>
      </div>
      <div style={{ borderRadius: "30px", width: "400px", height: "500px", backgroundColor: "#343434", padding: "10px" }}>
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            textAlign: "left",
            padding: "20px"
          }}
        >
          Login
        </h1>
        <div style={{ height: "10px" }}></div>
        <input
          type="text"
          style={{ width: "85%", height: "25px", padding: "0.5rem 1rem", backgroundColor: "#2D2D2D", color: "#D1D5DB", border: "1px solid #5b5686", outline: "none", fontSize: "0.8rem", transition: "box-shadow 0.2s", borderRadius: "15px" }}
          placeholder="Username / Email"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <div style={{ height: "30px" }}></div>
        <input
          type="text"
          style={{ width: "85%", padding: "0.5rem 1rem", height: "25px", backgroundColor: "#2D2D2D", color: "#D1D5DB", border: "1px solid #5b5686", outline: "none", fontSize: "0.8rem", transition: "box-shadow 0.2s", borderRadius: "15px" }}
          placeholder="Phone Number"
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
        />
        <div style={{ height: "10px" }}></div>
        <div style={{ textAlign: "right", marginBottom: "1.5rem" }}>
          <a href="#" style={{ fontSize: "0.875rem", color: "#fff", textDecoration: "none", cursor: "pointer", }} >
            Forgot Password?
          </a>
        </div>
        <button
          type="submit"
          style={{ width: "90%", padding: "0.5rem", height: "40px", backgroundColor: "#fff", color: "black", borderRadius: "0.5rem", fontWeight: "200", fontSize: "1rem", cursor: "pointer", border: "none", transition: "background-color 0.2s", }}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "#474646", e.target.style.color = "#fff")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "#fff", e.target.style.color = "#000")
          }
          onClick={async () => {
            try {
              const response = await axios.post('http://127.0.0.1:5000/user_login', {
                username: userName,
                phone: phoneNum
              });

              if (response.data.success) {
                // alert("Welcome to PCI Dashboard");
                navigate('/');  // Redirect to Dashboard on successful login
              } else {
                alert("No such user exists");
              }
            } catch (error) {
              const errorMessage = error.response?.data?.message || "An error occurred";
              alert(errorMessage);
            }
          }}
        >Login</button>

        <div style={{ height: "60px" }}></div>

        <button
          type="submit"
          style={{ width: "90%", padding: "0.5rem", height: "40px", backgroundColor: "#fff", color: "black", borderRadius: "0.5rem", fontWeight: "200", fontSize: "1rem", cursor: "pointer", border: "none", transition: "background-color 0.2s", }}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "#474646", e.target.style.color = "#fff")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "#fff", e.target.style.color = "#000")
          }
        >Don't have an account? Register</button>
      </div>
    </div>
  )
}

export default Login