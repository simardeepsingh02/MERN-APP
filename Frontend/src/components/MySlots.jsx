import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const MySlots = () => {
  const email = sessionStorage.getItem("userId");

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();

  const getData = useCallback(async () => {
    try {
      const response = await fetch(`https://astro-y23d.onrender.com/slots-by-email/${email}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
      }

      if (response.ok) {
        setData(result);
        setError("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    }
  }, [email]);

  useEffect(() => {
    const loggedUserId = sessionStorage.getItem("userId");
    if (!loggedUserId) {
      // If the user is not logged in, set authenticated to false
      setAuthenticated(false);
    } else {
      // If the user is logged in, fetch data
      getData();
    }
  }, [getData]);

  function formatDate(date) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  function formatTimeRange(startTime, endTime) {
    const options = { hour: "numeric", minute: "2-digit" };

    const formattedStartTime = new Date(startTime).toLocaleTimeString([], options);
    const formattedEndTime = new Date(endTime).toLocaleTimeString([], options);

    return `${formattedStartTime} - ${formattedEndTime}`;
  }

  if (!authenticated) {
    navigate("/"); // Redirect to the login page
    return null; // You can also return an empty component or a loading indicator
  }

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger"> {error} </div>}
      <div className="row">
        {data?.map((ele) => (
          <div key={ele._id} className="col-6 col-sm-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Date: {formatDate(ele.startTime)}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Time: {formatTimeRange(ele.startTime, ele.endTime)}
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySlots;
