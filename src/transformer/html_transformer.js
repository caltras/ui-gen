const _ = require('lodash');
const translateService = (key) =>{
    return key;
}
const elementFactory = (obj, page) =>{
    switch (page){
        case "create":
        case "update":
            return input(obj);
        case "list":
            return column(obj);
    }
}
const column = (obj) =>{
    return `<td>${obj.name ? _.capitalize(obj.name) : obj.label}</td>`;
}
const table = (elements, domain, page) =>{
    return `<table class="${domain}-list">
            <thead class="${domain}-list-thead">
                <tr>
                    ${elements.join('')}
                </tr>
            </thead>
            <tbody class="${domain}-list-tbody">
            </tbody>
            <tfoot class="${domain}-list-tfoot">
            <tfoot>
        </table>`;
}
const input = (obj) =>{
    return `
            <div class="form-input">
                <label aria-label="${obj.label}">${obj.name ? _.capitalize(obj.name) : obj.label}:</label>
                <input type="${obj.compType}" ${obj.required ? 'required' : ''} 
                    name="${obj.name.replace(/\./g,"_")}" 
                    label="${obj.label}" aria-label="${obj.label}">
            </div>`;
    
};
const form = (elements, domain, page)=> {
    return `<form action="/${domain}" method="${page === 'create' ? 'PUT': 'POST'}" onsubmit="return ${domain}Controller.submit();">
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
            if (page.fields){
                Object.keys(page.fields).forEach ( (f) =>{
                    const templateInput = elementFactory(page.fields[f], k);
                    templatePage.elements.push(templateInput);
                });
                templates[d][k] = form(templatePage.elements, d, k);
            } else {
                if (page.table){
                    Object.keys(page.table).forEach ( (f) =>{
                        const templateInput = elementFactory(page.table[f], k);
                        templatePage.elements.push(templateInput);
                    });
                    templates[d][k] = table(templatePage.elements, d, k);
                }
            }
            
        });
    });
    return templates;
}