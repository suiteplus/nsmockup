'use strict';

exports.$$hook = true;

exports.nlapiGetContext = (ctx) => {
    var $contextObj = null;

    var iniContext = () => {
        $contextObj = new nlobjContext();

        let currentUser = ctx.$$CURRENT_AUTH.user,
            currentCompany = ctx.$$CURRENT_AUTH.company;
        if (currentUser && currentUser.id > 0) {
            let ctype = currentUser.type,
                cid = currentUser.id,
                record = nlapiLoadRecord(ctype, cid);
            $contextObj.user = record.getId();

            let user = $db(ctype).chain().filter({internalid: cid}).value();
            if (Array.isArray(user)) user = user[0];
            if (user) {
                ['email', 'name', 'department', 'subsidiary'].forEach(f => {
                    $contextObj[f] = user[f];
                });
            } else {
                throw nlapiCreateError('SSS_INVALID_CURRENT_USER', `Not found user ID [${cid}] in type: "${ctype}"`);
            }
        }
        if (currentCompany) {
            $contextObj.company = currentCompany;
        }
    };

    /**
     * Return context information about the current user/script.
     *
     * @return {nlobjContext}
     *
     * @since    2007.0
     */
    return () => {
        try {
            if (!$contextObj || ctx.$NS_RESET_CONTEXT) {
                iniContext();
                ctx.$NS_RESET_CONTEXT && (ctx.$NS_RESET_CONTEXT = false);
            }
            return $contextObj;
        } catch (e) {
            console.log(e.stack);
            throw nlapiCreateError(e);
        }
    };
};