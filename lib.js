export class ColorPatch{
  constructor(r, g, b, a, name, id)
  {
      this._r = r;
      this._g = g;
      this._b = b;
      this._a = a;
      this._name = name;
      this._id = id;
  }
    get r() {
        return this._r;
    }
    get g() {
        return this._g;
    }
    get b() {
        return this._b;
    }
    get a() {
        return this._a;
    }
    get name() {
        return this._name;
    }
    get rgba() {
        return `rgba(${this._r},${this._g},${this._b},${this._a})`;
    }
    get id() {
        return this._id;
    }

    set r(r) {
        this._r = r;
    }
    set g(g) {
        this._g = g;
    }
    set b(b) {
        this._b = b;
    }
    set a(a) {
        this._a = a;
    }
    set name(name) {
        this._name = name;
    }
}