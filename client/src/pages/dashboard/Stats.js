import React, { useEffect } from 'react'
import { Loading } from '../../components';
import ChartsContainer from '../../components/ChartsContainer';
import StatsContainer from '../../components/StatsContainer';
import { useAppContext } from '../../context/appContext';

function Stats() {
  const {showStats,isLoading,monthlyApplications} = useAppContext();
  useEffect(()=>{
    showStats()
  },[])
  if(isLoading){
    return <Loading center/>
  }
  return (
    <>
      <StatsContainer/>
      {monthlyApplications.length>0&&<ChartsContainer/>}
    </>
  )
}

export default Stats