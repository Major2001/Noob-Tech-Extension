export default class Note {
  constructor({ title, body }, notemanager) {
    this.title = title;
    this.body = body;
    this.el = null;
    this.notemanager = notemanager;
  }
  getElement() {
    const tpl = this.gettemplate();
    const tempdiv = document.createElement("div");
    tempdiv.innerHTML = tpl
      .replace("{{title}}", this.title)
      .replace("{{body}}", this.body);
    this.el = tempdiv.children[0];

    this.eventlisteners();

    return this.el;
  }
  gettemplate() {
    return `
        <div class="mynote">
            <div class="headernote">
                <div class="mynote-close">
                    <i class="fas fa-trash"></i>
                </div>
                <div class="mynote-title" contenteditable>
                    {{title}}
                </div>
            </div>
            <div class="mynote-body" contenteditable>
                {{body}}
            </div>
        </div>
        `;
  }

  eventlisteners() {
    const closebtn = this.el.querySelector(".mynote-close");
    closebtn.onclick = () => {
      this.notemanager.removenote(this);
    };

    const title = this.el.querySelector(".mynote-title");
    title.oninput = (ev) => {
      this.title = ev.target.innerHTML;
      this.notemanager.onnotechange(this);
    };
    const body = this.el.querySelector(".mynote-body");
    body.oninput = (ev) => {
      this.body = ev.target.innerHTML;
      this.notemanager.onnotechange(this);
    };
  }
}
