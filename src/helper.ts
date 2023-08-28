import type { FaqMap } from "./types";
import { marked } from 'marked';

marked.use({ breaks: true });

export function getFaqMap(topicos: string[]): FaqMap {
   const faqMap: FaqMap = {};
   let topico = '';
   for (const block of topicos) {
      const fstChar = block.charAt(0);;
      //É tópico 
      if (fstChar === " ") {
         topico = block.trim();
         faqMap[topico] = []
      } else if (fstChar === "#") { //É pergunta
         const [pergunta, ...rest] = block.split('\n');
         faqMap[topico].push({
            P: pergunta.substring(1).trim(),
            R: marked.parse(rest.join('\n'))
         });
      }
   }
   return faqMap;
}
