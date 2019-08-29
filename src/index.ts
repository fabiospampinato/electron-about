
/* IMPORT */

import {BrowserWindow, BrowserWindowConstructorOptions, MenuItemConstructorOptions} from 'electron';
import {Options} from './types';
import makeHTML from './make_html';

/* ABOUT */

const About = {

  window: undefined as BrowserWindow | undefined,

  focus (): void {

    const win = About.window;

    if ( !win ) return;

    if ( win['__about_loaded'] ) {

      win.show ();
      win.focus ();

    } else {

      win.webContents.once ( 'did-finish-load', () => {
        win['__about_loaded'] = true;
        win.show ();
        win.focus ();
      });

    }

  },

  open ( options: Options ): void {

    if ( !About.window ) {

      const windowOptions: BrowserWindowConstructorOptions = {
        frame: true,
        title: `About ${options.appName}`,
        titleBarStyle: 'default',
        autoHideMenuBar: true,
        fullscreenable: false,
        maximizable: false,
        minimizable: false,
        resizable: false,
        width: 284,
        height: 180,
        show: false,
        icon: options.icon,
        backgroundColor: '#ececec',
        webPreferences: {
          javascript: false,
          webSecurity: false // In order to be able to load `file://` files
        }
      };

      About.window = new BrowserWindow ( windowOptions );

      About.window.once ( 'close', () => delete About.window );

      About.focus ();

      const html = About.makeHTML ( options ).trim (),
            html64 = Buffer.from ( html ).toString ( 'base64' );

      About.window.loadURL (  `data:text/html;base64,${html64}` );

    } else {

      About.focus ();

    }

  },

  close (): void {

    const win = About.window;

    if ( !win ) return;

    win.close ();

  },

  makeMenuItem ( appName: string, options: Options ): MenuItemConstructorOptions {

    return {
      label: `About ${appName}`,
      click () {
        About.open ( options );
      }
    };

  },

  makeHTML

};

/* EXPORT */

export default About;