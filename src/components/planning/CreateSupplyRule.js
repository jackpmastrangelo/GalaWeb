import React from 'react';
import '../../styles/components/planning/CreateSupplyRule.scss';
import SupplyRule from "../../models/planning/SupplyRule";
import { planningAddRule } from "../../state/planning/planningState";

export default class CreateSupplyRule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supplyPurchaseQuantityField: "0",
      supplyPeoplePerPurchaseField: "0",
      supplyNameField: "Thing",
      supplyCostPerPurchaseField: "0"
    };
  }

  handleChange = (value, fieldName) => {
    const change = {};
    change[fieldName] = value;
    this.setState(change);
  };

  createSupplyRule = () => {
    const newRule = new SupplyRule(this.state.supplyPurchaseQuantityField, this.state.supplyPeoplePerPurchaseField,
                                    this.state.supplyNameField, this.state.supplyCostPerPurchaseField);

    this.props.dispatch(planningAddRule(newRule));

    this.setState({
      supplyPurchaseQuantityField: "0",
      supplyPeoplePerPurchaseField: "0",
      supplyNameField: "Thing",
      supplyCostPerPurchaseField: "0"
    });
  };

  render() {
    return (
      <div className={"csr"}>
        <div className={"csr-box"}>
          <span className={"csr-input-container"}>
            {this.props.eventName} will require &nbsp;
            <input type="text" className={"number"} value={this.state.supplyPurchaseQuantityField}
                   onChange={(event) => { this.handleChange(event.target.value, "supplyPurchaseQuantityField") }}/>
            &nbsp;
            <input type="text" value={this.state.supplyNameField}
                   onChange={(event) => { this.handleChange(event.target.value, "supplyNameField") }}/>
            s for every
            <input type="text" className={"number"} value={this.state.supplyPeoplePerPurchaseField}
                   onChange={(event) => { this.handleChange(event.target.value, "supplyPeoplePerPurchaseField") }}/>
            &nbsp; people.
            <br/> For every {this.state.supplyPurchaseQuantityField} {this.state.supplyNameField}s it will cost $
            <input type="text" className={"number"} value={this.state.supplyCostPerPurchaseField}
                   onChange={(event) => { this.handleChange(event.target.value, "supplyCostPerPurchaseField") }}/>
            .
          </span>
          <div className="crs-submit"
               onClick={() => { this.createSupplyRule() }}>
            Create New Supply Rule
          </div>
        </div>
      </div>
    );
  }
}
