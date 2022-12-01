import React from 'react'
import Nfts from './market'
import Sidebar from './sidebar'

const styles = {
  container: `h-full w-full flex bg-[#252525]`,
}

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Nfts />
    </div>
  )
}

export default Dashboard