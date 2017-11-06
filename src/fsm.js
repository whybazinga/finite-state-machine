class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config !== null) {
            this.initial = config.initial;
            this.previous = null;
            this.next = null;
            this.current = this.initial;
            this.states = config.states;;
        } else {
            throw new Error;
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.current;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (Object.keys(this.states).some((str) => str.includes(state))) {
            this.previous = this.current;
            this.current = state;
            this.next = null;
        } else {
            throw new Error;
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (Object.keys(this.states[this.current]["transitions"]).some((str) => str.includes(event))) {
            this.previous = this.current;
            this.current = this.states[this.current]["transitions"][event];
            this.next = null;
        }
        else {
            throw new Error;
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.current = this.initial;
        this.previous = null;
        this.next = null;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event === undefined) {
            return Object.keys(this.states);
        }
        else if (Object.keys(this.states).some((temp) => Object.keys(this.states[temp]["transitions"]).some((str) => str.includes(event)))) {
            let result = [];
            for (let i = 0; i < Object.keys(this.states).length; i++) {
                if (Object.keys(this.states[Object.keys(this.states)[i]]["transitions"]).some((str) => str.includes(event))) {
                    result.push(Object.keys(this.states)[i]);
                }
            }
            return result;
        }
        else {
            return [];
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.previous !== null) {
            this.next = this.current;
            this.current = this.previous;
            this.previous = null;
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.next !== null) {
            this.previous = this.current;
            this.current = this.next;
            this.next = null;
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.previous = null;
        this.next = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
