import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './styles.css';
import { getFaqMap } from './helper.ts';

(async () => {
  const resp = await fetch('./FAQ.md');
  const md = await resp.text();
  const resp2 = await fetch('./FAQ.pdf');
  const pdf = await resp2.blob();

  const topicos = md.split(/##/)
  const faqMap = getFaqMap(topicos);

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <App faqMap={faqMap} pdf={pdf} />
  );

})();
