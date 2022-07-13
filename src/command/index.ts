import { CommandPermissionLevel, PlayerCommandSelector } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { int32_t } from "bdsx/nativetype";
import { EconomyAPI } from "../economy";

command.register("addmoney", "Add money to players.", CommandPermissionLevel.Operator)
.overload((p, o) => {
    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            EconomyAPI.addMoney(tr, p.amount);
        }
    }
}, {
    target: PlayerCommandSelector,
    amount: int32_t,
});

command.register("removemoney", "Remove money from players.", CommandPermissionLevel.Operator)
.overload((p, o) => {
    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            EconomyAPI.removeMoney(tr, p.amount);
        }
    }
}, {
    target: PlayerCommandSelector,
    amount: int32_t,
});

command.register("setmoney", "Set players money.", CommandPermissionLevel.Operator)
.overload((p, o) => {
    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            EconomyAPI.setMoney(tr, p.amount);
        }
    }
}, {
    target: PlayerCommandSelector,
    amount: int32_t,
});

command.register("mymoney", "Show your money.")
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;
    pl.sendMessage(`§aYour money is §e${EconomyAPI.currency}${EconomyAPI.getMoney(pl)}`);
}, {});

command.register("money", "Show your and other money.")
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;
    pl.sendMessage(`§aYour money is §e${EconomyAPI.currency}${EconomyAPI.getMoney(pl)}`);
}, {})
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;
    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (tr === pl) {
                pl.sendMessage(`§aYour money is §e${EconomyAPI.currency}${EconomyAPI.getMoney(pl)}`);
            } else {
                pl.sendMessage(`§d${tr.getName()}§r§a money is §e${EconomyAPI.currency}${EconomyAPI.getMoney(tr)}`);
            }
        }
    }
}, {
    target: PlayerCommandSelector,
});

command.register("pay", "Pay others with your money.")
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;
    for (const tr of p.target.newResults(o)) {
        if (tr.isPlayer()) {
            if (tr === pl) {
                pl.sendMessage("§cYou can't pay yourself");
            } else {
                if (p.amount <= 1) {
                    pl.sendMessage("§cInvalid number!");
                } else {
                    pl.sendMessage(`§aManaged to pay §d${tr.getName()}§r§a for §e${EconomyAPI.currency}${p.amount}`);
                    tr.sendMessage(`§d${pl.getName()}§r§a has paid §e${EconomyAPI.currency}${p.amount}`);
                    EconomyAPI.transfer(pl, tr, p.amount);
                }
            }
        }
    }
}, {
    target: PlayerCommandSelector,
    amount: int32_t,
});
