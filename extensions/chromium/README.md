
### Prerequisites

    npm install
    cp .env_template .env
    # Then update .env as needed. Documentation of configuration options is included in the file itself.

### Develop extension

1) Run `npm start`.
2) Open `localhost:4000` in your browser (or instead of `localhost:4000`, open the URL set in `.env/REACT_APP_FRONTEND_ORIGIN`).
3) Live reloading is enabled, so whenever you save an edited file the page reloads automatically.

### Build extension

    npm run build

### Install extension

1) Navigate to chrome://extensions in your browser. You can also access this page by clicking on the Chrome menu on the top right side of the Omnibox, hovering over More Tools and selecting Extensions.
2) Check the box next to Developer Mode.
3) Click `Load unpacked` and select the `./build/` directory created by `npm run build`.
4) You should now be able to use the extension.

