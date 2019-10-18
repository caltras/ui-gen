
const { elementFactory, PageTemplate, ListTemplate } = require('../components/react_templates');

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
            let functions = [];
            let startFunctions = [];
            if (page.fields){
                
                Object.keys(page.fields).forEach ( (f) =>{
                    if (!page.fields[f].primaryKey){
                        const instance = elementFactory(page.fields[f], k, f);
                        const templateInput = instance.render();
                        const h = instance.createState();
                        functions = functions.concat(instance.getFunctions());
                        startFunctions = startFunctions.concat(instance.getStartFunctions());
                        hooks.push(h);
                        fields.push(f);
                        templatePage.elements.push(templateInput);
                    }
                    
                });
                const pageInstance = new PageTemplate();
                pageInstance.setElements(templatePage.elements);
                pageInstance.setFunctions(functions);
                pageInstance.setHooks(hooks);
                pageInstance.setDomain(d);
                pageInstance.setType(k);
                pageInstance.setFields(fields);
                pageInstance.setStartFunctions(startFunctions);
                
                templates[d][k] = pageInstance.render();

            } else {
                if (page.table){
                    Object.keys(page.table).forEach ( (f) =>{
                        const columnInstance = elementFactory(page.table[f], k);
                        templatePage.elements.push(columnInstance.render());
                        fields.push(f);
                    });
                    const listInstance = new ListTemplate();
                    listInstance.setDomain(d);
                    listInstance.setType(k);
                    listInstance.setFields(fields);
                    listInstance.setElements(templatePage.elements);
                    templates[d][k] = listInstance.render();
                }
            }
        });
    });
    return templates;
}