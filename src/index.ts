import NotepadApp from "./Notepad";

const app = new NotepadApp();
app.start();

(global as any).win = app.getWindow();