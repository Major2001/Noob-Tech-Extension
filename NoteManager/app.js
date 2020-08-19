import NoteManager from "./notemanager.js";
// import Note from "./Note";

let date = "",
  time = "";
const getTime = async () => {
  const response = await (
    await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
  ).json();
  const res = response.datetime.split("T");
  date = res[0];
  time = res[1].split(".")[0];
};


chrome.storage.sync.get("notes", (data) => {
  const notemanager = new NoteManager({
    el: document.querySelector(".mynotes"),
    notes: data.notes,
  });
  
  const newnotebtn = document.querySelector(".newnote");
  newnotebtn.onclick = () => {
    notemanager.addnote({
      title: " Note added ",
      body: " (...click to add body...) ",
      time: time,
      date: date,
      url:'created by you'

    });
  };

  notemanager.onnotechange=(noteobj)=>{
    console.log(noteobj);
};
});
