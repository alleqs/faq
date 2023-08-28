import { type FC, useState } from 'react'

export const FeedBack: FC = () => {

   const [like, setLike] = useState(false);
   const [dislike, setDislike] = useState(false);

   function handleLiked() {
      setLike(l => !l);
      if (dislike)
         setDislike(l => !l);
   }

   function handleDisliked() {
      setDislike(l => !l);
      if (like)
         setLike(l => !l);
   }


   return (
      <div className='text-right pr-10'>
         <span className='align-super mr-2 text-gray-500'>Conteúdo útil?</span>
         <button className='mr-2' onClick={handleLiked}>
            <svg width={24} height={24} >
               <use href={`icons.svg#thumbup${like ? '-filled' : ''}`} />
            </svg>
         </button>
         <button onClick={handleDisliked}>
            <svg width={24} height={24}>
               <use href={`icons.svg#thumbdown${dislike ? '-filled' : ''}`} />
            </svg>
         </button>
      </div>
   );
};
