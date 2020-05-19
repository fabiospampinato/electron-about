
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

  isOpen (): boolean {

    return !!About.window;

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
        width: 258,
        height: 158,
        useContentSize: true,
        center: true,
        show: false,
        icon: options.icon,
        backgroundColor: '#ececec',
        webPreferences: {
          devTools: false,
          disableDialogs: true,
          enableRemoteModule: false,
          nativeWindowOpen: true,
          nodeIntegration: false,
          nodeIntegrationInWorker: false,
          javascript: false,
          sandbox: true,
          webSecurity: false // In order to be able to load `file://` files
        }
      };

      About.window = new BrowserWindow ( windowOptions );

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

    delete About.window;

  },

  toggle ( options: Options, force?: boolean ): void {

    force = typeof force === 'boolean' ? force : !About.isOpen ();

    if ( force ) return About.open ( options );

    return About.close ();

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
