import config from './config.json';
import { use, configureStore } from 'wappsto-redux';

use(config);

export default store = configureStore();
