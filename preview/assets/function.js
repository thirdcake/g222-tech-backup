"use strict";
import { menuNavSetWidth } from './js/menuNavSetWidth.js';
import { yukimasa } from './js/yukimasa.js';
import {setPostList, setPager} from './js/posts.js';

window.addEventListener('DOMContentLoaded', menuNavSetWidth, false);
window.addEventListener('DOMContentLoaded', yukimasa, false);
window.addEventListener('DOMContentLoaded', setPostList, false);
window.addEventListener('DOMContentLoaded', setPager, false);
