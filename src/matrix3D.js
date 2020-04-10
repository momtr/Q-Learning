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
