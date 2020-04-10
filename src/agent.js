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