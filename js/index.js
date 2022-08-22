const addNote = document.querySelector(".add-Note-btn"),
popupBox = document.querySelector(".popup-box"),
close=document.querySelector(".close"),
notesSec=document.querySelector(".your"),
popupAddNote=document.querySelector(".popup-addNote"),
popupTitle=popupBox.querySelector("header p"),
titleTag=popupBox.querySelector("input"),
descTag=popupBox.querySelector("textarea");

const months=["January","February","March","April","May","June","July","August","September","October","November","December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate=false, updateID;
addNote.addEventListener("click", () => {
    popupBox.classList.add("show");
    titleTag.focus();
});
close.addEventListener("click", () => {
    isUpdate=false;
    titleTag.value=descTag.value="";
    popupAddNote.innerText="Add Note";
    popupTitle.innerText="Add a new note";
    popupBox.classList.remove("show");
});

function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note,index) => {
        let liTag = `<li class="note">
                     <div class="details">
                        <p>${note.title}</p>
                        <span>${note.description}</span>
                     </div>
                     <div class="bottom">
                          <span>${note.date}</span>
                          <div class="setting">
                          <button class="edit-btn" onclick="editNote(${index},'${note.title}','${note.description}')">
                               <img src="img/editing.png" alt="">
                          </button>
                          <button class="delete-btn" onclick="deleteNote(${index})">
                                <img src="img/delete.png" alt="">
                          </button>
                     </div>
                    </div>
                     </li>`;
        notesSec.insertAdjacentHTML("afterend",liTag);
    });
}
showNotes();
function deleteNote(noteId){
    let confirmDel= confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId,1);
    localStorage.setItem("notes",JSON.stringify(notes));
    showNotes();

}
function editNote(noteId, title, desc){
    isUpdate=true;
    updateID=noteId;
    addNote.click();
    popupAddNote.innerText="Update Note";
    popupTitle.innerText="Edit the Note";
    titleTag.value= title;
    descTag.value= desc;;
}

popupAddNote.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle=titleTag.value.trim(),
    noteDesc=descTag.value.trim();
    if(noteTitle || noteDesc){
        let dateObj=new Date(),
        month=months[dateObj.getMonth()],
        day=dateObj.getDate(),
        year=dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        if(!isUpdate){
            notes.push(noteInfo);
        }
        else{
            isUpdate=false;
            notes[updateID] = noteInfo;
        }
        localStorage.setItem("notes",JSON.stringify(notes));
        showNotes();
        close.click();
    }
    
})
let search=document.querySelector(".search-txt");
search.focus();
search.addEventListener("input", ()=>{
    let inputVal=search.value.toLowerCase();
    let notecard=document.getElementsByClassName('note');
    Array.from(notecard).forEach(function(element){
        let cardTitle= element.getElementsByTagName("p")[0].innerText;
        let cardDesc= element.getElementsByTagName("span")[0].innerText;
        if(cardDesc.includes(inputVal) || cardTitle.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})
