const config = require("./config.json");

module.exports = function SaltRemover(mod) {
    let enabled = config.enabled;
    const smtList = {
        "SMT_GACHA_REWARD" : true,
        "SMT_MAX_ENCHANT_SUCCEED": true,
        "SMT_SKILL_FAIL_CATEGORY": true,
        "SMT_ITEM_USED": true,
        "SMT_ITEM_DELETED": true,
        "SMT_CONVERT_EVENT_SEED_SUCCESS": true,
        "SMT_CONVERT_EVENT_SEED_FAIL": true,
        "SMT_ENCHANT_FAILED": true,
        "SMT_BATTLE_PARTY_DIE": true,
        "SMT_BATTLE_PARTY_RESURRECT": true
    };

    mod.command.add("salt", {
            $none() { 
                mod.command.message(`Enabled: ${enabled}`);
            },
            on() {
                mod.command.message("Activated");
                enabled = true;
            },
            off() {
                mod.command.message("Deactivated");
                enabled = false;
            }
    });

    mod.hook("S_SYSTEM_MESSAGE", 1, (event) => {
        if (!enabled) return;
        return (smtList[mod.parseSystemMessage(event.message).id]) ? false : undefined;
    });
};
