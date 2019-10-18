
const { COMP_TYPE } = require('../types');
const _ = require('lodash');

const mapComponents = {};
class AbstractComponent {
    constructor(_obj, _field) {
        this.obj = _obj;
        this.field = _field;
        this._locales = [];
        this.startFunctions = [];
    }
    locales() {
        return this._locales;
    }
    translateService(key) {
        return `{ translate('${key}') }`;
    }
    createState() {
        return ``;
    }
    getFunctions() {
        return [];
    }
    getStartFunctions(){
        return this.startFunctions;
    }
    render() {
    }

}
class InputComponent extends AbstractComponent {

    createState() {
        return `const [${this.field}, set${_.capitalize(this.field)}] = useState('');
                stateMaps['${this.field}'] = set${_.capitalize(this.field)};`;
    }
    render() {
        const ref = this.field.substring(this.field.lastIndexOf('.') + 1);
        return `
            <div className="form-input">
                <label aria-label="${this.obj.label}">${this.translateService(this.obj.label )}:</label>
                <input type="${this.obj.compType}" ${this.obj.required ? 'required' : ''} 
                    name="${this.obj.name.replace(/\./g, "_")}" 
                    label="${this.obj.label}" aria-label="${this.obj.label}"
                    onChange={ (e)=> set${_.capitalize(ref)}(e.target.value)}
                    value={${ref || ''}}/>
            </div>`;
    }
}
class TextAreaComponent extends AbstractComponent {

    createState() {
        return `const [${this.field}, set${_.capitalize(this.field)}] = useState();
                stateMaps['${this.field}'] = set${_.capitalize(this.field)};`;
    }
    render() {
        const ref = this.field.substring(this.field.lastIndexOf('.') + 1);
        return `
            <div className="form-input">
                <label aria-label="${this.obj.label}">${this.translateService(this.obj.label )}:</label>
                <textarea type="${this.obj.compType}" ${this.obj.required ? 'required' : ''} 
                    name="${this.obj.name.replace(/\./g, "_")}" 
                    label="${this.obj.label}" aria-label="${this.obj.label}"
                    onChange={ (e)=> set${_.capitalize(ref)}(e.target.value)}
                    value={${ref || ''}}>
                    
                </textarea>
            </div>`;
    }
}
class PasswordComponent extends AbstractComponent {

    createState() {
        return `const [${this.field}, set${_.capitalize(this.field)}] = useState();
                stateMaps['${this.field}'] = set${_.capitalize(this.field)};`;
    }
    render() {
        const ref = this.field.substring(this.field.lastIndexOf('.') + 1);
        return `
            <div className="form-input">
                <label aria-label="${this.obj.label}">${this.translateService(this.obj.label )}:</label>
                <input type="${this.obj.compType}" ${this.obj.required ? 'required' : ''} 
                    name="${this.obj.name.replace(/\./g, "_")}" 
                    label="${this.obj.label}" aria-label="${this.obj.label}"
                    onChange={ (e)=> set${_.capitalize(ref)}(e.target.value)}
                    value={${ref || ''}}/>
            </div>`;
    }
}
class SelectComponent extends AbstractComponent {

    createState() {
        const ref = this.field.substring(this.field.lastIndexOf('.') + 1);
        return `const [${ref}List, set${_.capitalize(ref)}List] = useState([]);
                stateMaps['${ref}List'] = set${_.capitalize(ref)}List;
                const [${ref}, set${_.capitalize(ref)}] = useState('');
                stateMaps['${ref}'] = set${_.capitalize(ref)};`;
    }
    getFunctions() {
        return [this.createLoad()];
    }
    createLoad() {
        
        const urlAPI = process.env['api-url'];
        const ref = this.field.substring(this.field.lastIndexOf('.') + 1);
        this.startFunctions.push(`fetch${_.capitalize(ref)}();`);

        return ` const fetch${_.capitalize(ref)} = () => {
                    fetch('${urlAPI}/${ref}')
                    .then( (response)=> {
                        return response.json();
                    })
                    .then( (json) => {
                        set${_.capitalize(ref)}List(json);
                    })
                    .catch((err) => {
                        setErrorMessage(err);
                        setLoading(false);
                    });
                }
        `;
    }
    createOptionComponent() {
        const ref = this.field.substring(this.field.lastIndexOf('.') + 1);
        const key = this.obj.label.substring(this.obj.label.lastIndexOf('.') + 1);
        return `
            {
                ${ref}List && ${ref}List.map ( (v, idx) => {
                    return (<option key={idx} value={v.id}>{v['${key}']}</option>);
                })
            }
        `;
    }
    render() {
        const ref = this.field.substring(this.field.lastIndexOf('.') + 1);
        this._locales[this.obj.name] = ref;

        return `
            <div className="form-input">
                <label aria-label="${ref}">${this.translateService(ref )}:</label>
                <select onChange={ (e)=> set${_.capitalize(ref)}(e.target.value)} value={${ref || ''}}>
                    ${this.createOptionComponent()}
                </select>
            </div>`;
    }
}
mapComponents[COMP_TYPE.INPUT] = InputComponent;
mapComponents[COMP_TYPE.SELECT] = SelectComponent;
mapComponents[COMP_TYPE.PASSWORD] = PasswordComponent;
mapComponents[COMP_TYPE.TEXT_AREA] = TextAreaComponent;
mapComponents[COMP_TYPE.CHECKBOX] = InputComponent;
mapComponents[COMP_TYPE.RADIO] = InputComponent;
mapComponents[COMP_TYPE.HIDDEN] = InputComponent;
mapComponents[COMP_TYPE.DATE] = InputComponent;
mapComponents[COMP_TYPE.DATE_TIME] = InputComponent;

module.exports = mapComponents;