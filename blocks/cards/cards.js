import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

const scrollSpeed = 1; // Adjust this value to change the scroll speed
var intervalStarted = false;
var direction = 1; // 1 for right, -1 for left

function smoothScroll() {
  var items = document.querySelector('.cards.slider ul');
  if (items && items.scrollLeft >= items.scrollWidth - items.clientWidth) { // If we've scrolled to the end...
    direction = -1; // ...change direction to left
  } else if (items.scrollLeft <= 0) { // If we've scrolled to the start...
    direction = 1; // ...change direction to right
  }
  items.scrollLeft += scrollSpeed * direction;
  window.requestAnimationFrame(smoothScroll);
}


export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-media';
      } else if (div.textContent && div.textContent.match(/.(mp4|webm)(\?.*)?$/) != null) {
        div.className = 'cards-card-media';
        const video = document.createElement('video');
        video.src = div.textContent;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        div.textContent = '';
        div.append(video);
      } else {
        div.className = 'cards-card-body';
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);

  // Start the automatic scrolling
  if (!intervalStarted) {
    window.requestAnimationFrame(smoothScroll);
    intervalStarted = true;
  }
}
