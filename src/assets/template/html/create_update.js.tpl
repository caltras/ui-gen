var {{domain}}Controller = (() => {
    var validate = ()=>{
        return true;
    }
    return {
        submit : () =>{
            if (validate()) {
                fetch('api/v1/{{domain}}', { method: "{{method}}" })
                .then( (response) => {
                    alert('{{domain}} saved');
                }).catch( (error) => {
                    alert('Error :'+error.message);
                });
            }else{
                alert('Fields required');
            }
            return false;
        }
    };
})();