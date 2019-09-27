var {{domain}}Controller = (() => {
    var validate = ()=>{
        return true;
    }
    return {
        submit : () =>{
            if (validate()) {
                fetch('api/v1/{{domain}}', { method: '{{method}}' })
                    .then( (response) => {
                        return response.json();
                    })
                    .then( (json) => {
                        alert('{{domain}} saved');
                    })
                    .catch( (error) => {
                        alert('Error :'+error.message);
                    });
            }else{
                alert('Fields required');
            }
            return false;
        }
    };
})();