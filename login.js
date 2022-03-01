let t=0;
let action=document.querySelector("#login")
action.addEventListener("click",function(){
   Login()
})

let Login = async ()=> {
    try {
        let login_data = {
          username:document.getElementById("user").value,
     password:document.getElementById("pass").value,
        }
        
        let login_data_json = JSON.stringify(login_data);

        let res = await fetch("https://masai-api-mocker.herokuapp.com/auth/login",{

            method:'POST',

            body: login_data_json,

            headers:{
                "Content-Type": "application/json",
            },
        });
          
         let data = await res.json();
         
         console.log(data)
         if(data.error==false){
              t=1;
         }
         else{
             alert("Invalid credentials")
         }

         getUser(login_data.username, data.token);
       
    } catch (error) {
        console.log("error:", error);
    };
}
   
    let getUser = async (username, token) => {
        let data_arr=[]
        try {
            let res = await fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`,{

              headers:{

                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`,
                },

            }); 

             let data = await res.json();
             console.log("data:", data); 
             data_arr.push(data)
             localStorage.setItem("usertoken",JSON.stringify(data_arr))

             if(t==1){
                window.location.href="index.html"
            }

        } catch (error) {
            console.log("error:", error);
            
        }
    };

    