import React from 'react';
import { Bar } from 'react-chartjs';
import '../../styles/components/CostGraph.scss';

export default class CostGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lowTicketRange: "1",
      highTicketRange: "30"
    }
  }

  handleChange = (value, field) => {
    const change = {};
    change[field] = value;
    this.setState(change);
  };

  render() {
    const labels = [];
    const data = [];
    let lowestCostNumPeople = parseInt(this.state.lowTicketRange);
    let lowestCostPerPerson = undefined;

    for (let i = lowestCostNumPeople; i <= parseInt(this.state.highTicketRange, 10); i++) {
      labels.push(i);
      let total = 0;

      this.props.rules.forEach((rule) => {
        total += rule.totalCost(i);
      });

      data.push(total / i);

      if (!lowestCostPerPerson) {
        lowestCostPerPerson = total / i;
        lowestCostNumPeople = i;
      } else if ((total / i ) < lowestCostPerPerson) {
        lowestCostPerPerson = total / i;
        lowestCostNumPeople = i;
      }
    }

    const barCharData = {
      labels: labels,
      datasets: [
        {
          label: "Cost Per Person",
          fillColor: "#ff6090",
          strokeColor: "#ff6090",
          highlightFill: "#e91e63",
          highlightStroke: "#e91e63",
          data: data
        }
      ]
    };

    const barCharOptions = {
      scaleFontColor: "#ffffff",
    };

    return (
      <div>
        <Bar data={barCharData} options={barCharOptions} height={300} width={720}/>
        <div className={"cost-graph-options"}>
          <span>
            Ticket Range High:
            <input type="text" className={"number"} value={this.state.lowTicketRange}
                   onChange={(event) => { this.handleChange(event.target.value, "lowTicketRange") }}/>
            &nbsp;
            Ticket Range Low:
            <input type="text" className={"number"} value={this.state.highTicketRange}
                   onChange={(event) => { this.handleChange(event.target.value, "highTicketRange") }}/>
            <br />
            Lowest cost per person:
            &nbsp;
            <span className={"variable"}>
              {lowestCostPerPerson}
            </span>
            &nbsp;
            Number of people at lowest cost:
            &nbsp;
            <span className={"variable"}>
              {lowestCostNumPeople}
            </span>
          </span>
        </div>
      </div>
    );
  }
}