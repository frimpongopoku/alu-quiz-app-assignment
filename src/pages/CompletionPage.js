import React, { Component } from "react";
import Confetti from "react-confetti";
import cup from "./../media/cup.png";
import trash from "./../media/trash.jpeg";
export default class CompletionPage extends Component {
  renderLoaders() {
    const { sheet } = this.props;
    return (sheet || []).map((obj, index) => {
      return (
        <div key={index.toString()} style={{ marginTop: 6 }}>
          <h3>
            <a
              target="_blank"
              href={obj.question.topic.resources}
              style={obj.wasRight ? { color: "green" } : { color: "maroon" }}
            >
              {obj.question.topic.title}
            </a>
          </h3>
          <div style={{ width: "70%" }}>
            <div
              style={
                obj.wasRight
                  ? { border: "solid 2px green", width: "100%", height: 20 }
                  : { border: "solid 2px maroon", width: "100%", height: 20 }
              }
            >
              <div
                className="loader"
                style={
                  obj.wasRight
                    ? { width: "80%", height: 16, background: "green" }
                    : { width: "15%", height: 16, background: "maroon" }
                }
              ></div>
            </div>
          </div>
        </div>
      );
    });
  }

  calculateTotal() {
    const { sheet } = this.props;
    var earned = 0;
    var total = 0;
    (sheet || []).forEach((obj) => {
      earned += obj.pointsEarned;
      total += obj.question.points;
    });

    return { score: Number(earned / total) * 100, total, earned };
  }
  render() {
    const { score } = this.calculateTotal();
    return (
      <div className="complete-modal-container">
        <div style={{ zIndex: 14 }}>
          <Confetti numberOfPieces={score < 50 ? 30 : 300} />
        </div>

        <div className="complete-overlay"></div>
        <div className="complete-modal-body lift">
          <div className="row" style={{ marginTop: "10%" }}>
            <div className="col-md-6 col-lg-6 col-sm-6 col-xs-12">
              <center>
                <img
                  src={score < 50 ? trash : cup}
                  style={{ height: 200 }}
                  alt="reward media"
                />
                <h1
                  className="raw-score"
                  style={score < 50 ? { color: "maroon" } : {}}
                >
                  {score}%
                </h1>

                <p style={{ fontWeight: "bold", color: "grey", fontSize: 13 }}>
                  Use the button below to compare your <br /> answers to the
                  right ones
                </p>
                <button
                  className="review-work-btn"
                  onClick={() => {
                    this.props.toggleReviewMode(true);
                    this.props.toggleModal(false);
                  }}
                >
                  Review My Work
                </button>
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
                target="_blank"
                href="https://www.w3schools.com/css/"
                style={{
                  fontSize: 26,
                  textDecoration: "underline",
                  color: "maroon",
                }}
              >
                Resources To Learn From
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
