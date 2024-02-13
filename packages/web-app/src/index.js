import { createApp } from '../../my-library/index.js';

const appContainer = document.getElementById('app');
const app = createApp(appContainer);

app.mount(() => {
  console.log('Component mounted');
});

app.update((state) => {
  console.log('State changed', state);
});