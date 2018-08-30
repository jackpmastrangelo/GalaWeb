import React from 'react';
import { connect } from 'react-redux';
import NavPage from "../components/NavPage";
import CreateSupplyRule from "../components/planning/CreateSupplyRule";
import RuleList from "../components/planning/RuleList";
import CostGraph from "../components/planning/CostGraph";
import '../styles/pages/Planning.scss';

class Planning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventNameField: "My Event"
    }
  }

  handleChange = (value, field) => {
    const change = {};
    change[field] = value;
    this.setState(change);
  };

  render() {
    return (
      <NavPage>
        <div className={"planning-name"}>
          <input type="text" value={this.state.eventNameField}
                  onChange={(event) => { this.handleChange(event.target.value, "eventNameField") }}/>
        </div>
        <CostGraph rules={this.props.rules} />
        <RuleList rules={this.props.rules} eventName={this.state.eventNameField}/>
        <CreateSupplyRule dispatch={this.props.dispatch} eventName={this.state.eventNameField}/>
      </NavPage>
    );
  }
}

function mapStateToProps(state) {
  return {
    rules: state.planningState.rules
  }
}

export default connect(mapStateToProps)(Planning);