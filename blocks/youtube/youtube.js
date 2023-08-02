import { readBlockConfig } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  const config = readBlockConfig(block);
  console.log(config);
  const iframe = document.createElement('iframe');
  iframe.src = block.textContent;
  iframe.width = '100%';
  iframe.height = '600';
  iframe.setAttribute('frameborder', 0);
  block.textContent = '';
  block.append(iframe);
}


/*

<iframe width="560" height="315" src="https://www.youtube.com/embed/Th9_njjcAeA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

*/
