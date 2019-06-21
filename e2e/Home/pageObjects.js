import { root } from '../helpers';

export const header = () => root().findElement({ css: 'h2' });
export const message = () => root().findElement({ css: '.message' });
export const counterButton = () => root().findElement({ css: '.counterButton' });
