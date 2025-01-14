# ZappTrack 🚀

**ZappTrack** is a web application designed to simplify and enhance drone flight planning. With an interactive interface, users can create, visualize, and export flight plans in KMZ format, compatible with Google Earth and other GIS tools.

## Features

- **Secure Login**: Powered by Firebase Authentication for reliable and secure user management.
- **Interactive Map**: Intuitive tools for drawing and editing flight paths on a map.
- **KMZ File Generation**: Export flight plans directly to KMZ format for use with compatible software and devices.
- **Responsive Design**: Optimized for use across devices, including desktops, tablets, and smartphones.

## Technologies Used

- **Frontend**: React (JavaScript)
- **Authentication**: Firebase Authentication
- **Mapping**: React Leaflet or Google Maps API
- **File Handling**: jszip for KMZ file generation

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/zapptrack.git
   ```

2. Navigate to the project directory:
   ```bash
   cd zapptrack
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_AUTH_DOMAIN=your-auth-domain
   REACT_APP_PROJECT_ID=your-project-id
   REACT_APP_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_MESSAGING_SENDER_ID=your-messaging-sender-id
   REACT_APP_APP_ID=your-app-id
   ```

5. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Open the app in your browser at `http://localhost:3000`.
2. Log in or create an account.
3. Navigate to the main page to create your drone flight plan.
4. Draw flight paths on the map and export them as KMZ files.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your forked repository:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request in the main repository.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to enhance or modify this readme to match your specific project needs or preferences!
