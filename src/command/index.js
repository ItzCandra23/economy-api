"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
const nativetype_1 = require("bdsx/nativetype");
const economy_1 = require("../economy");
const event_1 = require("bdsx/event");
event_1.events.serverOpen.on(() => {
    command_2.command.register("addmoney", "Add money to players.", command_1.CommandPermissionLevel.Operator)
        .overload((p, o) => {
        for (const tr of p.target.newResults(o)) {
            if (tr.isPlayer()) {
                economy_1.EconomyAPI.addMoney(tr, p.amount);
            }
        }
    }, {
        target: command_1.PlayerCommandSelector,
        amount: nativetype_1.int32_t,
    });
    command_2.command.register("removemoney", "Remove money from players.", command_1.CommandPermissionLevel.Operator)
        .overload((p, o) => {
        for (const tr of p.target.newResults(o)) {
            if (tr.isPlayer()) {
                economy_1.EconomyAPI.removeMoney(tr, p.amount);
            }
        }
    }, {
        target: command_1.PlayerCommandSelector,
        amount: nativetype_1.int32_t,
    });
    command_2.command.register("setmoney", "Set players money.", command_1.CommandPermissionLevel.Operator)
        .overload((p, o) => {
        for (const tr of p.target.newResults(o)) {
            if (tr.isPlayer()) {
                economy_1.EconomyAPI.setMoney(tr, p.amount);
            }
        }
    }, {
        target: command_1.PlayerCommandSelector,
        amount: nativetype_1.int32_t,
    });
    command_2.command.register("mymoney", "Show your money.")
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        pl.sendMessage(`§aYour money is §e${economy_1.EconomyAPI.currency}${economy_1.EconomyAPI.getMoney(pl)}`);
    }, {});
    command_2.command.register("money", "Show your and other money.")
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        pl.sendMessage(`§aYour money is §e${economy_1.EconomyAPI.currency}${economy_1.EconomyAPI.getMoney(pl)}`);
    }, {})
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        for (const tr of p.target.newResults(o)) {
            if (tr.isPlayer()) {
                if (tr === pl) {
                    pl.sendMessage(`§aYour money is §e${economy_1.EconomyAPI.currency}${economy_1.EconomyAPI.getMoney(pl)}`);
                }
                else {
                    pl.sendMessage(`§d${tr.getName()}§r§a money is §e${economy_1.EconomyAPI.currency}${economy_1.EconomyAPI.getMoney(tr)}`);
                }
            }
        }
    }, {
        target: command_1.PlayerCommandSelector,
    });
    command_2.command.register("pay", "Pay others with your money.")
        .overload((p, o) => {
        const entity = o.getEntity();
        if (entity === null)
            return;
        const pl = entity.getNetworkIdentifier().getActor();
        if (pl === null)
            return;
        for (const tr of p.target.newResults(o)) {
            if (tr.isPlayer()) {
                if (tr === pl) {
                    pl.sendMessage("§cYou can't pay yourself");
                }
                else {
                    if (p.amount <= 1) {
                        pl.sendMessage("§cInvalid number!");
                    }
                    else {
                        pl.sendMessage(`§aManaged to pay §d${tr.getName()}§r§a for §e${economy_1.EconomyAPI.currency}${p.amount}`);
                        tr.sendMessage(`§d${pl.getName()}§r§a has paid §e${economy_1.EconomyAPI.currency}${p.amount}`);
                        economy_1.EconomyAPI.transfer(pl, tr, p.amount);
                    }
                }
            }
        }
    }, {
        target: command_1.PlayerCommandSelector,
        amount: nativetype_1.int32_t,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUFpRjtBQUNqRiwwQ0FBdUM7QUFDdkMsZ0RBQTBDO0FBQzFDLHdDQUF3QztBQUN4QyxzQ0FBb0M7QUFFcEMsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFO0lBQzFCLGlCQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSx1QkFBdUIsRUFBRSxnQ0FBc0IsQ0FBQyxRQUFRLENBQUM7U0FDckYsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2YsS0FBSyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNyQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDZixvQkFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3JDO1NBQ0o7SUFDTCxDQUFDLEVBQUU7UUFDQyxNQUFNLEVBQUUsK0JBQXFCO1FBQzdCLE1BQU0sRUFBRSxvQkFBTztLQUNsQixDQUFDLENBQUM7SUFFSCxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsNEJBQTRCLEVBQUUsZ0NBQXNCLENBQUMsUUFBUSxDQUFDO1NBQzdGLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNmLEtBQUssTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDckMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ2Ysb0JBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN4QztTQUNKO0lBQ0wsQ0FBQyxFQUFFO1FBQ0MsTUFBTSxFQUFF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
