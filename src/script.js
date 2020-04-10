let qlearner;
onload = () => {

    let agent = new Agent();
    qlearner = new QLearner(agent, 0.1);
    qlearner.learn(0.4, 10000);
    qlearner.show();

}
