import React, { useContext, useState, useEffect } from 'react'
import { CardItems } from './lib/cardItems'
import { FaCoins } from 'react-icons/fa'
import Image from 'next/image'
import { XContext } from '../../context/XContext'
import { ethers } from 'ethers'
import axios from 'axios'
import { useRouter } from 'next/router'

const styles = {
  cardContainer: `grid gap-16 grid-cols-4`,
  card: `h-[250px] w-[190px] rounded-3xl flex cursor-pointer transition-all duration-300  hover:scale-110 hover:shadow-xl overflow-hidden border border-black shadow-xl border-4 border-[#fb9701]`,
  cardTitle: `text-xl font-bold cursor-pointer flex text-center text-white font-noto w-full flex-1 justify-center mt-[10px]`,
  price: `text-md font-bold cursor-pointer flex text-[#A77300] justify-center`,
  coins: `ml-[10px]`,
  container: `h-full w-full flex flex-col ml-[20px] -mt-[50px]`,
  title: `text-2xl font-bold text-white font-bungee mb-[20px] mt-[50px] ml-[30px]`,
  cards: `flex items-center flex-wrap gap-[80px]`,
}

const Card = () => {
  const router = useRouter()
  const type = router.query.type

  const { nftAbi, nftAddress, me } = useContext(XContext)
  const [ownedNFT, setOwnedNFT] = useState(null)

  const [loading, setLoading] = useState(false)

  const updateUIValues = async () => {

    if (!window.ethereum) {
      return alert('noMetaMask')
    }
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })

      if (addressArray.length > 0) {
        let arr = []
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const xtelptNFTContract = new ethers.Contract(nftAddress, nftAbi, provider)
        const myNFT = await xtelptNFTContract.getMyNFT(addressArray[0])

        for (let i = 0; i < myNFT.length; i++) {
          await axios.get(`https://gateway.pinata.cloud/ipfs/${myNFT[i]}`)
            .then(function (response) {
              console.log(response)
              if (response.data.name) {
                arr.push(response.data)
              }

            })
            .catch((err) => {
              console.log(err)
            })
        }

        setOwnedNFT(arr)
        console.log("owned", ownedNFT)

      } else {
        alert("No MetaMask")

      }

    } catch (err) {
      console.log(err)

    }

  }

  useEffect(() => {
    setTimeout(() => {
      updateUIValues()
    }, 1000);
  }, [me])

  useEffect(() => {
    console.log("Hello")
  }, [type])


  const handleMint = async (cid) => {
    setLoading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const xtelptNFTContract = new ethers.Contract(nftAddress, nftAbi, signer)

    try {
      const mint = await xtelptNFTContract.safeMint(me?.addr, cid, 1)
      alert("NFT Minted")
      setLoading(false)

    } catch (error) {
      setLoading(false)
      console.log(error)
      return
    }

  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>{!type ? "Owned Nfts" : "Market Nfts"}</div>
      {!type ? (

        <div className={styles.cards}>
          <div
            className={styles.cardContainer}
          >
            {ownedNFT?.map((item) => (
              <div className='mb-[40px]'>
                <div className={styles.card}>
                  <Image src={item?.image} className='object-cover object-center' width={190} height={250} />
                </div>
                <div>
                  <div className={styles.cardTitle}>{item?.name}</div>
                  <div className={styles.price}>{item?.attributes?.[1].value} {item?.attributes?.[0].value} Pass<FaCoins className={styles.coins} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (

        <div className={styles.cards}>
          <div
            className={styles.cardContainer}
          >
            {CardItems?.map((item) => (
              <div className='mb-[40px]'>
                <div className={styles.card}>
                  <Image src={item.image} className='object-cover object-center' width={190} height={250} />
                </div>
                <div>
                  <div className={styles.cardTitle}>{item.name}</div>
                  <div className={styles.price}>{item.price} <FaCoins className={styles.coins} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Card