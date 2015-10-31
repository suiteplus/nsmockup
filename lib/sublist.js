'use strict';
var uuid = require('node-uuid'),
    vmSim = require('../src/vm-sim');

exports.invoke = (type, item, uuid) => {
    let scriptName = `$$invoke#${type}.${item}=${uuid}`,
        cfg = vmSim.loadScriptConfig(scriptName),
        context = cfg.context;

    context.$$THIS_RECORD = {
        recordUId: uuid,
        recordType: type,
        subLists: {}
    };

    return {
        ctx: context,
        exec: (fn, args) => {
            let argsNames = args.map((a, i) => {
                    let param = `$$param${i}`;
                    context[param] = a;
                    return param;
                }),
                params = argsNames.join(','),
                code = `$resul = ${fn} ( ${params} )`;

            let $this = context.$$THIS_RECORD,
                subType = args[0];
            if (!$this.subLists[subType]) {
                $this.subLists[subType] = {};
            }

            context.$resul = null;
            // execute function in context
            vmSim.evalContext(code, context);

            return context.$resul;
        }
    };
};
exports.dbName = ($this, type) => {
    let recType = $this.recordType,
        recUId = $this.recordUId,
        recSubType = `$$sl-${recType}-${type}-${recUId}`;
    return recSubType;
};

exports.saveData = ($this, type, data) => {
    let recSubType = exports.dbName($this, type);

    let records = [];

    for (let i = 0; i < data.length; i++) {
        let val = data[i];
        if (!val) continue;

        val._index = (i + 1);
        if (!val._uuid) {
            val._uuid = uuid.v4();
        }
        records.push(val);
    }

    $db.object[recSubType] = records;
    $db.saveSync();
};

exports.loadData = ($this, type) => {
    let recType = $this.recordType,
        recUId = $this.recordUId,
        recSubType = `$$sl-${recType}-${type}-${recUId}`;

    if (!$db.object[recSubType]) {
        $db.object[recSubType] = [];
        $db.saveSync();
    }

    let record = $db(recSubType).chain().value();
    if (!Array.isArray(record)) record = [record];
    return record;
};

exports.get = ($this, subType) => {
    let recType = $this.recordType,
        recUId = $this.recordUId;
    if (!$this.subLists || !$this.subLists[subType]) {
        throw nlapiCreateError('SSS_INVALID_LINE_ITEM', `No has any item in "${recType}.${subType}" UUID: [${recUId}]`);
    }
    let subList = $this.subLists[subType];
    if (!subList.edits) {
        subList.edits = [];
    }
    if (!subList.size) {
        let data = exports.loadData($this, subType);
        if (!data) {
            subList.data = [];
        } else {
            subList.data = data;
        }

        subList.size = subList.data.length;

    }
    return subList;
};

exports.current = ($this, subType, select) => {
    let recType = $this.recordType,
        subList = exports.get($this, subType);

    if (select) {
        if (select.cancel) {
            let keys = Object.keys(subList);
            for (let k = 0; k < keys.length; k++) {
                let key = keys[k];
                delete subList[key];
            }
            return null;
        }

        // save temporary line
        if (subList.current) {
            subList.edits.push({
                current: subList.current,
                index: subList.index
            });
        }

        let data = subList.data;
        if (select.new) {
            subList.current = {};
            subList.index = ++subList.size;
        } else {
            subList.current = data[select.index - 1];
            subList.index = select.index;
        }
    }

    if (!subList.current) {
        throw nlapiCreateError('SSS_INVALID_CURRENT_LINE_ITEM', `No current line has selected in "${recType}.${subType}"`);
    } else {
        return subList.current;
    }
};