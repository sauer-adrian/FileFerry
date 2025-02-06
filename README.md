# FileFerry

**FileFerry** is a web-based application that enables users to easily import specific Excel files into SAP Business One (SAP B1) HANA. With FileFerry, users can simply drag and drop or use a file explorer to select Excel files, which are then processed and imported into SAP B1 HANA, ensuring a seamless data flow between your Excel sheets and the system.

## Technologies Used

- **Frontend Framework**: [Nuxt.js 3](https://nuxtjs.org/)  
- **UI Framework**: [Nuxt UI](https://github.com/nuxt/ui) v3.0.0-alpha.12 (includes Tailwind CSS v4)
- **Excel Processing**: [ExcelJS](https://www.npmjs.com/package/exceljs)
- **Nuxt Modules**:
  - [Nuxt Color Mode](https://github.com/nuxt-modules/color-mode)
  - [@nuxt/icon](https://github.com/nuxt/icon)

## Features

- **Drag & Drop Support**: Allows users to drag and drop Excel files directly into the web app.
- **File Explorer**: Users can also select Excel files through a file explorer interface.
- **Excel to SAP B1 HANA Import**: FileFerry processes the imported Excel file and pushes the data into SAP B1 HANA seamlessly.
- **Tailwind CSS Styling**: Modern, responsive, and customizable design with the power of Tailwind CSS.
- **Dark Mode & Light Mode**: Automatically switch between dark and light modes with the Nuxt Color Mode module.

## Installation

To get started with FileFerry, follow the instructions below:

### Prerequisites

Before you begin, make sure you have the following installed on your machine:

- Node.js (version 16 or higher recommended)
- npm or yarn

### Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/fileferry.git
    cd fileferry
    ```

2. **Install dependencies**:
    ```bash
    npm install
    # or if using yarn:
    yarn install
    ```

3. **Run the development server**:
    ```bash
    npm run dev
    # or if using yarn:
    yarn dev
    ```

4. Open your browser and visit `http://localhost:3000`.