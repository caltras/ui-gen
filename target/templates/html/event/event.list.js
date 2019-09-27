var eventController = (() => {
    var columns = ['id','name','start','description'];
    var renderTable = (data)=> {
        const tableElem = document.querySelector('.event-list > .event-list-tbody');
        data.forEach ( (d) =>{
            var line = document.createElement('TR');
            line.classList.add('event-line');
            columns.forEach (c => {
                var node = document.createElement('TD');
                node.innerHTML = d[c];
                node.classList.add('event-column');
                line.appendChild(node);
            });
            tableElem.appendChild( line);
        });
    }
    var data = [];
    var controller = {
        list : (size, page)=>{
            size = size || 10;
            page = page || 1;
            fetch('api/v1/event', { method: 'GET' })
                .then( (response) => {
                    return response.json();
                })
                .then( (json) => {
                    data = json;
                    renderTable(data);
                })
                .catch( (error) => {
                    alert('Error :'+error.message);
                });
        }
    };
    controller.list();
    return controller;
})();