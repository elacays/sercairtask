import { useEffect, useState } from "react"
import CardDetail from "./CardDetail"


export default function Card() {
    const [cardItems, setCardItems] = useState([])
    const [selectedCard, setSelectedCard] = useState([])

    /*
    deviName
    imageUrl
    desc
    */
    useEffect(() => {
        fetch('https://landingpage.sercair.com/api/V1/device/all')
            .then(res => res.json())
            .then(res => setCardItems(res.data))
    }, [])

    const cardDetail = (card) => {
        setSelectedCard(card)
    }
    return <div className="container">
        <div className="row justify-content-center">
            {cardItems.map(cardItem => {
                return <div className="col-4 card-bg m-4"  >
                    <div className="image-div">
                        <img className="card-image" src={cardItem.imageUrl} alt="display image" style={{
                        }} />
                    </div>
                    <div className="text-left">
                        <div >
                            <h5 className="font-weight-bold">Sercair</h5>
                        </div>
                        <div>
                            <p key={cardItem.deviceName}>{cardItem.deviceName}</p>
                        </div>
                    </div>
                    {/* <p key={cardItem.desc}>{cardItem.desc}</p> */}
                    <button type="button" className="btn" onClick={() => cardDetail(cardItem)}><span className="font-weight-bold">DETAY</span></button>
                </div>
            })}

        </div>
        {selectedCard !== null ? <CardDetail card={selectedCard} /> : ""}
    </div>
}