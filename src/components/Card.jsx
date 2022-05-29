import { useEffect, useState } from "react"


export default function Word(props) {
    const [cardItems, setCardItems] = useState([])

    /*
    deviName
    imageUrl
    desc
    */
    useEffect(() => {
        fetch('https://landingpage.sercair.com/api/V1/device/all')
            .then(res => res.json())
            .then(res => setCardItems(res.data)).then(console.log(cardItems))
    }, [])

    return <div className="container">
        <div className="row">
            {cardItems.map(cardItem => {
                return <div className="col-3 card-bg m-4"  >
                    <div className="image-div">
                        <img className="card-image" src={cardItem.imageUrl} alt="display image" style={{
                        }} />
                    </div>
                    <h4>Sercair</h4>
                    <p key={cardItem.deviceName}>{cardItem.deviceName}</p>

                    {/* <p key={cardItem.desc}>{cardItem.desc}</p> */}
                    <button>DETAY</button>
                </div>
            })}
        </div>
    </div>
}