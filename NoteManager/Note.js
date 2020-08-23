export default class Note {
  constructor({ title, body, date, time, url, pinned }, notemanager, page) {
    this.title = title;
    this.body = body;
    this.date = date;
    this.time = time;
    this.url = url;
    this.pinned = pinned;
    this.el = null;
    this.page = page;
    this.notemanager = notemanager;
  }
  getElement() {
    const tpl = this.gettemplate();
    const tempdiv = document.createElement("div");
    tempdiv.innerHTML = tpl
      .replace(/{{title}}/g, this.title)
      .replace("{{body}}", this.body)
      .replace("{{date}}", this.date)
      .replace("{{time}}", this.time)
      .replace("{{url}}", this.url)
      .replace("{{url-1}}", this.url);

    this.el = tempdiv.children[0];

    if (this.page == "all-page") {
      this.eventlisteners();
      if (this.pinned) {
        this.el.querySelector(".mynote-pin").classList.add("pinned");
      } else {
        this.el.querySelector(".mynote-pin").classList.remove("pinned");
      }
    } else {
      this.eventlistenersPopup();
      if (this.pinned) {
        this.el.querySelector(".mynote-pin").classList.add("pinned");
      } else {
        this.el.querySelector(".mynote-pin").classList.remove("pinned");
      }
    }
    return this.el;
  }
  gettemplate() {
    switch (this.page) {
      case "all-page":
        return `
      <div class="mynote">
          <div class="headernote">
              <div class="mynote-title" contenteditable >
                  {{title}}
              </div>
              <div class="mynote-buttons">
                <div class="mynote-pin">
                  <i class="fas fa-thumbtack"></i>
                </div> 
                <div class="mynote-close">
                    <i class="fas fa-trash"></i>
                </div>
              </div> 
          </div>
          <div class="mynote-body" contenteditable>
              {{body}}
          </div>
          <div class="mynote-date" >
              {{date}}  {{time}}
          </div>
          <div class="mynote-url" ><a href="{{url}}" target="_blank" class="urltag">
              {{url-1}}</a>
          </div>
      </div>
      `;
      case "popup":
        return `
      <div class="pinned-container">
        <div class="popup-title">
          {{title}}
        </div>
        <div class="mynote hidden">
            <div class="headernote">
                <div class="mynote-title">
                    {{title}}
                </div>
                <div class="mynote-buttons">
                  <div class="mynote-pin">
                    <i class="fas fa-thumbtack"></i>
                  </div> 
                </div> 
            </div>
            <div class="mynote-body">
                {{body}}
            </div>
            <div class="mynote-date" >
                {{date}}  {{time}}
            </div>
            <div class="mynote-url" ><a href="{{url}}" target="_blank" class="urltag">
                {{url-1}}</a>
            </div>
        </div>
      </div>
      `;
    }
  }

  eventlisteners() {
    const closebtn = this.el.querySelector(".mynote-close");
    const pinBtn = this.el.querySelector(".mynote-pin");
    closebtn.onclick = () => {
      this.notemanager.removenote(this);
    };
    pinBtn.onclick = () => {
      this.notemanager.handlePin(this);
    };
    const title = this.el.querySelector(".mynote-title");

    title.oninput = (ev) => {
      this.title = ev.target.innerHTML;
      this.notemanager.onnotechange(this);
    };
    const body = this.el.querySelector(".mynote-body");
    body.onclick = () => {
      if (this.body === " (...click to add body...) ") {
        this.body = " ";
        this.notemanager.renderNotes("add-note");
        this.notemanager.onnotechange(this);
      }
    };
    body.oninput = (ev) => {
      this.body = ev.target.innerHTML;
      this.notemanager.onnotechange(this);
    };
  }
  eventlistenersPopup() {
    const mainParent = this.el;
    mainParent.querySelector(".popup-title").onclick = () => {
      mainParent.children[1].classList.toggle("hidden");
    };
    mainParent.querySelector(".mynote-pin").onclick = () => {
      this.notemanager.handlePin(this);
    };
  }
}
