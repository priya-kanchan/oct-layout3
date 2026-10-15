'use strict';

// All presentation behaviour uses native browser APIs. Local jQuery is retained
// only for compatibility with the supplied SubmitQueryData integration.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-navigation');
const siteHeader = document.querySelector('.site-header');
function updateHeader() {
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 20);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
new ResizeObserver(() => {
  document.documentElement.style.setProperty('--header-height', siteHeader.offsetHeight + 'px');
}).observe(siteHeader);
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

document.querySelectorAll('[data-residence-step]').forEach(button => {
  button.addEventListener('click', () => {
    const track = document.querySelector('.residence-track');
    const direction = Number(button.dataset.residenceStep);
    if (matchMedia('(max-width:620px)').matches) {
      track.scrollBy({left: direction * track.clientWidth * .85, behavior: 'smooth'});
      return;
    }
    if (direction > 0) track.append(track.firstElementChild);
    else track.prepend(track.lastElementChild);
    [...track.children].forEach((card, index) => {
      card.classList.toggle('featured', index === 1);
      const action = card.querySelector('.button');
      action.classList.toggle('gold', index === 1);
      action.classList.toggle('outline', index !== 1);
    });
  });
});

const floorplans = [
  {type:'Type 1',area:'2,900 sq.ft.',image:'images/floor-plans/4bhk-2900.webp'},
  {type:'Type 2',area:'3,500 sq.ft.',image:'images/floor-plans/4bhk-3500.webp'},
  {type:'Type 3',area:'4,100 sq.ft.',image:'images/floor-plans/4bhk-4100.webp'}
];
const floorplanTabs = [...document.querySelectorAll('[data-plan]')];
function selectFloorplan(index) {
  const plan = floorplans[index];
  floorplanTabs.forEach((tab, i) => {
    tab.classList.toggle('is-active', i === index);
    tab.setAttribute('aria-selected', String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
  });
  const image = document.querySelector('#selected-floorplan');
  image.src = plan.image;
  image.alt = '4 BHK ' + plan.type + ' floor plan';
  document.querySelector('#selected-plan-type').textContent = plan.type;
  document.querySelector('#selected-plan-area').textContent = plan.area;
  document.querySelector('#floorplan-panel').setAttribute('aria-labelledby', floorplanTabs[index].id);
  const preview = document.querySelector('.floorplan-image');
  preview.dataset.image = plan.image;
  preview.dataset.caption = '4 BHK ' + plan.type + ' — ' + plan.area + ' floor plan';
  preview.setAttribute('aria-label', 'Enlarge 4 BHK ' + plan.type + ' floor plan');
}
floorplanTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectFloorplan(index));
  tab.addEventListener('keydown', event => {
    let next = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % floorplanTabs.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + floorplanTabs.length) % floorplanTabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = floorplanTabs.length - 1;
    else return;
    event.preventDefault();
    selectFloorplan(next);
    floorplanTabs[next].focus();
  });
});

const enquiryDialog = document.querySelector('#enquiry-dialog');
document.querySelectorAll('[data-enquire]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('#qMessagepopup').value = '';
    document.querySelector('#enquiry-title').textContent = /floor plan|master plan/.test(button.dataset.enquire) ? 'Request your plan' : /brochure/.test(button.dataset.enquire) ? 'Request brochure' : 'Enquire now';
    if (/building film/.test(button.dataset.enquire)) document.querySelector('#enquiry-title').textContent = 'Request the film';
    enquiryDialog.showModal();
  });
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) document.body.style.overflow = '';
  });
  new MutationObserver(() => {
    if (dialog.open) document.body.style.overflow = 'hidden';
  }).observe(dialog, { attributes: true, attributeFilter: ['open'] });
});

const lightbox = document.querySelector('#lightbox');
const gallery = Array.from(document.querySelectorAll('.gallery-item'));
let imageIndex = 0;
function showImage(source, caption, controls = true) {
  const img = document.querySelector('#lightbox-image');
  img.src = source;
  img.alt = caption;
  document.querySelector('#lightbox-caption').textContent = caption;
  document.querySelector('.lightbox-controls').hidden = !controls;
  if (!lightbox.open) lightbox.showModal();
}
document.querySelector('[data-experience]').addEventListener('click', () => {
  showImage('images/ai/hero-dusk.webp', 'Experience the sea-facing terrace — architectural illustration', false);
});
function stepGallery(step) {
  imageIndex = (imageIndex + step + gallery.length) % gallery.length;
  showImage(gallery[imageIndex].dataset.image, gallery[imageIndex].dataset.caption);
}
document.querySelectorAll('[data-image]').forEach(item => item.addEventListener('click', event => {
  event.preventDefault();
  const index = gallery.indexOf(item);
  if (index >= 0) imageIndex = index;
  showImage(item.dataset.image, item.dataset.caption, index >= 0);
}));
document.querySelectorAll('[data-gallery-step]').forEach(button => button.addEventListener('click', () => stepGallery(Number(button.dataset.galleryStep))));
document.querySelectorAll('[data-lightbox-step]').forEach(button => button.addEventListener('click', () => stepGallery(Number(button.dataset.lightboxStep))));
lightbox.addEventListener('keydown', event => {
  if (document.querySelector('.lightbox-controls').hidden) return;
  if (event.key === 'ArrowLeft') stepGallery(-1);
  if (event.key === 'ArrowRight') stepGallery(1);
});

