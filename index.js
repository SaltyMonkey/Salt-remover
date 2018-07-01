const Command = require('command');
const config = require("./config.json");

module.exports = function SaltRemover(dispatch) {
    const command = Command(dispatch);
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

    command.add("salt", (option) => {
        switch (option) {
            case "state": 
                command.message(`[Salt-Remover] Enabled: ${enabled}`);
                break;
            case "on":
                command.message("[Salt-Remover] Activated");
                enabled = true;
                break;
            case "off":
                command.message("[Salt-Remover] Deactivated");
                enabled = false;
                break;
        }
    });

    dispatch.hook('S_SYSTEM_MESSAGE', 1, (event) => {
        if (enabled)
            return (smtList[dispatch.parseSystemMessage(event.message).id]) ? false : undefined;
    });
};
