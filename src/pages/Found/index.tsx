import './index.less'
import { FC, useEffect, useState } from 'react';

import useUrlLoader from '../../hooks/useURLLoader';

import Loading from '../../components/Loading'
import Banner from './Banner'

const Found: FC = () => {
  const {
    ajax,
    loading,
    setLoading
  } = useUrlLoader();

  useEffect(() => {
    setLoading(true);
    ajax('/homepage/block/page', "GET", {})
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(loading);

  if (loading) {
    return <Loading/>
  }
  
  return (
    <div className="app-found">
      <Banner/>
    </div>
  )
}

export default Found