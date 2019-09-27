var userController = (() => {
    var validate = ()=>{
        return true;
    }
    return {
        submit : () =>{
            if (validate()) {
                fetch('api/v1/user', { method: 'POST' })
                    .then( (response) => {
                        return response.json();
                    })
                    .then( (json) => {
                        alert('user saved');
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