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

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'posts-post-image';
    imageWrapper.append(createOptimizedPicture(item.image, item.title, false, [{ width: '750' }]));
    li.append(imageWrapper);

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
    const link = document.createElement('a');
    link.href = item.path;
    link.innerHTML = 'Read more ...';
    link.className = 'button primary';
    bodyWrapper.append(link);
    li.append(bodyWrapper);

    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
