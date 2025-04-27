import { readFileSync } from "fs";
import { join } from "path";

class StylesManager{
      private styles: string;
      constructor() {
            this.styles = readFileSync(join(__dirname, "../dist/styles.css"), "utf-8");
      }

      getStyles = () => {
            return this.styles;
      }
}

export default StylesManager;