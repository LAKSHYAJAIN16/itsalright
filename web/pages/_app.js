import "../styles/globals.css";
import "../styles/utils.css";

import Notifications from "../components/Notifications";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Disabling Notifications */}
      {/* <Notifications /> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
