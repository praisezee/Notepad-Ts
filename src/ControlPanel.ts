import {
  QWidget,
  QComboBox,
  QPushButton,
  QColorDialog,
  QFileDialog,
  FlexLayout,
  WidgetEventTypes,
  QFontDatabase,
  QLineEdit,
} from '@nodegui/nodegui';
import { writeFileSync, readFileSync } from 'fs';
import TextEditor  from './TextEditor';

class ControlPanel {
  private widget: QWidget;
  private textEditor: TextEditor;
  private fontCombo: QComboBox;
  private sizeCombo: QComboBox;
  private sizeInput: QLineEdit;

  constructor(textEditor: TextEditor) {
    this.textEditor = textEditor;
    this.widget = new QWidget();
    this.widget.setObjectName('controls');
    this.widget.setLayout(new FlexLayout());

    this.fontCombo = new QComboBox();
    this.sizeCombo = new QComboBox();
    this.sizeInput = new QLineEdit();
    this.setupControls();
  }

  getWidget(): QWidget {
    return this.widget;
  }

  private setupControls(): void {
    const layout = this.widget.layout() as FlexLayout;
    const fontDatabase = new QFontDatabase();
    const fontFamilies = fontDatabase.families();

    // Font type dropdown
    this.fontCombo.addItems(fontFamilies);
    this.fontCombo.setInlineStyle('padding: 4px; border-radius: 4px; border: 1px solid #d1d5db;');
    this.fontCombo.addEventListener('currentTextChanged', () => {
      this.updateFont();
    });
    layout.addWidget(this.fontCombo);

    // Font size dropdown
    const fontSizes = Array.from({ length: 65 }, (_, i) => (8 + i).toString());
    this.sizeCombo.addItems(fontSizes);
    this.sizeCombo.setCurrentIndex(4);
    this.sizeCombo.setInlineStyle('padding: 4px; border-radius: 4px; border: 1px solid #d1d5db;');
    this.sizeCombo.addEventListener('currentTextChanged', () => {
      const size = parseInt(this.sizeCombo.currentText(), 10);
      this.sizeInput.setText(size.toString());
      this.updateFont();
    });
    layout.addWidget(this.sizeCombo);

    // Font size input
    this.sizeInput.setPlaceholderText('Custom Size');
    this.sizeInput.setInlineStyle('padding: 4px; border-radius: 4px; border: 1px solid #d1d5db;');
    this.sizeInput.setText('12');	
    this.sizeInput.addEventListener("textChanged", () => {
      const size = parseInt(this.sizeInput.text(), 10);
      if (!isNaN(size) && size >= 8 && size <= 72) {
        this.sizeCombo.setCurrentText(size.toString());
        this.updateFont();
      }
    })
    layout.addWidget(this.sizeInput);

    // Font color button
    const colorButton = new QPushButton();
    colorButton.setText('Pick Color');
    colorButton.setInlineStyle('padding: 4px 8px; background-color: #3b82f6; color: white; border-radius: 4px;');
    colorButton.addEventListener(WidgetEventTypes.MouseButtonRelease, () => {
      const colorDialog = new QColorDialog();
      colorDialog.exec();
      const color = colorDialog.selectedColor();
      if (color) {
        this.textEditor.setTextColor(`rgb(${color.red()}, ${color.green()}, ${color.blue()})`);
      }
    });
    layout.addWidget(colorButton);

    // Save button
    const saveButton = new QPushButton();
    saveButton.setText('Save');
    saveButton.setInlineStyle('padding: 5px 10px; background-color: #10b981; color: white; border-radius: 5px;');
    saveButton.addEventListener(WidgetEventTypes.MouseButtonRelease, () => {
      const fileDialog = new QFileDialog();
      fileDialog.setFileMode(0);
      fileDialog.setAcceptMode(1);
      fileDialog.setNameFilter('Text Files (*.txt);;All Files (*.*)');
      if (fileDialog.exec()) {
        const filePath = fileDialog.selectedFiles()[0];
        writeFileSync(filePath, this.textEditor.getText());
      }
    });
    layout.addWidget(saveButton);

    // Load button
    const loadButton = new QPushButton();
    loadButton.setText('Load');
    loadButton.setInlineStyle('padding: 4px 8px; background-color: #10b981; color: white; border-radius: 4px;');
    loadButton.addEventListener(WidgetEventTypes.MouseButtonRelease, () => {
      const fileDialog = new QFileDialog();
      fileDialog.setFileMode(1);
      fileDialog.setNameFilter('Text Files (*.txt);;All Files (*.*)');
      if (fileDialog.exec()) {
        const filePath = fileDialog.selectedFiles()[0];
        const content = readFileSync(filePath, 'utf8');
        this.textEditor.setText(content);
      }
    });
    layout.addWidget(loadButton);

    // Initial font setup
    this.updateFont();
  }

  private updateFont(): void {
    const comboBoxes = this.widget.children().filter(child => child instanceof QComboBox) as QComboBox[];
    const fontCombo = comboBoxes[0];
    const sizeCombo = comboBoxes[1];
    const fontFamily = fontCombo.currentText();
    const fontSize = parseInt(sizeCombo.currentText(), 10);
    this.textEditor.setFont(fontFamily, fontSize);
  }
}

export default ControlPanel;