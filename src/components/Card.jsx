import { useEffect, useState } from "react"
import CardDetail from "./CardDetail"


export default function Card() {
    const [cardItems, setCardItems] = useState([])
    const [selectedCard, setSelectedCard] = useState({})
    const [isClicked, setIsClicked] = useState(false)

    /*
    deviceName
    imageUrl
    desc
    */

    useEffect(() => {
        fetch('https://landingpage.sercair.com/api/V1/device/all')
            .then(res => res.json())
            .then(res => setCardItems(res.data))
    }, [])

    const cardDetail = async (card) => {
        await setSelectedCard(card)
        setIsClicked(true)
        //console.log(selectedCard)
    }

    const closeCardDetail = () => {
        setIsClicked(false)
    }

    return <div className="container container-margin">
        <div className="row justify-content-center">
            {cardItems.map(cardItem => {
                return <div className="col-4 card-bg m-4"  >
                    <div className="image-div" key={cardItem.imageUrl}>
                        <img className="card-image" src={cardItem.imageUrl} alt="display image" />
                    </div>
                    <div className="text-left">
                        <div >
                            <h5 className="font-weight-bold">Sercair</h5>
                        </div>
                        <div key={cardItem.deviceName}>
                            <p >{cardItem.deviceName}</p>
                        </div>
                    </div>
                    {/* <p key={cardItem.desc}>{cardItem.desc}</p> */}
                    <button type="button" className="btn" onClick={() => cardDetail(cardItem)}><span className="font-weight-bold">DETAY</span></button>
                </div>
            })}

        </div>
        {isClicked === true ? <CardDetail card={selectedCard} isClicked={isClicked} closeCardDetail={closeCardDetail} /> : ""}

    </div>
}