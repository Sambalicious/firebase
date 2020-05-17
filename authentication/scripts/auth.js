


///listen for any auth state change

auth.onAuthStateChanged(user =>{

    if(user){
      //getting data from firestore
        db.collection('guides').onSnapshot(res=>{
            setupGuides(res.docs);
            setupUi(user)
}, err=>{
    alert(err.message)
});
    }else{
       setupGuides([])
       setupUi()
    }
    })

    ///creating a new guides

    const createForm = document.querySelector('#create-form')


    createForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const title = createForm['title'].value;
        const content = createForm['content'].value;

        db.collection('guides').add({
            title,content
        }).then(()=>{

            const modal = document.querySelector('#modal-create');
            M.Modal.getInstance(modal).close();
             createForm.reset();
        }).catch(err => {
            console.log(error.message);
        });

        })


////sign up
const signUpForm = document.querySelector('#signup-form');

signUpForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    ///get user email

    const email = signUpForm['signup-email'].value;
    const password = signUpForm['signup-password'].value;

    ///sign up the user 

    auth.createUserWithEmailAndPassword(email, password).then(response =>{
            return db.collection('users').doc(response.user.uid).set({
                bio: signUpForm['signup-bio'].value
            });
          }).then(()=>{
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signUpForm.reset();
    }); 
});

//logout 

const logout = document.querySelector('#logout');

logout.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut().then(res =>{
    }).catch(error =>{
        console.log(error.message)
    });
})

//login user

const loginForm = document.querySelector('#login-form')

loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const email = loginForm['login-email'].value
    const password = loginForm['login-password'].value

    auth.signInWithEmailAndPassword(email, password).then(res =>{
       
    }).catch(error =>{
        alert(error.message)
    })

    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();

    loginForm.reset();
})