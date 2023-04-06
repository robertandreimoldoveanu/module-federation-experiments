import('./bootstrap').then(({attachMicrofrontend}) => {
    attachMicrofrontend(document.querySelector('outlet-ng-remote-two'));
});