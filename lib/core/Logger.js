var clc = require('cli-color');

class Logger {

    log(msg) {
        console.log(msg);
    }

    success(msg) {
        this.log(clc.green(msg));
    }

    warning(msg) {
        this.log(clc.orange(msg));
    }

    info(msg) {
        this.log(clc.yellow(msg));
    }

    error(msg) {
        this.log(clc.red(msg));
    }

    blue(msg) {
        this.log(clc.blue(msg));
    }

}

module.exports = Logger;