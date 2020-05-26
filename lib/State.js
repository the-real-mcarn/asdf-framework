class State {
	constructor(state) {
		this.set(state);
	}

	set(state) {
		this.last = this.state;
		this.state = state;
		this.time = 0;
		this.justSetState = true;
	}

	update(dt) {
		this.first = this.justSetState;
		this.justSetStrate = false;

		this.time += this.first ? 0 : dt;
	}

	is(state) {
		return this.state === state;
	}

	isIn(...states) {
		return states.some(s => this.is(s));
	}
}

module.exports = State;