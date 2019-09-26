var eventController = (() => {
    var validate = ()=>{
        return true;
    }
    return {
        submit : () =>{
            if (validate()) {
                fetch('api/v1/event', { method: "PUT" })
                .then( (response) => {
                    alert('event saved');
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