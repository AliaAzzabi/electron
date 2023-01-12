const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

function createWindow () {

//  mainWindow = new BrowserWindow({width: 1800, height: 1200, webPreferences: {        /// <-- update this option
 //   nodeIntegration: true
//  }}); // on définit une taille pour notre fenêtre

 mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    title: 'affichage screen !',
    maximized: true,
    minimize:true,
    center: true,
    novable: true,
    webPreferences: {        /// <-- update this option
      nodeIntegration: true
    }
});
  mainWindow.loadURL(`file://${__dirname}/index.html`); // on doit charger un chemin absolu

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
	
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  mainWindow = new BrowserWindow({
    width: 1800,
    height: 1200,
    center: true,
    title: 'Affichage !',
    movable: false
});