/* Import vendor ************************ */
import './vendor.js';
import LazyLoad from "vanilla-lazyload";

/* Import common scripts ******************* */
import './scripts/setHeight.js';

/* Import main components ***************** */
import tooltip from './components/tooltip.js';
import datepicker from './components/datepicker.js';
import fancybox from './components/fancybox.js';
import scrollbar from './components/scrollbar.js';
import {modal} from './components/modal.js';
import sticky from './components/sticky.js';
import switchBlock from './components/switchBlock.js';
import dropdown from './components/dropdown.js';
import tabs from './components/tabs.js';
import tabMenu from './components/tabMenu.js';
import scrollTo from './components/scrollTo.js';
import tags from './components/tags.js';
import navigation from './components/navigation.js';
import sidebarMenu from './components/sidebarMenu.js';
import rating from './components/rating.js';

/* Import form components ***************** */
import fieldBox from './form/fieldBox.js';
import counter from './form/counter.js';

/* Import additional components ***************** */
import swiper from './components/swiper.js';
import animation from './components/animation.js';
import parallax from './components/parallax.js';

/* Import header scripts ******************* */
import headerFixed from './header/headerFixed.js';
import headerMenu from './header/headerMenu.js';
import headerSearch from './header/headerSearch.js';

/* Import additional scripts ******************* */
import buttonUp from './scripts/buttonUp.js';
import switchSeason from './scripts/switchSeason.js';
import homeParallax from './scripts/homeParallax.js';
import filtersInit from './scripts/filters.js';
import filterPopup from './scripts/filterPopup.js';
import detailedDescription from './scripts/detailedDescription.js';
import detailGallery from './scripts/detailGallery.js';
import detailBooking from './scripts/detailBooking.js';
import sheduleCalendar from './scripts/sheduleCalendar.js';
import mapMarkers from './scripts/mapMarkers.js';
import selectPeriod from './scripts/selectPeriod.js';

/* Import validation ******************* */
import validation from './validation.js';

/* Initialization main components ************* */
tooltip();
datepicker();
fancybox();
scrollbar();
modal.init();
sticky();
switchBlock();
dropdown();
tabs();
tabMenu();
scrollTo();
tags();
navigation();
sidebarMenu();
rating();

/* Initialization form components ************* */
fieldBox();
counter();

/* Initialization additional components ******* */
swiper();
animation();
parallax();

/* Initialization header scripts ************** */
headerFixed();
headerMenu(1199);
headerSearch();

/* Initialization additional scripts ********** */
buttonUp();
switchSeason();
homeParallax();
filtersInit();
filterPopup();
detailedDescription();
detailGallery();
detailBooking();
sheduleCalendar();
mapMarkers();
selectPeriod();

/* Validation ************************ */
validation();

// Lazy Load
new LazyLoad();
