import React, { useEffect,useState,useCallback } from "react";
import { useNavigate } from "react-router-dom";

const MySlots = () => {
    const email = sessionStorage.getItem("userId");

  const [data, setData] = useState();
  const [error, setError] = useState();
  const [authenticated,setAuthenticated] = useState(true); // Change to false initially
  const navigate = useNavigate();

  const getData = useCallback(async () => {
    const response = await fetch(`https://astro-y23d.onrender.com/slots-by-email/${email}`);
    const result = await response.json();
    console.log("result..", result);
    if (!response.ok) {
      setError(result.error);
    }
  
    if (response.ok) {
      setData(result);
      setError("");
    }
  }, [email]);
  useEffect(() => {
    const loggedUserId = sessionStorage.getItem("userId");
    if (!loggedUserId) {
      // If user is not logged in, set authenticated to false
      setAuthenticated(false);
    } else {
      // If user is logged in, fetch data
      getData();
    }
  }, [getData]);
  if (!authenticated) {
    navigate("/"); // Redirect to the login page
    return null; // You can also return an empty component or a loading indicator
  }
  return (
    <div className="container my-2">
  {error && <div className="alert alert-danger"> {error} </div>}
  <div className="row">
    {data?.map((ele) => (
      <div key={ele._id} className="col-6 col-sm-3"> {/* Use col-12 col-sm-6 here */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Date: {new Date(ele.startTime).toLocaleDateString()}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Time: {new Date(ele.startTime).toLocaleTimeString()} -{" "}
              {new Date(ele.endTime).toLocaleTimeString()}
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
