import React, { Fragment } from "react";
import "./Data.css";
const Data = (props) => {
  const data = props.data;

  const codechefData = data.codechefData;
  // console.log(codechefData);

  return (
    <Fragment>
      <main id="main">
        <div className="container data mt-5 pt-5 pb-5">
          <div className="row">
            <div className="codechef col-12 mt-3 mb-4">
              <h3>CODECHEF</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <h5>
                <span>Name:</span> {data.user.name}
              </h5>
            </div>
            <div className="col-sm-6">
              <h5>
                <span>User Name:</span> {codechefData.username}
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <h5>
                <span>Profession:</span> {codechefData.profession}
              </h5>
            </div>
            <div className="col-sm-6">
              <h5>
                <span>Institution:</span> {codechefData.institution}
              </h5>
            </div>
            <h5 className="mt-4">
              <span>Recent Activities:</span>
              {codechefData.recentActivities.map((activity) => (
                <li>{activity}</li>
              ))}
            </h5>
          </div>
        </div>

        <div className="container data mt-4 pb-5 mb-5">
          <div className="row">
            <div className="codechef col-12 mt-3 mb-4">
              <h3>CODEFORCES</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <h5>
                <span>Name:</span> Aditya Sinha
              </h5>
            </div>
            <div className="col-sm-6">
              <h5>
                <span>User Name:</span> aditya@123
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <h5>
                <span>Profession:</span> Student
              </h5>
            </div>
            <div className="col-sm-6">
              <h5>
                <span>Institution:</span> Chandigarh University
              </h5>
            </div>
            <h5 className="mt-4">
              <span>Recent Activities:</span>{" "}
            </h5>
          </div>
        </div>
        <div className="container data mt-4 pb-5">
          <div className="row">
            <div className="codechef col-12 mt-3 mb-4">
              <h3>HACKERRANK</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <h5>
                <span>Name:</span> Aditya Sinha
              </h5>
            </div>
            <div className="col-sm-6">
              <h5>
                <span>User Name:</span> aditya@123
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <h5>
                <span>Profession:</span> Student
              </h5>
            </div>
            <div className="col-sm-6">
              <h5>
                <span>Institution:</span> Chandigarh University
              </h5>
            </div>
            <h5 className="mt-4">
              <span>Recent Activities:</span>{" "}
            </h5>
          </div>
        </div>
      </main>
    </Fragment>
  );
};
export default Data;
