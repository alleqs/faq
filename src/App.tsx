import { type FC, useState } from 'react';
import type { FAQ, FaqMap } from './types';
import { FeedBack } from './components/FeedBack';
import { NavBar } from './components/Navbar';
import { Dialog } from './components/Dialog';

type Props = { faqMap: FaqMap, pdf: Blob }

export const App: FC<Props> = ({ faqMap, pdf }) => {

  const [openModal, setOpenModal] = useState(false);

  return (
    <main className='w-[720px] mx-auto bg-white min-h-screen'>
      <NavBar pdf={pdf} />
      <section className="flex flex-col items-center">
        <p className="text-neutral-700 font-bold text-3xl mt-14 tracking-tight select-none">
          Perguntas Frequentes
        </p>
        <div className='w-[576px] divide-y divide-neutral-200 mt-14'>
          {Object.entries(faqMap).map(([topico, faqs], i) =>
            <OuterFAQ key={i} topico={topico} faqs={faqs} />
          )}
          <div className='flex justify-end pt-6 '>
            <button onClick={() => setOpenModal(true)} className='text-gray-600 hover:text-gray-900 '>Não encontrou o que procurava?</button>
          </div>
        </div>
      </section>
      <Dialog open={openModal} onClose={() => setOpenModal(false)} />
    </main>
  );
};


const InnerFAQ: FC<FAQ> = ({ P, R }) => {

  return (
    <div className="py-5">
      <details className="group">
        <summary className="flex justify-between items-center font-medium cursor-pointer">
          <span className='select-none text-neutral-800 group-open:text-green-600'>{P}</span>
          <span className="transition group-open:rotate-180">
            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
            </svg>
          </span>
        </summary>

        <div className="mt-3 group-open/topic:animate-fadeIn" dangerouslySetInnerHTML={{ __html: R }} />
        <FeedBack />
      </details >
    </div >
  );
};

const OuterFAQ: FC<{ topico: string, faqs: FAQ[] }> = ({ topico, faqs }) => {

  return (
    <div className="py-5">
      <details className="group/topic">
        <summary className=" flex justify-between items-center font-semibold cursor-pointer ">
          <span className='text-neutral-800 select-none uppercase text-2xl group-open/topic:text-green-900'>{topico}</span>
          <span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path className='group-open/topic:opacity-100' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
              <path className='group-open/topic:opacity-0 ' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </span>
        </summary>
        <div className=" mt-3 group-open/topic:animate-fadeIn ">
          {faqs.map((faq, i) =>
            <InnerFAQ key={i} {...faq} />
          )}
        </div>
      </details>
    </div>
  );
};

