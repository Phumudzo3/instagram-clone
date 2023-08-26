
class Profile{
    constructor(){
this.$form=document.getElementById("myForm");
this.$clickedMenu = document.querySelector(".clickedMenu");
this.$clickLogout = document.querySelector(".clickLogOut");
this.addEventListeners();

this.$app =document.querySelector("#app");
this.$app.style.display="none";
his.ui = new firebaseui.auth.AuthUI(auth);
     this.$firebaseAuthContainer=document.querySelector("#firebaseui-auth-container");


    }
    
    addEventListeners(){
        this.$clickedMenu.addEventListener("click",(event) =>{
            console.log("yes clieckd")
          this.openForm() ;
        });
        this.$clickLogout.addEventListener("click",(event) =>{
            console.log("logout")
            this.closeForm() ;
        });
    }
     openForm() {
        this.$form.style.visibility = "visible";
        this.$clickedMenu.style.visibility = "hidden";
      }
      
      closeForm() {
        this.$form.style.visibility= "hidden";
        this.$clickedMenu.style.visibility = "visible";
      }


      handleLogOut(){
        firebase.auth().signOut().then(() => {
      // Sign-out successful.
        this.redictTOAuth();
    }).catch((error) => {
      console.log("error accrred",error);
    });
    }
    handleAuth(){
        firebase.auth().onAuthStateChanged((user) => {
            
            if (user) {
    
              console.log(user);
              this.userId=user;
              this.$authUserText.innerHTML=user.displayName;
             this.redirectToApp();
           } else {
            this.redictTOAuth();
        }
         });
    }
    
    
    redictTOAuth(){
     
        this.$firebaseAuthContainer.style.display="block";
      this.$app.style.display="none";
       this.ui.start('#firebaseui-auth-container', {
        callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
         // this.userId=authResult.user;
         console.log("authResult",authResult.user);
         this.userId=authResult.user;
              this.$authUserText.innerHTML=user.displayName;
             this.redirectToApp();
         
          return true;
        }
        },
            signInOptions: [
             firebase.auth.EmailAuthProvider.PROVIDER_ID,
             firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
              // Other config options...
         });
    }
    redirectToApp(){
       this.$firebaseAuthContainer.style.display="none";
       this.$app.style.display="block";
       this.fetchNoteFormDb();
    }
    







}
const profile=new Profile() ;