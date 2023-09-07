
//const initializeApp = () => {
   // const auth = firebase.auth();
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyCQKhWk-P66NEiwI6_pvqU6FEhxjWPH7CE",
      authDomain: "instagram-clone-e08f4.firebaseapp.com",
      projectId: "instagram-clone-e08f4",
      storageBucket: "instagram-clone-e08f4.appspot.com",
      messagingSenderId: "1025129653151",
      appId: "1:1025129653151:web:7e5cb4f73eb3da0136d3aa",
      measurementId: "G-Q37P6QW7DX"
    };
  // Initialize Firebase
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig); 
 const auth= firebase.auth();
 console.log(auth);
// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
console.log(db);
// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();
console.log(storage);
 //console.log(storage); 


class Profile{
    constructor(){
        //adding file caption variable
        this.$fileCaption=document.getElementById("text-value");
        this.$titleStatus=document.getElementById("title-posted");
this.$form=document.getElementById("myForm");
//click menu variable
this.$clickedMenu = document.querySelector(".clickedMenu");
//logout variable
this.$clickLogout = document.querySelector(".clickLogOut");
//create post -upload files variable
this.$modal = document.querySelector(".modal");
    this.$modalForm=document.querySelector(".modal-form");
    this.$createPost=document.querySelector(".open-modal");
//open-status variable
this.$openstatus=document.querySelector(".open-status");
this.$clickOpenStatus=document.querySelector(".diplayPostOnFeeds");
    //post menu
    this.$modalOpenPostModel = document.querySelector(".open-modal-post-menu");
    this.$PostMenuModalForm=document.querySelector(".post-Menu");
    this.$closePostMenuModel=document.querySelector(".post-menu-exit");
    this.$closeModal=document.querySelector(".close-model");
//finalize post{
    this.$FinalizePost=document.querySelector(".finalize-post");
    this.$imageDiv=document.querySelector(".picture-container");
    //uploading-photo variable
    this.$postOnFeedImageDiv=document.querySelector(".pic-posted");
    //opens app div after login 
    this.$firebaseAuthContainer=document.querySelector("#firebaseui-auth-container");
     this.$app =document.querySelector("#app");
this.$app.style.display="none";
//variables for creating a uploading files
this.$progress=document.getElementById("progress");
this.$uploadFile=document.getElementById("send");
this.$getFile=document.getElementById("files");
//access of firebase login interface variable
this.$modalForm=document.querySelector(".modal-form");
this.$logOutButton =document.querySelector(".logout");
this.$authUserText = document.querySelectorAll(".auth-user");
this.ui = new firebaseui.auth.AuthUI(auth);
     this.$firebaseAuthContainer=document.querySelector("#firebaseui-auth-container");
     this.userId="";
     //edit and delete post variables
     this.$editPost = document.querySelector(".editPost");
     this.$deletePost = document.querySelector(".deletePost");

    this.handleAuth();
     this.addEventListeners();
     this.files =[];
    }
     addEventListeners(){
    
 // Declare files as a property of the class
this.$getFile.addEventListener("change", (e) =>{
// the event listener for file input
this.files= e.target.files;
         console.log("Files selected:", this.files);

         });
this.$uploadFile.addEventListener("click",  () =>{ 
            //check if the files are selected  
     if (this.files.length!=0){
         //loop through all the selected files
         for(let i=0;i<this.files.length;i++){
          //  if ((this.files).includes(this.files[i].name)) {
 //console.log("File already uploaded:", this.files[i].name)
//continue;}
      //create a storage reference
      var storageRef = firebase.storage().ref('images/'+ this.files[i].name);
 // Check if the file name is already 

       //upload files
             var upload = storageRef.put(this.files[i]);
             //update progress bar
             upload.on(
      "state_changed",
      (snapshot) => {
        var percentage =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.$progress.value = percentage;
      //var storageRef = firebase.storage().ref(+ this.files[i].name);
         console.log("HI,storage");
         storageRef.getDownloadURL().then((url)=>{
             console.log(url);
            
             const images=document.createElement("img"); 
             const imagePosted=document.createElement("img");
             // Set the width and height properties for both images
    images.style.width = "400px";
    images.style.height = "400px";
    imagePosted.style.width = "410px";
    imagePosted.style.height = "500px";
        
 images.src=url;

this.$imageDiv.appendChild(images);
this.$postOnFeedImageDiv.appendChild(imagePosted);
this.$imageDiv.style.width="400px";
this.$imageDiv.style.height="400px";

imagePosted.src=url;
this.$postOnFeedImageDiv.style.width="410px";
this.$postOnFeedImageDiv.style.height="500px";
this.$postOnFeedImageDiv.style.marginTop= "10px";
this.$postOnFeedImageDiv.style.backgroundRepeat="no-repeat";
//this.$imageDiv.style.backgroundRepeat="no-repeat";


          // 'file' comes from the Blob or File API
storageRef.put(this.files).then((snapshot) => {
  console.log('Uploaded  file!');
 
  this.finalizePostAfterLoadingFiles();
 
});

     })
         .catch (function(error){
             console.log("error encountered");  
         });
      } )
         }
         }
         
        
      });
    
        this.$clickedMenu.addEventListener("click",(event) =>{
          this.openForm() ;
        });

//log out of firebase
        this.$clickLogout.addEventListener("click",(event) =>{
            console.log("logout")
            this.closeForm() ;
        });
        
        this.$logOutButton.addEventListener("click",(event) =>{
        this.handleLogOut();
    });
    //callback function for uploading files
    this.$createPost.addEventListener("click",(event) =>{
        this.openCreatPost();
        console.log("create post")
       
    });
    this.$closeModal.addEventListener("click",(event) =>{
        this.closeModal();
        console.log("close modal")
    });
//callback to click post menu
    this.$modalOpenPostModel.addEventListener("click",(event) =>{
       console.log("clicked post menu")
        this.openPostMenuForm();
    });
//callback to click to close post menu
    this.$closePostMenuModel.addEventListener("click",(event) =>{
       console.log("clicked close post menu");
        this.closePostMenuform();
    });
    this.$clickOpenStatus.addEventListener("click",(event) =>{
        console.log("open status");
       this.$titleStatus.innerHTML= this.$fileCaption.value ;
        this.openLoadedStatus();
    });
    this.$editPost.addEventListener("click",(event) =>{
       this.editPost();
    });
    this.$deletePost.addEventListener("click",(event) =>{
       console.log("delete post");
       this.deletePost();
       this.closePostMenuform();
    });
    }
    
    //
    openLoadedStatus(){
        this.$openstatus.style.visibility="visible";
        this.$modal.style.visibility="hidden";
        this.$FinalizePost.style.visibility = "hidden";
        console.log("posted on feed");
    }
    //open menu form
 openForm() {
        this.$form.style.visibility = "visible";
        this.$clickedMenu.style.visibility = "hidden";
        this.$FinalizePost.style.visibility = "hidden";
      }
      //close menu form
      closeForm() {
        this.$form.style.visibility= "hidden";
        this.$clickedMenu.style.visibility = "visible";
      }
//main menu 
openCreatPost(){
    this.$modal.style.visibility= "visible";
}
//finalize post function
finalizePostAfterLoadingFiles(){
    this.$FinalizePost.style.visibility= "visible";
    
}
//delete post function
deletePost(){
    if (this.files.length!=0){
         //loop through all the selected files
         for(let i=0;i<this.files.length;i++){
      //create a storage reference
// Create a reference to the file to delete
var desertRef =firebase.storage().ref('images/'+ this.files[i].name);
         
// Delete the file
desertRef.delete().then(() => {
  // File deleted successfully
  console.log("deleted post from storage")

  this.$openstatus.replaceChildren();

})
.catch((error) => {
  // Uh-oh, an error occurred!
});
    }
    }
}
editPost(){
this.openCreatPost()
this.$PostMenuModalForm.style.visibility= "hidden";
}
//edit post function
closeModal(){
    this.$modal.style.visibility= "hidden";  
}
//post menu
openPostMenuForm(){
    this.$PostMenuModalForm.style.visibility= "visible";
}

closePostMenuform(){
    this.$PostMenuModalForm.style.visibility= "hidden";
    this.$getFile.value="";  
}
//callback to signing out user
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
   // duplicate username to html class="auth-user"
   this.userId = user.uid;
   const username=user.displayName;
            this.$authUserText.forEach((element) => {
                element.innerHTML = username;});

              console.log(user);
         // this.$authUserText.innerHTML=user.displayName;
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
   
}
}
const profile=new Profile() ;
//};

// Call the initialization function once Firebase modules have loaded
//window.addEventListener('DOMContentLoaded', initializeApp);