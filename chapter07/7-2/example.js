// Before
{
  class Person {
    get courses() {return this._courses;}
    set courses(aList) {this._courses = aList;}
  }
}

// After
{
  class Person {
    get courses() { return this._courses.slice(); }
    addCource(aCource) {this._courses = this._courses.push(aCource)}
    removeCource(aCour) { }
  }
}