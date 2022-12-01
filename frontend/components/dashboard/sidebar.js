import React, { useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Profile from './assets/mutant.png'
import { XContext } from '../../context/XContext'

const styles = {
  container: `h-full w-[300px] border-r-4 border-[#A77300] flex flex-col bg-[#252525] static`,
  profile: ` w-full py-8 flex flex-col justify-center items-center rounded-r-3xl bg-gradient-to-b from-[#252525] to-[#A77300] mt-[40px] mb-[50px] border-2 border-[#fb9701]`,
  profilePicContainer: `flex  rounded-xl items-center justify-center w-full h-full mb-5`,
  profilePic: `rounded-3xl object-cover`,
  welcome: ` text-md mb-2 font-bold font-bungee text-2xl text-white`,
  walletAddress: `text-xl flex w-full justify-center font-noto font-extrabold mb-2`,
  menu: `flex flex-col w-full h-full mb-[20px] px-10 gap-10`,
  menuItem: `flex items-center text-lg font-bold  text-white font-noto cursor-pointer gap-2`,
  amazonLogo: `mr-4 flex object-cover`,
  companyName: `text-lg font-bold flex flex-1 pl-10 items-center mt-[20px]`,
  usernameInput: `bg-transparent border-white border-2 rounded-lg w-[80%] py-2 px-4 text-lg mt-[20px] placeholder:text-white focus:outline-none flex justify-center items-center text-white`,
  username: `flex items-center w-full justify-center`,
  setNickname: `text-lg font-bold flex flex-1 items-center mt-[20px] mb-[20px] text-white`,
}


const Sidebar = () => {

  const { me } = useContext(XContext)

  const router = useRouter()
  return (
    <div className={styles.container}>
      <div className='mr-3 '>
        <div className={styles.profile}>
          <div className={styles.profilePicContainer}>
            <Image
              src={`https://gateway.pinata.cloud/ipfs/${me?.profilePic}`}
              alt='profile'
              className={styles.profilePic}
              height={100}
              width={100}
            />
          </div>
          <div>
            <div className={styles.welcome}> {me?.name}</div>
            <div className={styles.walletAddress}>{me?.addr.slice(0, 7)}...</div>
          </div>
        </div>
        <div className={styles.menu}>
          <div onClick={() => router.push({
            pathname: '/dashboard',
            query: { type: "market" },
          })} className={styles.menuItem}>Marketplace</div>
          <div onClick={() => router.push('/collections')} className={styles.menuItem}>My Nfts</div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar