const { COMP_TYPE, DATA_TYPE } = require('../src/types');

module.exports = {
    "user": {
        create: {
            fields: {
                id : {compType: COMP_TYPE.INPUT, dataType: DATA_TYPE.NUMERIC, default: null, required: false, label: 'user.id', name: 'id', primaryKey: true },
                name : {compType: COMP_TYPE.INPUT, dataType: DATA_TYPE.TEXT, default: null, required: false, label: 'user.name', name: 'name' },
                username : {compType: COMP_TYPE.INPUT, dataType: DATA_TYPE.TEXT, default: null, required: false, label: 'user.username', name: 'username' },
                password : {compType: COMP_TYPE.PASSWORD, dataType: DATA_TYPE.PASSWORD, default: null, required: false, label: 'user.password' , name: 'password' }
            }
        },
        update: {
            fields: {
                id : {compType: COMP_TYPE.INPUT, dataType: DATA_TYPE.NUMERIC, default: null, required: false, label: 'user.id', editable: false, name: 'id', primaryKey: true },
                name : {compType: COMP_TYPE.INPUT, dataType: DATA_TYPE.TEXT, default: null, required: false, label: 'user.name', name: 'name' },
                username : {compType: COMP_TYPE.INPUT, dataType: DATA_TYPE.TEXT, default: null, required: false, label: 'user.username', name: 'username' },
                password : {compType: COMP_TYPE.PASSWORD, dataType: DATA_TYPE.PASSWORD, default: null, required: false, label: 'user.password', name: 'password' }
            }
        },
        list : {
            table: {
                id: { sort: false, filter: false, name: "id", primaryKey: true },
                name: { sort: false, filter: false, name: "name" },
                username: { sort: false, filter: false, name: "username" }
            }
        }
    },
    event: {
        create: {
            fields: {
                id : {compType: COMP_TYPE.INPUT, dataType: DATA_TYPE.NUMERIC, default: null, required: false, label: 'event.id', name: 'id', primaryKey: true },
                user : {compType: COMP_TYPE.SELECT, dataType: DATA_TYPE.OBJECT, default: -1, required: false, value: 'user.id', label: 'user.name', name: 'user.name' },
                start: {compType: COMP_TYPE.DATE_TIME, dataType: DATA_TYPE.DATE_TIME, default: null, required: false, label: 'event.start', name: 'start' },
                description: {compType: COMP_TYPE.TEXT_AREA, dataType: DATA_TYPE.TEXT, default: null, required: false, label: 'event.description', name: 'description' },
            }
        },
        update: {
            fields: {
                id : {compType: COMP_TYPE.INPUT, dataType: DATA_TYPE.NUMERIC, default: null, required: false, label: 'event.id', editable: false, name: 'id', primaryKey: true },
                user : {compType: COMP_TYPE.SELECT, dataType: DATA_TYPE.OBJECT, default: -1, required: false, value: 'user.id', label: 'user.name', name: 'user.name' },
                start: {compType: COMP_TYPE.DATE_TIME, dataType: DATA_TYPE.DATE_TIME, default: null, required: false, label: 'event.start', name: 'start' },
                description: {compType: COMP_TYPE.TEXT_AREA, dataType: DATA_TYPE.TEXT, default: null, required: false, label: 'event.description', name: 'description' },
            }
        },
        list : {
            table: {
                id: { sort: false, filter: false, name: "id", primaryKey: true },
                name: { sort: false, filter: false, ref: 'user.name', name: "user" },
                start: { sort: false, filter: false, name: "start" },
                description: { sort: false, filter: false, name: "description" }
            }
        }
    }
}