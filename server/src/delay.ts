import { promisify } from 'util';

const delay = () => promisify(setTimeout)(Math.floor(1000 + Math.random() * 3000));

export default delay;