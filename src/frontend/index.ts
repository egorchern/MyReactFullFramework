import {setup, attachEvent} from '../framework/index.js';

const rootNode = setup('reactful-parent');

attachEvent('click', rootNode!, (eventTarget) => {
    console.log('Clicked on:', "clicked on root");
})