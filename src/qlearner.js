class QLearner {

    constructor(agent, eta) {
        // Q-table
        this.q = new Matrix3D(4,5,4);
        this.agent = agent;
        this.eta = eta;
    }

    action(x, y) {
        if(Math.random() < this.eta) 
            return Math.floor(Math.random() * 4);
        return this.q.argmax(x, y);
    }

    updateQ(x, y, z, val) {
        this.q.set(x, y, z, val);
    }

    getQ(x, y) {
        return this.q.getRow(x, y);
    }

    learn(gamma, epochs) {
        for(let epoch = 0; epoch < epochs; epoch++) {
            let state = this.agent.getLocation();
            let action = this.action(state.x, state.y);
            let reward = this.agent.move(action);
            let state_prime = this.agent.getLocation();
            let localQ = this.getQ(state_prime.x, state_prime.y);
            // console.log("x: " + state.x + ", y:" + state.y + ", action: " + action + ", val=" + (reward + gamma * Matrix3D.argmax(localQ)));
            this.updateQ(state.x, state.y, action, (reward + gamma * Matrix3D.argmax(localQ)));
            if(reward === 1000) 
                this.agent.setAgent();
        }
    }

    show(x=3, y=0, maxSteps=100) {
        this.agent.setAgent(x, y);
        let reward = -1;
        for(let i = 0; (i < maxSteps) && (reward != 1000); i++) {
            let state = this.agent.getLocation();
            let action = this.action(state.x, state.y);
            reward = this.agent.move(action);
            console.log("state before= (" + state.x + "|" + state.y + "), action=" + action + "  , reward=" + reward + ", state= (" + this.agent.x + "|" + this.agent.y + ")");
        }
    }

}