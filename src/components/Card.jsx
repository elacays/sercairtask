import { useEffect, useState, componentDidMount } from "react"
import CardDetail from "./CardDetail"


export default function Card() {
    const [cardItems, setCardItems] = useState([])
    const [selectedCard, setSelectedCard] = useState(() => {
        const stickyValue = localStorage.getItem("items");
        return stickyValue !== null
            ? JSON.parse(stickyValue)
            : {};
    })
    const [isClicked, setIsClicked] = useState(false)
    let count = 0

    /*
    deviceName
    imageUrl
    desc
    */

    useEffect(() => {
        fetch('https://landingpage.sercair.com/api/V1/device/all')
            .then(res => res.json())
            .then(res => setCardItems(res.data))
        //eğer sekme kapatıldıysa card detayları güncellenip popup açılıyor
        if (localStorage.getItem("tab") === "isClosed") {
            cardDetail(JSON.parse(localStorage.getItem('items')))
        }
    }, [])

    const cardDetail = (card) => {
        setSelectedCard(card)
        setIsClicked(true)
    }

    const closeCardDetail = () => {
        setIsClicked(false)
    }
    //Tab kapanma veya reload işlemi
    window.onbeforeunload = (event) => {
        const e = event || window.event;
        // Cancel the event
        e.preventDefault();
        if (e) {
            localStorage.setItem("tab", "isClosed")
        }
    };
    return <div className="container container-margin">
        <div className="row justify-content-center">
            {cardItems.map(cardItem => {
                count++

                return <div className="col-4 card-bg m-4" key={count} >
                    <div className="image-div" >
                        <img className="card-image" key={cardItem.imageUrl} src={cardItem.imageUrl} alt="display image" />
                    </div>
                    <div className="text-left">
                        <div >
                            <h5 className="font-weight-bold" key={cardItem.desc}>Sercair</h5>
                        </div>
                        <div>
                            <p key={cardItem.deviceName}>{cardItem.deviceName}</p>
                        </div>
                    </div>
                    <button type="button" className="btn" onClick={() => cardDetail(cardItem)}><span className="font-weight-bold">DETAY</span></button>
                </div>
            })}
        </div>
        {isClicked === true && selectedCard !== null ? <CardDetail card={selectedCard} isClicked={isClicked} closeCardDetail={closeCardDetail} /> : ""}

    </div>
}