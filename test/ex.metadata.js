const { COMP_TYPE, DATA_TYPE } = require('../src/types');

module.exports = {
    "user": {
        create: {
            fields: {
                id : {compType: COMP_TYPE.INPUT, dataType: DATA_TYPE.NUMERIC, default: null, required: false, label: 'user.id' },
                name : {compType: COMP_TYPE.INPUT, dataType: DATA_TYPE.TEXT, default: null, required: false, label: 'user.name' },
                username : {compType: COMP_TYPE.INPUT, dataType: DATA_TYPE.TEXT, default: null, required: false, label: 'user.username' },
                password : {compType: COMP_TYPE.PASSWORD, dataType: DATA_TYPE.PASSWORD, default: null, required: false, label: 'user.password' }
            }
        },
        update: {
            fields: {
                id : {compType: COMP_TYPE.INPUT, dataType: DATA_TYPE.NUMERIC, default: null, required: false, label: 'user.id', editable: false },
                name : {compType: COMP_TYPE.INPUT, dataType: DATA_TYPE.TEXT, default: null, required: false, label: 'user.name' },
                username : {compType: COMP_TYPE.INPUT, dataType: DATA_TYPE.TEXT, default: null, required: false, label: 'user.username' },
                password : {compType: COMP_TYPE.PASSWORD, dataType: DATA_TYPE.PASSWORD, default: null, required: false, label: 'user.password' }
            }
        },
        list : {
            table: {
                id: { sort: false, filter: false },
                name: { sort: false, filter: false },
                username: { sort: false, filter: false }
            }
        }
    },
    event: {
        create: {
            fields: {
                id : {compType: COMP_TYPE.INPUT, dataType: DATA_TYPE.NUMERIC, default: null, required: false, label: 'event.id' },
                user : {compType: COMP_TYPE.SELECT, dataType: DATA_TYPE.OBJECT, default: -1, required: false, value: 'user.id', label: 'user.name' },
                start: {compType: COMP_TYPE.DATE_TIME, dataType: DATA_TYPE.DATE_TIME, default: null, required: false, label: 'event.start' },
                description: {compType: COMP_TYPE.TEXT_AREA, dataType: DATA_TYPE.TEXT, default: null, required: false, label: 'event.description' },
            }
        },
        update: {
            fields: {
                id : {compType: COMP_TYPE.INPUT, dataType: DATA_TYPE.NUMERIC, default: null, required: false, label: 'event.id', editable: false },
                user : {compType: COMP_TYPE.SELECT, dataType: DATA_TYPE.OBJECT, default: -1, required: false, value: 'user.id', label: 'user.name' },
                start: {compType: COMP_TYPE.DATE_TIME, dataType: DATA_TYPE.DATE_TIME, default: null, required: false, label: 'event.start' },
                description: {compType: COMP_TYPE.TEXT_AREA, dataType: DATA_TYPE.TEXT, default: null, required: false, label: 'event.description' },
            }
        },
        list : {
            table: {
                id: { sort: false, filter: false },
                name: { sort: false, filter: false, ref: 'user.name' },
                start: { sort: false, filter: false },
                description: { sort: false, filter: false }
            }
        }
    }
}