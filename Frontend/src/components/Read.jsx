import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [authenticated, setAuthenticated] = useState(true); // Change to false initially
  const navigate = useNavigate();
  async function handleDelete(id) {
    const response = await fetch(`https://astro-y23d.onrender.com/${id}`, {
      method: "DELETE",
    });

    const result1 = await response.json();
    if (!response.ok) {
      setError(result1.error);
    }
    if (response.ok) {
      console.log("deleted", response.ok);
      setError("Deleted Successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
  }

  async function getData() {
    const response = await fetch("https://astro-y23d.onrender.com/");
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
          <div key={ele._id} className="col-6 col-sm-3"S>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p className="card-text">{ele.age}</p>
                <Link to={`/edit/${ele.email}`} className="card-link">
                  Edit
                </Link>
                <Link
                  className="card-link"
                  onClick={() => handleDelete(ele._id)}
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
