import React, { Component } from "react";
import cup from "./../media/cup.png";
export default class CompletionPage extends Component {
  renderLoaders() {
    return [3, 4, 5, 6, 8].map((item, index) => {
      return (
        <>
          <h3>CSS Positioning</h3>
          <div style={{ width: "70%" }}>
            <div
              style={{ border: "solid 2px green", width: "100%", height: 20 }}
            >
              <div
                className="loader"
                style={{ width: "80%", height: 16, background: "green" }}
              ></div>
            </div>
          </div>
        </>
      );
    });
  }
  render() {
    return (
      <div className="row" style={{ marginTop: "10%" }}>
        <div className="col-md-6 col-lg-6 col-sm-6 col-xs-12">
          <center>
            <img src={cup} style={{ height: 200 }} alt="reward media" />
            <h1 className="raw-score">85%</h1>
          </center>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-6 col-xs-12">
          <h3>
            <b>QUIZ BREAK DOWN</b>
          </h3>
          {this.renderLoaders()}
          <br />
          <br />
          <a
            href="#void"
            style={{
              fontSize: 26,
              textDecoration: "underline",
              color: "maroon",
            }}
          >
            Resourses To Learn From
          </a>
        </div>
      </div>
    );
  }
}
