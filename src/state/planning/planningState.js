

//Action Types
const PLANNING_ADD_RULE = "PLANNING_ADD_RULE",
      PLANNING_CLEAR_RULES = "PLANNING_CLEAR_RULES";

//Reducer
const initState = {
  rules: []
};

export function planningReducer(state=initState, action) {
  switch (action.type) {
    case PLANNING_ADD_RULE:
      return Object.assign({}, state, { rules: [...state.rules, action.rule] });
    case PLANNING_CLEAR_RULES:
      return Object.assign({}, state, { rules: [] });
    default:
      return state;
  }
}

//Action creators
export function planningAddRule(rule) {
  return {
    type: PLANNING_ADD_RULE,
    rule: rule
  }
}

export function planningClearRules() {
  return {
    type: PLANNING_CLEAR_RULES
  }
}