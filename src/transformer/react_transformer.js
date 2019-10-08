const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const formClassTemplate = fs.readFileSync(path.join(__dirname, '../assets/template/react/form.component.js.tpl'),'utf8');
const listClassTemplate = fs.readFileSync(path.join(__dirname, '../assets/template/react/list.js.tpl'),'utf8');

const translateService = (key) =>{
    return key;
}
const elementFactory = (obj, page, f) =>{
    switch (page){
        case "create":
        case "update":
            return input(obj, f);
        case "list":
            return column(obj, f);
    }
}
const column = (obj, field) =>{
    return `<td>${obj.name ? _.capitalize(obj.name) : obj.label}</td>`;
}
const table = (elements, domain, page, fields) =>{
    const template = `<table class="${domain}-list">
                <thead class="${domain}-list-thead">
                    <tr>
                        ${elements.join('')}
                    </tr>
                </thead>
                <tbody class="${domain}-list-tbody">
                    { 
                        data.map ( (d) => {
                            return (<tr> { 
                                getKeys().map ( (k) => {
                                    return (<td>{d[k]}</td>);
                                }) 
                            }</tr>);
                        })
                    }
                </tbody>
                <tfoot class="${domain}-list-tfoot">
                </tfoot>
            </table>`;
    return listClassTemplate.format('template', template)
                    .format('domain-ref', domain)
                    .format('url', `/${domain}`)
                    .format('className',_.capitalize(domain)+_.capitalize(page))
                    .format("domain", _.capitalize(domain))
                    .format("page", _.capitalize(page))
                    .format("method", 'GET')
                    .format("fields","'"+fields.join("', '")+"'");
}
const hooksUtil = (obj, field) =>{
    const ref = field.substring(field.lastIndexOf('.') + 1);
    return `const [${field}, set${_.capitalize(field)}] = useState();`;
}
const input = (obj, field) =>{
    const ref = field.substring(field.lastIndexOf('.') + 1);
    return `
                    <div class="form-input">
                        <label aria-label="${obj.label}">${obj.name ? _.capitalize(obj.name) : obj.label}:</label>
                        <input type="${obj.compType}" ${obj.required ? 'required' : ''} 
                            name="${obj.name.replace(/\./g,"_")}" 
                            label="${obj.label}" aria-label="${obj.label}"
                            onChange={ (e)=> set${_.capitalize(ref)}(e.target.value)}/>
                    </div>`;
    
};
const form = (elements, domain, page, hooks, fields)=> {
    const method = page === 'create' ? 'PUT': 'POST';
    const template = `<form action="/${domain}" method="${method}" onSubmit={handleSubmit}>
                    ${elements.join('')}
                    <div class="group-button">
                        <button type="button" class="button cancel">
                            ${translateService('label.cancel')}
                        </button>
                        <button type="submit" class="button submit">
                            ${translateService('label.save')}
                        </button>
                    </div>
                </form>`;
    return formClassTemplate.format('template', template)
                            .format('domain-ref', domain)
                            .format('url', `/${domain}`)
                            .format('className',_.capitalize(domain)+_.capitalize(page))
                            .format("domain", _.capitalize(domain))
                            .format("page", _.capitalize(page))
                            .format("hooks", hooks.join('\n    '))
                            .format("method", method)
                            .format("fields", fields.join(', '));
};
module.exports = (metadata) =>{
    const domains = Object.keys(metadata)
    const templates = {};
    domains.forEach ( (d) => {
        const pages = Object.keys(metadata[d]);
        //user
        templates[d] = { };
        pages.forEach( (k) => {
            const page = metadata[d][k];
            // create, update, list
            const templatePage = templates[d][k] = templates[d][k] || { elements : []};
            const hooks = [];
            const fields = [];
            if (page.fields){
                
                Object.keys(page.fields).forEach ( (f) =>{
                    const templateInput = elementFactory(page.fields[f], k, f);
                    const h = hooksUtil(page.fields[f], f);
                    hooks.push(h);
                    fields.push(f);
                    templatePage.elements.push(templateInput);
                    
                });
                templates[d][k] = form(templatePage.elements, d, k, hooks, fields);
            } else {
                if (page.table){
                    Object.keys(page.table).forEach ( (f) =>{
                        const templateInput = elementFactory(page.table[f], k);
                        templatePage.elements.push(templateInput);
                        fields.push(f);
                    });
                    templates[d][k] = table(templatePage.elements, d, k, fields);
                }
            }
        });
    });
    return templates;
}