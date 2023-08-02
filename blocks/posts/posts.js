import { createOptimizedPicture } from '../../scripts/lib-franklin.js';
import { getIndex } from '../../scripts/scripts.js';

export default async function decorate(block) {
  // TODO: get index URL from configuration
  const index = await getIndex('query-index.json');

  // Sort the index array by index.date
  index.sort((a, b) => b.date - a.date);

  /* change to ul, li */
  const ul = document.createElement('ul');
  index.forEach((item) => {
    if (!item.date) return;
    const li = document.createElement('li');

    const mediaWrapper = document.createElement('div');
    mediaWrapper.className = 'posts-post-media';
    if (item.image && item.image.match(/.(mp4|webm)(\?.*)?$/) != null) {
      const video = document.createElement('video');
      video.src = item.image;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      mediaWrapper.append(video);
    } else {
      mediaWrapper.append(createOptimizedPicture(item.image, item.title, false, [{ width: '750' }]));
    }
    li.append(mediaWrapper);

    const bodyWrapper = document.createElement('div');
    bodyWrapper.className = 'posts-post-body';
    const title = document.createElement('h3');
    title.innerHTML = item.title;
    bodyWrapper.append(title);
    const date = document.createElement('p');
    date.innerHTML = `${new Date(item.date * 1000).toLocaleDateString()} – ${item.author}`;
    bodyWrapper.append(date);
    const description = document.createElement('p');
    description.innerHTML = item.description;
    bodyWrapper.append(description);
    const linkWrapper = document.createElement('div');
    linkWrapper.className = 'button-container';
    const link = document.createElement('a');
    link.href = item.path;
    link.innerHTML = 'Read more ...';
    link.className = 'button primary';
    linkWrapper.append(link);
    bodyWrapper.append(linkWrapper);
    li.append(bodyWrapper);

    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
