import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../Services/axiosInterceptor";

const ChangePassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(`/api/auth/forget-password/${id}/${token}`, input);
  
      if (res.status === 200) {
        alert("Password changed successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error changing password:", error.response?.data?.message || error.message);
  
      // Check if the error is due to JWT expiration
      if (error.response?.data?.message === 'jwt expired') {
        const userConfirmed = window.confirm("JWT token has expired. Do you want to navigate to the login page?");
        if (userConfirmed) {
          // Handle JWT expiration error (e.g., redirect to login page)
          navigate("/login");
        }
      }
    }
  };
  
  

  return (
    <section className="vh-100" style={{ backgroundColor: "#F0F8FF" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://i.pinimg.com/564x/5d/57/df/5d57df6143d566c15191e0382b33f014.jpg"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: " #ff6219" }}
                        ></i>
                        <span className="h1 fw-bold mb-0">Forget Password?</span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Type Your Email Here
                      </h5>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="newPassword"
                          placeholder="Enter New Password"
                          className="form-control form-control-lg"
                          name="newPassword"
                          value={input.newPassword}
                          onChange={(e) =>
                            setInput({
                              ...input,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="confirmPassword"
                          placeholder="Enter Confirm Password"
                          className="form-control form-control-lg"
                          name="confirmPassword"
                          value={input.confirmPassword}
                          onChange={(e) =>
                            setInput({
                              ...input,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Change Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
