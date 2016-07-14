// Initialize Firebase
var config = {
	apiKey: "AIzaSyCbYViXzophYyXOpvpf0nLYYtamQAlzzTg",
	authDomain: "martin-banks-sandbox.firebaseapp.com",
	databaseURL: "https://martin-banks-sandbox.firebaseio.com",
	storageBucket: "",
};
firebase.initializeApp(config);

// write to database
/*
firebase.database().ref('tasks/').push({
  title: 'Learn CRUD',
  done: true
});

firebase.database().ref('tasks/').set({
  abc123: {
    title: 'Overwrite data',
    done: true
  }
});

firebase.database().ref('tasks/xyz890/').set({
  title: 'Set new data',
  done: true
});
firebase.database().ref('tasks/xyz890/anothertask').set({
  title: 'Another new data',
  done: false
});

firebase.database().ref('tasks/xyz890/anothertask').set({
  title: 'Another new data',
  done: true
});

firebase.database().ref('tasks/xyz890').update({
  title: 'Update a value'
});

*/



/*
// reading from database
// once gets data once
// this return a promise so can be chained with .then()
firebase.database().ref('tasks/').once('value').then(function(snapshot) {
  //console.log(i, snapshot.val());
}).then(()=>{
	// this will execute when the promise has finished
})

// --- or ---
// on gets data every time there is achange on the database
// not a promise, can't be chained
firebase.database().ref('tasks/').on('value', function(snapshot) {
  //console.log(i, snapshot.val());
  i++
})
*/

// finalmessage 
const finalNoteText = 'No more notes!!'

const sendUpdate = ()=>{
	let content = document.getElementById('new-item').value;
	document.getElementById('new-item').value = '';
	firebase.database().ref('tasks/savedTasks/').push({
	  note: content
	});
}

delegate('button', 'click', 'button', ()=>{
	sendUpdate()
});
delegate('input', 'keypress', 'input', ()=>{
	if (event.keyCode == 13){
		event.preventDefault();
		sendUpdate()
	}
})

// render tempalte to DOM
const renderUpdate = (source)=>{
	if ( !!source ){
		let notecontent = source;
		let noteKeys = Object.keys(notecontent);
		let displayContent = noteKeys.map((v,i,a)=>{
			return `<li data-key='${v}'>${notecontent[v].note}</li>`
		}).join('');
		document.querySelector('ul').innerHTML = displayContent;
	} else {
		document.querySelector('ul').innerHTML = finalNoteText;
	}	
}

// onload
firebase.database().ref('tasks/savedTasks/').once('value').then(function(snapshot) {
	renderUpdate( snapshot.val() )
})

// on every note change
firebase.database().ref('tasks/savedTasks/').on('value', function(snapshot) {
	renderUpdate( snapshot.val() )
})

delegate('ul', 'click', 'li', ()=>{ // remove on list click
	let removeMe = 'tasks/savedTasks/' + event.target.getAttribute('data-key');
	if ( event.target.parentNode.children.length > 1 ){
		firebase.database().ref(removeMe).remove()
	} else {
		firebase.database().ref(removeMe).remove()
	}
});
