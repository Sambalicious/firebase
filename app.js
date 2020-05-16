const cafeList = document.querySelector('#cafe-list')
const form = document.querySelector('#add-cafe-form');

//create and render Cafe

const renderCafe = (doc) =>{
    let li = document.createElement('li');
    let name =document.createElement('span');
    let city = document.createElement('span');
    let cancelled = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cancelled.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cancelled)
   

    cafeList.appendChild(li);


    ///delete data

    cancelled.addEventListener('click', (e)=> {
            e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id');

            db.collection('cafe').doc(id).delete();
            
    })
};


//saving data to database
form.addEventListener('submit', (e)=> {
    e.preventDefault();
    db.collection('cafe').add({
        name: form.name.value,
        city: form.city.value
    })
    form.name.value='';
    form.city.value='';
})

/*
/////getting data from database
db.collection('cafe').get().then((response) => {
    response.docs.forEach(doc => {
       renderCafe(doc)
    })
})

*/

///realTime Listeners

db.collection('cafe').orderBy('city').onSnapshot(response => {
    let changes = response.docChanges();
        changes.forEach(change => {
            if (change.type === 'added'){
                renderCafe(change.doc);
            }
            else if(change.type == 'removed') {
                let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
                cafeList.removeChild(li);

            }
        })
})