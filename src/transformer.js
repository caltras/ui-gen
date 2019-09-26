const translateService = (key) =>{
    return key;
}
const input = (obj) =>{
    return `
            <div class="form-input">
                <label aria-label="${obj.label}">${obj.label}:</label>
                <input type="${obj.compType}" ${obj.required ? 'required' : ''} 
                    name="${obj.label.replace(/\./g,"_")}" 
                    label="${obj.label}" aria-label="${obj.label}">
            </div>`;
    
};
const form = (elements, domain, page)=> {
    return `<form action="/${domain}" method="${page === 'create' ? 'PUT': 'POST'}" onsubmit="${domain}Controller.submit()">
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
                    const templateInput = input(page.fields[f]);
                    //console.log(templateInput);
                    templatePage.elements.push(templateInput);
                });
            }
            templates[d][k] = form(templatePage.elements, d, k);
            
        });
    });
    return templates;
}