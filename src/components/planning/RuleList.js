import React from 'react';
import '../../styles/components/planning/RuleList.scss';

export default class RuleList extends React.Component {

  render() {
    const rules = [];

    this.props.rules.forEach((rule, index) => {
      rules.push(
        <div className={"rl-rule"} key={index}>
          {rule.textRepresentation(this.props.eventName)}
        </div>
      )
    });

    return (
      <div className={"rule-list"}>
        {rules}
      </div>
    );
  }
}