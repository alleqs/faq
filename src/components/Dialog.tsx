import { useEffect, type FC, useRef, MouseEvent } from 'react';

type Props = {
   open: boolean
   onClose: () => void
}

const assuntos = ['Documentos Fiscais', 'IPVA e ITCMD', 'Incentivos Fiscais', 'Desembaraço', 'Tributação ICMS / Outros'];

export const Dialog: FC<Props> = ({ open, onClose }) => {

   const dialog = useRef<HTMLDialogElement>(null);

   useEffect(() => {
      if (open) {
         dialog.current?.showModal();
      }
      return () => { dialog.current?.close() };
   }, [open]);

   function handleBtnClick() {
      onClose();
   }

   function handleOutsideClick(e: MouseEvent<HTMLDialogElement, globalThis.MouseEvent>) {
      const modal = dialog.current;
      if (!modal) return;
      const { top, left, height, width } = modal.getBoundingClientRect();
      const isInDialog = (top <= e.clientY && e.clientY <= top + height
         && left <= e.clientX && e.clientX <= left + width);
      if (!isInDialog) {
         onClose();
      }
   }


   return (
      <dialog onClick={handleOutsideClick} ref={dialog} className='w-[500px] pt-6 pb-4 px-4 rounded-md bg-gray-100 ' >
         <div className='pt-2 px-2 flex flex-col justify-between '>
            <h3 className='text-center text-md font-medium text-gray-900 uppercase'>Tire sua dúvida</h3>
            <label htmlFor="countries" className="mt-4 block mb-2 text-sm font-medium text-gray-900">Assunto</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
               {assuntos.map((assunto, i) => <option key={i}>{assunto}</option>)}
            </select>
            <label htmlFor="message" className="mt-4 block mb-2 text-sm font-medium text-gray-900 ">Sua mensagem</label>
            <textarea id="message" placeholder="Escreva sua pergunta..." rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
            <div className='mt-2 flex justify-between'>
               <button onClick={handleBtnClick} className='text-gray-600 hover:text-gray-800 font-bold py-2 px-4'>
                  Cancelar
               </button>
               <button onClick={handleBtnClick} className='text-gray-600 hover:text-gray-800 font-bold py-2 px-4'>
                  Enviar
               </button>
            </div>
         </div>
      </dialog>
   );
};