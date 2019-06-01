const config = require("./config.json");

module.exports = function SaltRemover(mod) {
    let enabled = config.enabled;
    
    const smtList = {
        "SMT_GACHA_REWARD" : true,
        "SMT_MAX_ENCHANT_SUCCEED": true,
        "SMT_PREMIUMCOMPOSE_REWARD" : true,
        "SMT_SKILL_FAIL_CATEGORY": true,
        "SMT_ITEM_USED": true,
        "SMT_ITEM_DELETED": true,
        "SMT_CONVERT_EVENT_SEED_SUCCESS": true,
        "SMT_CONVERT_EVENT_SEED_FAIL": true,
        "SMT_ENCHANT_FAILED": true,
        "SMT_BATTLE_PARTY_DIE": true,
        "SMT_BATTLE_PARTY_RESURRECT": true,
        "SMT_CANNOT_TAKE_EQUIPMENT_EXP": true,
        "SMT_BAN_PARTY_PARTYPLAYER_BF_FAIL": true,
        "SMT_HUNTINGZONE_EVENT_ANNOUNCE": true,
		"SMT_GOLDENBELL_MESSAGE": true
        
    };

    mod.command.add("salt", {
            $none() { 
                enabled = !enabled;
			    mod.command.message(`Salt remover ${enabled ? 'en' : 'dis'}abled`)
            }
    }, this);

    mod.hook("S_SYSTEM_MESSAGE", 1, (event) => {
        if (!enabled) return;
        return (smtList[mod.parseSystemMessage(event.message).id]) ? false : undefined;
    });

    mod.hook("S_ABNORMALITY_FAIL", "raw", ()=> {
        return enabled ? false : undefined;
    });
};
