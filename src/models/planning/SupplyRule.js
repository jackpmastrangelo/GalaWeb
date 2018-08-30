import Rule from './Rule';

export default class SupplyRule extends Rule {
  constructor(supplyPurchaseQuantity, supplyPeoplePerPurchase, supplyName, supplyCostPerPurchase) {
    super();
    this.state = {
      supplyPurchaseQuantity: supplyPurchaseQuantity,
      supplyPeoplePerPurchase: supplyPeoplePerPurchase,
      supplyName: supplyName,
      supplyCostPerPurchase: supplyCostPerPurchase
    };
  }

  totalCost(numPeople) {
    const necessaryUnits = Math.ceil(numPeople / this.state.supplyPeoplePerPurchase);

    return  necessaryUnits * this.state.supplyCostPerPurchase;
  }

  textRepresentation(eventName) {
    return eventName + " will require " + this.state.supplyPurchaseQuantity + " " +
            this.state.supplyName + "s for every " + this.state.supplyPeoplePerPurchase + " people.\n For every " +
            this.state.supplyPurchaseQuantity + " " + this.state.supplyName + "s it will cost $" +
            this.state.supplyCostPerPurchase + ".";
  }
}