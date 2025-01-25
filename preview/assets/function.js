"use strict";
import { menuNavSetWidth } from './js/menuNavSetWidth.js';
import { footerYukimasa } from './js/footerYukimasa.js';
import {setPostList, setPager} from './js/posts.js';

window.addEventListener('DOMContentLoaded', menuNavSetWidth, false);
window.addEventListener('DOMContentLoaded', footerYukimasa, false);
window.addEventListener('DOMContentLoaded', setPostList, false);
window.addEventListener('DOMContentLoaded', setPager, false);
