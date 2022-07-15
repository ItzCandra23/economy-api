import { ServerPlayer } from "bdsx/bds/player";
import { events } from "bdsx/event";
const fs = require('fs');

const dataJSON = "/economy.json"

interface Economy {
    player: ServerPlayer;
    money: number;
}

let ecoD: { [key: string]: Economy } = {};

try {
    ecoD = require(__dirname + dataJSON);
} catch (e) {
}

export class EconomyAPI {
    static addPlayer(player: ServerPlayer): boolean {
        if (ecoD.hasOwnProperty(player.getName())) return false;
        ecoD[player.getName()] = {
            "player": player,
            "money": 0
        };
        return true;
    }
    static getPlayer(player: ServerPlayer): Economy {
        this.addPlayer(player);
        return ecoD[player.getName()];
    }
    static getPlayerByUser(name: string): Economy | null {
        if (!ecoD.hasOwnProperty(name)) return null;
        return ecoD[name];
    }
    static getMoney(player: ServerPlayer): number {
        if (!ecoD.hasOwnProperty(player.getName())) return 0;
        return ecoD[player.getName()].money;
    }
    static getMoneyByUser(name: string): number | null {
        if (!ecoD.hasOwnProperty(name)) return null;
        return ecoD[name].money;
    }
    static addMoney(player: ServerPlayer, amount: number): number {
        this.addPlayer(player);
        const data = ecoD[player.getName()];
        if (amount <= 0) return 0;
        data.money += amount;
        return amount;
    }
    static removeMoney(player: ServerPlayer, amount: number): number {
        this.addPlayer(player);
        const data = ecoD[player.getName()];
        if (amount <= 0) return 0;
        if (data.money - amount <= 0) {
            data.money = 0;
            return 0;
        }
        data.money -= amount;
        return amount;
    }
    static setMoney(player: ServerPlayer, amount: number): number {
        this.addPlayer(player);
        const data = ecoD[player.getName()];
        if (amount <= 0) {
            data.money = 0;
            return 0;
        }
        data.money = amount;
        return amount;
    }
    static transfer(player: ServerPlayer, target: ServerPlayer, amount: number): number {
        this.addPlayer(player);
        this.addPlayer(target);
        const data1 = ecoD[player.getName()];
        const data2 = ecoD[target.getName()];
        if (amount <= 0) return 0;
        if (amount >= data1.money) return 0;
        data1.money -= amount;
        data2.money += amount;
        return amount;
    }
}

events.playerJoin.on(ev => {
    EconomyAPI.addPlayer(ev.player);
});

events.serverStop.on(() => {
    fs.writeFile(__dirname + dataJSON, JSON.stringify(ecoD), () => {});
});
