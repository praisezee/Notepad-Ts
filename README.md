# Notepad App

A simple, native desktop Notepad application built with TypeScript, NodeGUI, and Tailwind CSS. The app allows users to edit text, customize font type (all installed system fonts), font size (8 to 72, with custom input), and font color, and save/load text files. It is designed to run on Windows and can be packaged as an installable executable.

## Features

- **Text Editing**: Write and edit text in a native text area.
- **Font Customization**:
  - Choose from all fonts installed on your system.
  - Select font sizes from 8 to 72 points or enter a custom size via an input field.
  - Pick any font color using a native color picker.
- **File Operations**: Save and load `.txt`, `.*` files.
- **Native UI**: Built with NodeGUI for a native Windows look and feel.
- **Styling**: Uses Tailwind CSS for a modern, customizable interface.

## Prerequisites

- **Node.js**: v14 or later (`node --version`).
- **Python**: 3.x for NodeGUI native builds (`python --version`).
- **CMake**: For compiling NodeGUI dependencies (`cmake --version`).
- **Visual Studio Build Tools**: For Windows native compilation.
  - Install via `npm install -g windows-build-tools` or Visual Studio Installer (include "Desktop development with C++").
- **Windows**: Windows 10 or 11 recommended.

## Installation

1. **Clone or Create the Project**:

   ```bash
   mkdir notepad
   cd notepad
   npm init -y
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Initialize Tailwind CSS**:

   ```bash
   npx tailwindcss init
   ```

   Ensure `tailwind.config.js` includes:

   ```javascript
   module.exports = {
     content: ['./src/**/*.{ts,css}'],
     theme: { extend: {} },
     plugins: [],
   };
   ```

4. **Create Project Files**:

   - Ensure the following files exist in the project structure:

     ```
     notepad/
     ├── src/
     │   ├── index.ts
     │   ├── NotepadApp.ts
     │   ├── TextEditor.ts
     │   ├── ControlPanel.ts
     │   ├── StylesManager.ts
     │   ├── input.css
     ├── package.json
     ├── tsconfig.json
     ├── tailwind.config.js
     ├── postcss.config.js
     ```

   - Copy the source code for each file from the project repository or implementation details.

## Project Structure

- `src/index.ts`: Entry point, initializes the app.
- `src/NotepadApp.ts`: Main application class, manages the window and components.
- `src/TextEditor.ts`: Handles text editing and font customization.
- `src/ControlPanel.ts`: Manages font controls and file operations.
- `src/StylesManager.ts`: Loads Tailwind CSS styles.
- `src/input.css`: Tailwind CSS input file for styling.
- `package.json`: Project metadata and scripts.
- `tsconfig.json`: TypeScript configuration.
- `tailwind.config.js`: Tailwind CSS configuration.
- `postcss.config.js`: PostCSS configuration for Tailwind.

## Usage

1. **Build the App**:

   - Compile TypeScript and CSS:

     ```bash
     npm run build
     npm run build:css
     ```

2. **Run the App**:

   ```bash
   npm start
   ```

3. **Development Mode**:

   - Watch for changes in TypeScript and CSS:

     ```bash
     npm run dev
     ```

4. **Features**:

   - **Font Type**: Select any installed font from the dropdown.
   - **Font Size**: Choose a size from 8 to 72 or enter a custom size in the input field.
   - **Font Color**: Click "Pick Color" to choose a color.
   - **File Operations**: Use "Save" to save text as a `.txt` file or "Load" to open a `.txt` file.

## Packaging for Windows

To create an installable executable:

1. **Install NodeGUI Packer**:

   ```bash
   npm install -g @nodegui/packer
   ```

2. **Initialize Packer**:

   ```bash
   nodegui-packer --init "Notepad"
   ```

3. **Build and Pack**:

   ```bash
   npm run build
   npm run build:css
   npm run pack
   ```

   - The executable will be in `deploy/win32`.

4. **Distribute**:

   - Share the `.exe` file or create an installer using tools like Inno Setup.

## Troubleshooting

- **OpenGL Errors** (e.g., `Failed to load opengl32sw`):

  - Update graphics drivers (NVIDIA, AMD, or Intel).

  - Install Mesa3D for software OpenGL:

    - Download from Mesa releases.
    - Copy `opengl32.dll` to `C:\Windows\System32`.

  - Force software rendering:

    ```bash
    set QT_OPENGL=software
    npm start
    ```

- **Stylesheet Parsing Errors**:

  - Ensure `dist/styles.css` contains only Qt-compatible CSS properties (e.g., `padding`, `border`, `background-color`).

  - Simplify `src/input.css` if errors occur:

    ```css
    #container { padding: 16px; background-color: #f3f4f6; }
    #controls { margin-bottom: 16px; }
    #textEdit { border: 2px solid #6b7280; padding: 8px; }
    ```

  - Rebuild CSS:

    ```bash
    npm run build:css
    ```

- **Font Loading Issues**:

  - If the font dropdown is empty, verify `QFontDatabase` is supported in `@nodegui/nodegui@^0.71.0`.

  - Limit font list for performance:

    ```typescript
    const fontFamilies = fontDatabase.families().slice(0, 100);
    ```

- **Build Errors**:

  - Ensure Python, CMake, and Visual Studio Build Tools are installed.

  - Rebuild NodeGUI:

    ```bash
    npm rebuild @nodegui/nodegui
    ```

## Dependencies

- **Runtime**:
  - `@nodegui/nodegui@^0.71.0`: Native desktop UI framework.
  - `@types/node@^22.15.2`: TypeScript definitions for Node.js.
  - `ts-node@^10.9.2`: TypeScript execution environment.
- **Development**:
  - `typescript@^5.8.3`: TypeScript compiler.
  - `tailwindcss@^3`: CSS framework.
  - `postcss@^8.5.3`, `postcss-cli@^11.0.1`, `autoprefixer@^10.4.21`: CSS processing tools.

## License

This project is licensed under the MIT License. See the `package.json` for details.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for bugs, features, or improvements.

## Acknowledgments

- Built with NodeGUI for native desktop applications.
- Styled with Tailwind CSS for a modern UI.