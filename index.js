const Command = require('command');

module.exports = function SaltRemover(dispatch) {
    const command = Command(dispatch);
    let enabled = true;

    command.add('salt', (option) => {
        switch (option) {
            case 'on':
                command.message('[Salt-Remover] Activated');
                enabled = true;
                break;
            case 'off':
                command.message('[Salt-Remover] Deactivated');
                enabled = false;
                break;
        }
    });

    dispatch.hook('S_SYSTEM_MESSAGE', 1, (event) => {
        if (enabled)
            return dispatch.parseSystemMessage(event.message).id == "SMT_GACHA_REWARD" ? false : undefined
    });
};
