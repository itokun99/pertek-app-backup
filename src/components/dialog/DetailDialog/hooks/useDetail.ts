import { useState } from 'react';

export interface IDetailState {
  title: string;
  thumbnail: string;
  datas: {
    label: string;
    value: string;
  }[];
}

const initialDetailState: IDetailState = {
  title: '',
  thumbnail: '',
  datas: []
}

const useDetail = () => {
  const [detail, setDetail] = useState<IDetailState>(initialDetailState);
  

  const removeDetail = () => {
    setDetail(initialDetailState);
  }
  
  return {
    detail,
    setDetail,
    removeDetail
  }
}


export default useDetail;