import {surpriseMePrompts} from '../constants';
import FileSaveer from 'file-saver';
export function getRandomPrompt(prompt){
    const randomIndex = Math.floor(Math.random()* surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[randomIndex];
    // just checking if random thing appear tow time in a row.
    if(randomPrompt === prompt) {
        return getRandomPrompt(prompt);
    }
    return randomPrompt;
}
export async function downloadImage(_id,photo){
    FileSaveer.saveAs(photo,`download-${_id}.jpg`);
}