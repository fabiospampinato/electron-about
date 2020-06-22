
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

    win.show ();
    win.focus ();

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
          webSecurity: true
        }
      };

      About.window = new BrowserWindow ( windowOptions );

      About.window.once ( 'closed', () => { About.cleanup (); options.onClose?.(); } );
      About.window.webContents.once ( 'did-finish-load', () => { About.focus (); options.onOpen?.(); } );

      const html = About.makeHTML ( options ).trim (),
            html64 = Buffer.from ( html ).toString ( 'base64' );

      About.window.loadURL (  `data:text/html;base64,${html64}` );

    } else {

      About.focus ();

    }

  },

  cleanup: (): void => {

    delete About.window;

  },

  close (): void {

    const win = About.window;

    if ( !win ) return;

    win.close ();

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
