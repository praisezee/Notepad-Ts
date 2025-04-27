import { QTextEdit, QFont } from "@nodegui/nodegui";

class TextEditor{
      private textEdit: QTextEdit;
      constructor() {
            this.textEdit = new QTextEdit();
            this.textEdit.setObjectName("textEdit");
            this.textEdit.setAcceptRichText(true);
            this.setFont("Arial", 12);
      }

      getWidget = ():QTextEdit => {
            return this.textEdit;
      }

      setFont = (family: string, size: number): void => {
            const font = new QFont(family, size);
            this.textEdit.setFont(font);
      }

      setTextColor = (color: string): void => { 
            this.textEdit.setStyleSheet(`color: ${color};`);
      }

      getText = (): string => {
            return this.textEdit.toPlainText();
      }

      setText = (text: string): void => {
            this.textEdit.setPlainText(text);
      }
}

export default TextEditor;