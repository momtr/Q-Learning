class Environment {

    constructor() {
        // rewards
        this.rewards = [
            [-1, -1, -1, -1],
            [-1, -1, -1, -1000],
            [-1, -1, -1, -1000],
            [-1, -1, -1, -1000],
            [-1, -1, -1, 1000],
        ];
    }

}

class Agent {

    constructor() {
        // env
        this.env = new Environment();
        // agent
        this.setAgent();
    }

    setAgent(x=3, y=0) {
        this.x = x;
        this.y = y;
    }

    getLocation() {
        return { x: this.x, y: this.y };
    }

    move(action) {
        if(action === 0)        this.y--;
        else if(action === 1)   this.y++;
        else if(action === 2)   this.x--;
        else if(action === 3)   this.x++;
        // check reward
        let reward;
        if(this.x < 0 || this.x > 3 || this.y < 0 | this.y > 4)
            reward = -10;
        else
            reward = this.env.rewards[this.y][this.x];
        if(this.x < 0)  this.x = 0;
        if(this.y < 0)  this.y = 0;
        if(this.y > 4)  this.y = 4;
        if(this.x > 3)  this.x = 3;
        return reward;
    }

}

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

class Matrix3D {
    constructor(x, y, z, min=-1000, max=1000) {
        this.data = [];
        for(let i = 0; i < x; i++) {
            let level = [];
            for(let j = 0; j < y; j++) {
                let row = [];
                for(let k = 0; k < z; k++) {
                    row.push((Math.random() * (-min + max) + min));
                }
                level.push(row);
            }
            this.data.push(level);
        }
    }
    set(x, y, z, val) {
        this.data[x][y][z] = val;
    }
    setRow(x, y, val) {
        this.data[x][y] = val;
    }
    get(x, y, z) {
        return this.data[x][y][z];
    }
    getRow(x, y) {
        return this.data[x][y];
    }
    argmax(x, y) {
        let ar = this.data[x][y];
        // console.log("array", ar);
        // max
        let maxVal = -Infinity;
        let maxIndex = 0;
        for(let i = 0; i < ar.length; i++) {
            if(ar[i] > maxVal) {
                maxIndex = i;
                maxVal = ar[i];
            }
        }
        return maxIndex;
    }
    // returns maximum value
    static argmax(ar) {
        let maxVal = -Infinity;
        for(let i = 0; i < ar.length; i++) {
            if(ar[i] > maxVal) 
                maxVal = ar[i];
        }
        return maxVal;
    }
}

let qlearner;
onload = () => {

    let agent = new Agent();
    qlearner = new QLearner(agent, 0.1);
    qlearner.learn(0.4, 10000);
    qlearner.show();

}