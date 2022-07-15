"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EconomyAPI = void 0;
const event_1 = require("bdsx/event");
const fs = require('fs');
const configJSON = "/config.json";
const dataJSON = "/economy.json";
let config = {
    "currency": "$",
    "newplayer_money": 100
};
let ecoD = {};
try {
    ecoD = require(__dirname + configJSON);
}
catch (e) {
}
try {
    ecoD = require(__dirname + dataJSON);
}
catch (e) {
}
class EconomyAPI {
    static currency() {
        if (config.currency === null)
            return "$";
        return config.currency;
    }
    static addPlayer(player) {
        if (ecoD.hasOwnProperty(player.getName()))
            return false;
        ecoD[player.getName()] = {
            "player": player,
            "money": config.newplayer_money
        };
        return true;
    }
    static getPlayer(player) {
        this.addPlayer(player);
        return ecoD[player.getName()];
    }
    static getPlayerByUser(name) {
        if (!ecoD.hasOwnProperty(name))
            return null;
        return ecoD[name];
    }
    static getMoney(player) {
        if (!ecoD.hasOwnProperty(player.getName()))
            return 0;
        return ecoD[player.getName()].money;
    }
    static getMoneyByUser(name) {
        if (!ecoD.hasOwnProperty(name))
            return null;
        return ecoD[name].money;
    }
    static addMoney(player, amount) {
        this.addPlayer(player);
        const data = ecoD[player.getName()];
        if (amount <= 0)
            return 0;
        data.money += amount;
        return amount;
    }
    static removeMoney(player, amount) {
        this.addPlayer(player);
        const data = ecoD[player.getName()];
        if (amount <= 0)
            return 0;
        if (data.money - amount <= 0) {
            data.money = 0;
            return 0;
        }
        data.money -= amount;
        return amount;
    }
    static setMoney(player, amount) {
        this.addPlayer(player);
        const data = ecoD[player.getName()];
        if (amount <= 0) {
            data.money = 0;
            return 0;
        }
        data.money = amount;
        return amount;
    }
    static transfer(player, target, amount) {
        this.addPlayer(player);
        this.addPlayer(target);
        const data1 = ecoD[player.getName()];
        const data2 = ecoD[target.getName()];
        if (amount <= 0)
            return 0;
        if (amount >= data1.money)
            return 0;
        data1.money -= amount;
        data2.money += amount;
        return amount;
    }
    static save() {
        fs.writeFile(__dirname + configJSON, JSON.stringify(config), () => { });
        fs.writeFile(__dirname + dataJSON, JSON.stringify(ecoD), () => { });
    }
}
exports.EconomyAPI = EconomyAPI;
event_1.events.playerJoin.on(ev => {
    EconomyAPI.addPlayer(ev.player);
});
event_1.events.serverStop.on(() => {
    fs.writeFile(__dirname + configJSON, JSON.stringify(config), () => { });
    fs.writeFile(__dirname + dataJSON, JSON.stringify(ecoD), () => { });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzQ0FBb0M7QUFDcEMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXpCLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQztBQUNsQyxNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUM7QUFFakMsSUFBSSxNQUFNLEdBQUc7SUFDVCxVQUFVLEVBQUUsR0FBRztJQUNmLGlCQUFpQixFQUFFLEdBQUc7Q0FDekIsQ0FBQztBQU9GLElBQUksSUFBSSxHQUErQixFQUFFLENBQUM7QUFFMUMsSUFBSTtJQUNBLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDO0NBQzFDO0FBQUMsT0FBTyxDQUFDLEVBQUU7Q0FDWDtBQUVELElBQUk7SUFDQSxJQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQztDQUN4QztBQUFDLE9BQU8sQ0FBQyxFQUFFO0NBQ1g7QUFFRCxNQUFhLFVBQVU7SUFDbkIsTUFBTSxDQUFDLFFBQVE7UUFDWCxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssSUFBSTtZQUFFLE9BQU8sR0FBRyxDQUFDO1FBQ3pDLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFvQjtRQUNqQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHO1lBQ3JCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLE9BQU8sRUFBRSxNQUFNLENBQUMsZUFBZTtTQUNsQyxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNELE1BQU0sQ0FBQyxT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
