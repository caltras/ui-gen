const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const ComponentFactory = require('../components/react_components');

const formClassTemplate = fs.readFileSync(path.join(__dirname, '../assets/template/react/form.component.js.tpl'),'utf8');
const listClassTemplate = fs.readFileSync(path.join(__dirname, '../assets/template/react/list.js.tpl'),'utf8');

const translateService = (key) =>{
    return `{ translate('${key}') }`;
}
const elementFactory = (obj, page, f) =>{
    switch (page){
        case "create":
        case "update":
            const factory = new ComponentFactory[obj.compType](obj, f);
            return factory;
        case "list":
            return new ColumnTemplate(obj, f);
    }
};

class FormTemplate {
    constructor(domain, elements, method){
        this.domain = domain;
        this.elements = elements;
        this.method = method;
    }
    render() {
        return `<form action="/${this.domain}" method="${this.method}" onSubmit={handleSubmit}>
                        ${this.elements.join('')}
                        <div className="group-button">
                            <button type="button" className="button cancel">
                                ${translateService('label.cancel')}
                            </button>
                            <button type="submit" className="button submit">
                                ${translateService('label.save')}
                            </button>
                        </div>
                    </form>`;
    }
}
class PageTemplate {
    constructor(){
        this.hooks = [];
        this.functions = [];
        this.startFunctions = [];
        this.elements = [];
        this.fields = [];
        this.domain = '';
        this.type= '';
    }
    setElements(elements){
        this.elements = elements;
    }
    setHooks(h){
        this.hooks = h;
    }
    setFunctions(f) {
        this.functions = f;
    }
    setStartFunctions(f) {
        this.startFunctions = f;
    }
    setDomain(d) {
        this.domain = d;
    }
    setType(t) {
        this.type = t;
    }
    setFields(f) {
        this.fields = f;
    }
    render(){
        const urlAPI = process.env['api-url'];
        const method = this.type === 'create' ? 'PUT': 'POST';
        const template = new FormTemplate(this.domain, this.elements, method);
        if (this.type === 'update'){
            this.startFunctions.push(`load();`);
            this.functions.push(`const load = () => {
                setLoading(true);
                fetch('${urlAPI}/${this.domain}/'+params.id)
                .then( (response) => {
                    return response.json()
                })
                .then( (json) => {
                    try{
                        Object.keys(json).forEach(key => {
                            if (stateMaps.hasOwnProperty(key)){
                                let value  = json[key] || '';
                                stateMaps[key](value);
                            }
                        });
                        setLoading(false);
                    }catch(e){
                        setErrorMessage(e);
                        setLoading(false);
                    }
                }).catch( (e) => {
                    setErrorMessage(e);
                    setLoading(false);
                } )
            }`)
        }
        return formClassTemplate.format('template', template.render())
                                .format('domain-ref', this.domain)
                                .format('url', `${urlAPI}/${this.domain}`)
                                .format('className',_.capitalize(this.domain)+_.capitalize(this.type))
                                .format("domain", _.capitalize(this.domain))
                                .format("page", _.capitalize(this.type))
                                .format("hooks", this.hooks.join('\n    '))
                                .format("method", this.method)
                                .format("fields", this.fields.join(', '))
                                .format("functions", this.functions.join('\n'))
                                .format("startFunctions", this.startFunctions.join('\n'));
    }
}

class ColumnTemplate{
    constructor(_obj, _field){
        this.obj = _obj;
        this.field = _field;
    }
    render(){
        return `<td>${this.obj.name ? _.capitalize(this.obj.name) : this.obj.label}</td>`
    }
}
class ListTemplate extends PageTemplate{
    constructor(){
        super();
        this.columns = []
    }
    render(){
        const urlAPI = process.env['api-url'];

        const template = `<table className="${this.domain}-list">
            <thead className="${this.domain}-list-thead">
                <tr>
                    ${this.elements.join('')}<td></td><td></td>
                </tr>
            </thead>
            <tbody className="${this.domain}-list-tbody">
                { 
                    data.map ( (d, index) => {
                        return (<tr key={index}> { 
                            getKeys().map ( (k, index) => {
                                return (<td key={'td'+index}>{d[k]}</td>);
                            }) 
                        }
                        <td>
                            <button onClick={(e) => handleDelete(d.id, e) }>{translate('label.delete')}</button>
                        </td>
                        <td>
                            <Link to={"/${this.domain}/update/" + d.id}>{translate('label.edit')}</Link>
                        </td>
                        </tr>);
                    })
                }
            </tbody>
            <tfoot className="${this.domain}-list-tfoot">
            </tfoot>
        </table>`;
        

        return listClassTemplate.format('template', template)
                                .format('domain-ref', this.domain)
                                .format('url', `${urlAPI}/${this.domain}`)
                                .format('className',_.capitalize(this.domain)+_.capitalize(this.type))
                                .format("domain", _.capitalize(this.domain))
                                .format("page", _.capitalize(this.type))
                                .format("method", 'GET')
                                .format("fields","'"+this.fields.join("', '")+"'");
    }
}
module.exports = {
    elementFactory,
    PageTemplate,
    FormTemplate,
    ColumnTemplate,
    ListTemplate
}