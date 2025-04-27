import { QMainWindow, QWidget, FlexLayout } from '@nodegui/nodegui';
import TextEditor  from './TextEditor';
import ControlPanel  from './ControlPanel';
import StylesManager  from './StyleManager';

class NotepadApp {
  private window: QMainWindow;
  private textEditor: TextEditor;
  private controlPanel: ControlPanel;
  private stylesManager: StylesManager;

  constructor() {
    // Initialize main window
    this.window = new QMainWindow();
    this.window.setWindowTitle('Notepad App');
    this.window.resize(800, 600);

    // Create central widget and layout
    const centralWidget = new QWidget();
    centralWidget.setObjectName('container');
    centralWidget.setLayout(new FlexLayout());
    this.window.setCentralWidget(centralWidget);

    // Initialize styles manager
    this.stylesManager = new StylesManager();

    // Initialize components
    this.textEditor = new TextEditor();
    this.controlPanel = new ControlPanel(this.textEditor);

    // Add components to layout
    const layout = centralWidget.layout() as FlexLayout;
    layout.addWidget(this.controlPanel.getWidget());
    layout.addWidget(this.textEditor.getWidget());

    // Apply styles
    centralWidget.setStyleSheet(this.stylesManager.getStyles());
  }

  start(): void {
    this.window.show();
  }

  getWindow(): QMainWindow {
    return this.window;
  }
}


export default NotepadApp;