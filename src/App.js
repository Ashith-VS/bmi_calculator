import React, { useState } from "react";
import Chart from "./Components/Chart";

const App = () => {
  const [show, setShow] = useState({
    standard: true,
    metric: false,
    standardRes: false,
    metricRes: false,
    graph: false,
  });
  // console.log(show);

  const [state, setState] = useState({
    standard: { bmi: "", category: "" },
    metric: { bmi: "", category: "" },
  });

  const [formData, setFormData] = useState({
    heightInFeet: "",
    heightInInches: "",
    weightInPounds: "",
    height: "",
    weight: "",
  });

  const MetricCalculation = () => {
    if (formData.weight && formData.height) {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      if (!isNaN(weight) && !isNaN(height)) {
        const h = height / 100;
        const res = weight / (h * h);
        // console.log(res);
        const category = getBMICategory(res);
        setState({ ...state, metric: { bmi: res.toFixed(1), category } });
        res && setShow({ ...show, metricRes: true, graph: true });
        return res;
      }
    }
  };

  const StandardCalculation = () => {
    if (
      formData.heightInFeet &&
      formData.heightInInches &&
      formData.weightInPounds
    ) {
      const height = parseFloat(formData.heightInFeet);
      const heightInches = parseFloat(formData.heightInInches);
      const weight = parseFloat(formData.weightInPounds);
      if (!isNaN(height) && !isNaN(heightInches) && !isNaN(weight)) {
        const totalinches = height * 12 + heightInches;
        const res = (weight / (totalinches * totalinches)) * 703;
        // console.log(res);
        const category = getBMICategory(res);
        setState({ ...state, standard: { bmi: res.toFixed(1), category } });
        res && setShow({ ...show, standardRes: true, graph: true });
        return res;
      }
    }
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    else if (bmi < 25) return "Normal";
    else if (bmi < 30) return "Overweight";
    else return "Obesity";
  };

  const handleSubmit = () => {
    MetricCalculation();
    StandardCalculation();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container mt-5">
      <div className="main">
        <button
          className="btn btn-secondary mx-4  mb-5"
          onClick={() =>
            setShow({ ...show, standard: true, metric: false, graph: false })
          }
        >
          Standard
        </button>
        <button
          className="btn btn-secondary mx-4 mb-5"
          onClick={() =>
            setShow({ ...show, metric: true, standard: false, graph: false })
          }
        >
          Metric
        </button>

        {show.standard && (
          <div className="standard">
            <h3>Standard</h3>
            <div className="standardContainer">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label" htmlFor="">
                  Your Height :
                </label>
                <div className="col-sm-2">
                  <input
                    type="text"
                    className="form-control"
                    name="heightInFeet"
                    onChange={handleChange}
                    value={formData.heightInFeet}
                  />
                </div>
                <span className="col-sm-1">(feet)</span>
                <div className="col-sm-2">
                  <input
                    type="text"
                    className="form-control"
                    name="heightInInches"
                    onChange={handleChange}
                    value={formData.heightInInches}
                  />
                </div>
                <span className="col-sm-1">(inches)</span>
              </div>
              <div className="form-group row mt-2">
                <label className="col-sm-2 col-form-label" htmlFor="">
                  Your Weight :
                </label>
                <div className="col-sm-2">
                  <input
                    type="text"
                    className="form-control"
                    name="weightInPounds"
                    onChange={handleChange}
                    value={formData.weightInPounds}
                  />
                </div>
                <span className="col-sm-1">(pounds)</span>
              </div>

              <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                Compute BMI
              </button>

              {show.standardRes && (
                <div className="form-group row mt-3">
                  <label className="col-sm-2 col-form-label" htmlFor="">
                    Your BMI :
                  </label>
                  <div className="col-sm-2">
                    <input
                      type="text"
                      className="form-control"
                      value={state.standard.bmi}
                      disabled
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {show.metric && (
          <div className="metric">
            <h3>Metric</h3>
            <div className="metricContainer">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label" htmlFor="">
                  Your Height :
                </label>
                <div className="col-sm-2">
                  <input
                    type="text"
                    className="form-control"
                    name="height"
                    onChange={handleChange}
                    value={formData.height}
                  />
                </div>
                <span className="col-sm-1">(centimeters)</span>
              </div>
              <div className="form-group row mt-2">
                <label className="col-sm-2 col-form-label" htmlFor="">
                  Your Weight :
                </label>
                <div className="col-sm-2">
                  <input
                    type="text"
                    className="form-control"
                    name="weight"
                    onChange={handleChange}
                    value={formData.weight}
                  />
                </div>
                <span className="col-sm-1">(kilograms)</span>
              </div>
              <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                Compute BMI
              </button>
              {show.metricRes && (
                <div className="form-group row mt-3">
                  <label className="col-sm-2 col-form-label" htmlFor="">
                    Your BMI :
                  </label>
                  <div className="col-sm-2">
                    <input
                      type="text"
                      className="form-control"
                      value={state.metric.bmi}
                      disabled
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* graph */}
      {show.graph && (
        <div
          className="chart"
          style={{
            position: "relative",
          }}
        >
          <Chart />
          <div
            style={{
              position: "absolute",
              top: "80%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <div>
              {state.metric.bmi} {state.metric.category}
            </div>
            <div>
              {state.standard.bmi} {state.standard.category}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
