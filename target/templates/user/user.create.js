var userController = (() => {
    var validate = ()=>{
        return true;
    }
    return {
        submit : () =>{
            if (validate()) {
                fetch('api/v1/user', { method: "PUT" })
                .then( (response) => {
                    alert('user saved');
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