var $NS_CONTECXT_OBJ;

/**
 * Return context information about the current user/script.
 *
 * @return {nlobjContext}
 *
 * @since    2007.0
 */
function nlapiGetContext() {
    try {
        if (!$NS_CONTECXT_OBJ) $NS_CONTECXT_OBJ = new nlobjContext();
        return $NS_CONTECXT_OBJ;
    }
    catch (e) {
        throw nlapiCreateError(e);
    }
}