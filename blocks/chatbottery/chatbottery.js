import { readBlockConfig } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  const config = readBlockConfig(block);
  const script = document.createElement('script');
  script.src = config['runtime-url'];
  script.setAttribute('data-object', config['story-url']);
  script.setAttribute('data-render-position', config['render-position']);
  script.setAttribute('data-open-on-load', config['open-on-load']);
  script.defer = true;
  block.textContent = '';
  block.append(script);

  // set focus on Chatbottery search input
  setTimeout(() => {
    const searchInput = block.querySelector('.chatbot-window .chatbot-user-input > input');
    if (searchInput) {
      searchInput.focus();
    }
  }, 1500);
}
