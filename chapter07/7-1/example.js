// Before
organization = {name: '애크미 수르베리', country: "GM"};

// After
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }

  get name() { return this._name; }
  set name(arg) { this._name = arg }
  get country() { return this._country; }
  set country(arg) { this._country = arg; }
}