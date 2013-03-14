var JsonDatabase = (function () {
    function JsonDatabase(name) {
        if(typeof name === "undefined") {
            name = "_database";
        }
        this.dbName = name;
        this.base = {
        };
    }
    JsonDatabase.prototype.clearDatabase = function () {
        this.base = {
        };
    };
    JsonDatabase.prototype.addTable = function (name) {
        this.base[name] = {
            props: [
                "_guid"
            ],
            data: []
        };
        return this.base[name];
    };
    JsonDatabase.prototype.deleteTable = function (name) {
        if(this.base[name]) {
            delete this.base[name];
        }
    };
    JsonDatabase.prototype.getTable = function (name) {
        return this.base[name];
    };
    JsonDatabase.prototype.addProperty = function (name, prop) {
        if(this.base[name]) {
            this.base[name].props.push(prop);
        }
    };
    JsonDatabase.prototype.addData = function (name, args) {
        var data = {
        };
        args._guid = this.guid();
        if(this.base[name]) {
            for(var a = 0; a < this.base[name].props.length; a++) {
                data[this.base[name].props[a]] = "";
                for(var obj in args) {
                    if(obj == this.base[name].props[a]) {
                        data[this.base[name].props[a]] = args[obj];
                    }
                }
            }
            this.base[name].data.push(data);
        }
        return args;
    };
    JsonDatabase.prototype.updateDataByValue = function (name, prop, arg) {
        if(this.base[name]) {
            for(var a = 0; a < this.base[name].data.length; a++) {
                var table = this.base[name].data[a];
                for(var data in table) {
                    var update = false;
                    for(var p in arg) {
                        if(data == p && table[data] == arg[p]) {
                            update = true;
                        }
                    }
                    if(update) {
                        for(p in prop) {
                            table[p] = prop[p];
                        }
                    }
                }
            }
        }
    };
    JsonDatabase.prototype.removeDataByValue = function (name, arg) {
        if(this.base[name]) {
            for(var a = 0; a < this.base[name].data.length; a++) {
                var table = this.base[name].data[a];
                for(var data in table) {
                    var update = true;
                    for(var p in arg) {
                        if(data == p && table[data] != arg[p]) {
                            update = false;
                        }
                    }
                    if(update) {
                        this.base[name].data.splice(a, 1);
                        break;
                    }
                }
            }
        }
    };
    JsonDatabase.prototype.getDataByValues = function (name, arg) {
        if(this.base[name]) {
            for(var a = 0; a < this.base[name].data.length; a++) {
                var content = this.base[name].data[a];
                for(var data in content) {
                    var found = true;
                    for(var p in arg) {
                        console.log(p, content[data], arg[p], data);
                        if(data == p && content[data] != arg[p]) {
                            found = false;
                            break;
                        }
                    }
                    if(found) {
                        return content;
                    }
                }
            }
        }
        return null;
    };
    JsonDatabase.prototype.getAllByValues = function (name, arg) {
        if(this.base[name]) {
            var contents = [];
            for(var a = 0; a < this.base[name].data.length; a++) {
                var content = this.base[name].data[a];
                for(var data in content) {
                    var found = true;
                    for(var p in arg) {
                        if(data == p && content[data] != arg[p]) {
                            found = false;
                            break;
                        }
                    }
                }
                if(found) {
                    contents.push(content);
                }
            }
            return contents;
        }
        return null;
    };
    JsonDatabase.prototype.deleteData = function (name) {
        this.base[name].data = [];
    };
    JsonDatabase.prototype.removeDataByIndex = function (name, index) {
        if(this.base[name] && this.base[name].data[index]) {
            this.base[name].data.splice(index, 1);
        }
    };
    JsonDatabase.prototype.toString = function (name) {
        if(name) {
            return JSON.stringify(this.base[name]);
        }
        return JSON.stringify(this.base);
    };
    JsonDatabase.prototype.fromString = function (data) {
        this.base = JSON.parse(data);
    };
    JsonDatabase.prototype.toLocalStorage = function (name) {
        if(typeof name === "undefined") {
            name = this.dbName;
        } else {
            this.dbName = name;
        }
        localStorage.setItem(name, this.toString());
    };
    JsonDatabase.prototype.fromLocalStorage = function (name) {
        if(typeof name === "undefined") {
            name = this.dbName;
        } else {
            this.dbName = name;
        }
        this.fromString(localStorage.getItem(name));
    };
    JsonDatabase.prototype.s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    JsonDatabase.prototype.guid = function () {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    };
    return JsonDatabase;
})();
