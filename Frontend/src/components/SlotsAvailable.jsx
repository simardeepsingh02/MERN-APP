import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SlotsAvailable = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [authenticated, setAuthenticated] = useState(true); // Change to false initially
  const navigate = useNavigate();

  async function getData() {
    const response = await fetch("https://astro-y23d.onrender.com/available-slots");
    const result = await response.json();
    console.log("result..", result);
    if (!response.ok) {
      setError(result.error);
    }

    if (response.ok) {
      setData(result);
      setError("");
    }
  }
  async function handleBook(id) {
    const response = await fetch(`https://astro-y23d.onrender.com/book-slot/${id}`, {
      method: "PUT",
      body: JSON.stringify({ email: "example@example.com" }),
    });

    const result1 = await response.json();
    if (!response.ok) {
      setError(result1.error);
    }
    if (response.ok) {
      console.log("booked", response.ok);
      setError("Booked Successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
  }
  useEffect(() => {
    const loggedUserId = sessionStorage.getItem("userId");
    if (!loggedUserId) {
      // If user is not logged in, set authenticated to false
      setAuthenticated(false);
    } else {
      // If user is logged in, fetch data
      getData();
    }
  }, []);

  if (!authenticated) {
    navigate("/"); // Redirect to the login page
    return null; // You can also return an empty component or a loading indicator
  }
  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger"> {error} </div>}
      <div className="row">
        {data?.map((ele) => (
          <div key={ele._id} className="col-3">
            <div className="card">
              <div className="card-body">
              <h5 className="card-title">
                Date: {new Date(ele.startTime).toLocaleDateString()}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Time: {new Date(ele.startTime).toLocaleTimeString()} -{" "}
                {new Date(ele.endTime).toLocaleTimeString()}
              </h6>
              <Link
                  className="card-link"
                  onClick={() => handleBook(ele._id)}
              >
                Book
              </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotsAvailable;