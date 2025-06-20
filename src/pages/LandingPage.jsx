// import React from 'react'
// import './css/LandingPage.css'
// import roadLP2 from '../assets/roadLP2.png';
// import 'animate.css'
// // import ScrollAnimation from 'react-animate-on-scroll'
// import Login from "./login";
// import { useNavigate } from 'react-router-dom';
// import NavBar from '../components/navBar';

// const LandingPage = () => {
//     const navigate = useNavigate();
//     return (
//         <div style={{ maxWidth: "100vw", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
//             <NavBar />
//             <div style={{
//                 backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${roadLP2})`, height: "100vh", maxWidth: "100vw", width: "98.9vw", backgroundSize: "cover",
//                 backgroundRepeat: "no-repeat", display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column"
//             }} >
//                 <div style={{ width: "50vw", }}>
//                     <p style={{ color:"white",fontSize: "100px", margin: "auto",marginLeft:"10%", letterSpacing: "0.2rem", fontWeight: "300",alignItems:"center" }}>Pavement Condition Index (PCI)</p>
//                 </div>
//             </div>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "center",backgroundColor:" #2f2f2f" }}>
//                 <div style={{ marginTop:"50px",display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "76vw" }}>
//                     <div style={{ width: "30vw", borderRadius: "5px", borderColor: "wheat",background: "linear-gradient(to bottom,rgba(131, 131, 131, 0.23),rgba(255, 255, 255, 0.44))", padding: "30px" }}>
//                         <p style={{color:"white"}}>The PCI also called the Pavement Condition Index, provides a measure of the present condition of pavement based on distress observed at the surface of pavement; it provides an objective and rational basis for determining maintenance and repair needs and priorities. Continuous monitoring of the PCI is used to establish the rate of pavement deterioration, which permits early identification of major rehabilitation needs.
//                         </p>
//                     </div>
//                     <div style={{ width: "30vw", background: "linear-gradient(to bottom,rgba(131, 131, 131, 0.23),rgba(255, 255, 255, 0.44))", borderRadius: "5px", borderColor: "wheat", padding: "30px" }}>
//                         <p style={{color:"white"}}>Rural roads comprise 85% of India's total road network. The existing method to calculate or estimate PCI is an index based on visual inspection or driving speed or riding comfort that would be applied to determine upgrade and maintenance priorities. This existing method lacks technicality and standardization rely on subjective visual assessments or vehicle speed. Hence, visually it is challenging to estimate PCI.
//                         </p>
//                     </div>
//                 </div>
//                 <div style={{ marginTop:"50px",width: "70vw", background: "linear-gradient(to bottom,rgba(131, 131, 131, 0.23),rgba(255, 255, 255, 0.44))", borderRadius: "5px", borderColor: "wheat", padding: "30px",marginBottom:"15%" }}>
//                     {/* <ScrollAnimation animateIn='animate__animated animate__flipInX' > */}
//                     <p style={{color:"white"}} >The Indian Institute of Technology, Bombay (IITB) in collaboration with Zilla Parishad, Ratnagiri developed a simple mobile application to address this issue by automating the estimation of road pavement conditions using data from in-built smartphone sensors like accelerometers and GPS. The collected data is used to compute the Pavement Condition Index (PCI), which helps in prioritizing budget allocation and planning road quality improvement strategies. The project includes the development of a mobile app for data collection, a central database for storing and analyzing the data, and a model to relate raw sensor data to the PCI. This solution will provide an efficient and scalable way to monitor and prioritize road maintenance work. </p>
//                     {/* </ScrollAnimation> */}
//                 </div>
//             </div>
//             <footer style={{marginTop:"200px",backgroundColor: "#333",color: "#fff", textAlign: "center",padding: "20px",bottom: "0",width: "100%", }}>
//                 <p>&copy; {new Date().getFullYear()} Pavement Condition Index. Zilla Parishad, Ratnagiri in collaboration with IITB - Unnat Maharashtra Abhiyan. All rights reserved.</p>
//             </footer>
//         </div>
//     )
// }

// export default LandingPage;

import React from 'react';
import './css/LandingPage.css';
import roadLP2 from '../assets/roadLP2.png';
import 'animate.css';
import Login from "./login";
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navBar';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            maxWidth: "100vw",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            backgroundColor: "#2f2f2f",
            color: "white",
            fontFamily: "sans-serif"
        }}>
            <NavBar />

            {/* Hero Section */}
            <div style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${roadLP2})`,
                backgroundSize: "cover",
                // backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "0 5vw"
            }}>
                <h1 style={{
                    fontSize: "8vw",
                    fontWeight: "300",
                    letterSpacing: "0.15rem",
                    lineHeight: 1.2,
                    maxWidth:"50vw",
                    marginRight:"10vw",
                    fontFamily: "'Poppins', sans-serif",
                }}>
                    Pavement Condition Index (PCI)
                </h1>
            </div>

            {/* Info Section */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "60px 20px"
            }}>
                {/* Two Info Boxes */}
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "30px",
                    maxWidth: "1100px",
                    width: "100%"
                }}>
                    {[...Array(2)].map((_, index) => (
                        <div key={index} style={{
                            flex: "1 1 300px",
                            maxWidth: "500px",
                            background: "linear-gradient(to bottom, rgba(131,131,131,0.23), rgba(255,255,255,0.44))",
                            borderRadius: "8px",
                            padding: "25px",
                            lineHeight: "1.6",
                            border: "1px solid wheat",
                        }}>
                            <p>
                                {index === 0
                                    ? "The PCI also called the Pavement Condition Index, provides a measure of the present condition of pavement based on distress observed at the surface of pavement; it provides an objective and rational basis for determining maintenance and repair needs and priorities. Continuous monitoring of the PCI is used to establish the rate of pavement deterioration, which permits early identification of major rehabilitation needs."
                                    : "Rural roads comprise 85% of India's total road network. The existing method to calculate or estimate PCI is an index based on visual inspection or driving speed or riding comfort that would be applied to determine upgrade and maintenance priorities. This existing method lacks technicality and standardization rely on subjective visual assessments or vehicle speed. Hence, visually it is challenging to estimate PCI."
                                }
                            </p>
                        </div>
                    ))}
                </div>

                {/* Full-width Description */}
                <div style={{
                    marginTop: "50px",
                    maxWidth: "80vw",
                    width: "80vw",
                    background: "linear-gradient(to bottom, rgba(131,131,131,0.23), rgba(255,255,255,0.44))",
                    borderRadius: "8px",
                    padding: "25px",
                    lineHeight: "1.6",
                    border: "1px solid wheat",
                }}>
                    <p>
                        The Indian Institute of Technology, Bombay (IITB) in collaboration with Zilla Parishad, Ratnagiri developed a simple mobile application to address this issue by automating the estimation of road pavement conditions using data from in-built smartphone sensors like accelerometers and GPS. The collected data is used to compute the Pavement Condition Index (PCI), which helps in prioritizing budget allocation and planning road quality improvement strategies. The project includes the development of a mobile app for data collection, a central database for storing and analyzing the data, and a model to relate raw sensor data to the PCI. This solution will provide an efficient and scalable way to monitor and prioritize road maintenance work.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer style={{
                backgroundColor: "#333",
                color: "#fff",
                textAlign: "center",
                padding: "20px 10px",
                width: "100%",
                marginTop: "auto",
                
            }}>
                <p style={{maxWidth:"80vw", margin: "0 auto",}}>
                    &copy; {new Date().getFullYear()} Pavement Condition Index. Zilla Parishad, Ratnagiri in collaboration with IITB - Unnat Maharashtra Abhiyan. All rights reserved.
                </p>
            </footer>
        </div>
    );
}

export default LandingPage;
