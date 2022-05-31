import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap";
import CardDetail from "./CardDetail"



export default function Card() {
    const [cardItems, setCardItems] = useState([])
    const [isClicked, setIsClicked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedCard, setSelectedCard] = useState(() => {
        const stickyValue = localStorage.getItem("items");
        return stickyValue !== null
            ? JSON.parse(stickyValue)
            : {};
    })
    const apiUrl = 'https://landingpage.sercair.com/api/V1/device/all'

    /*
    deviceName
    imageUrl
    desc
    */

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(res => setCardItems(res.data))

        // loading ekranını daha uzun görebilmek için gecikme eklendi command satırı kaldırılıp kontrol edilebilir
        // setTimeout(() => {
        //     setLoading(true)
        // }, 2000)
        setLoading(true)


        //eğer sekme kapatıldıysa card detayları güncellenip popup açılıyor
        if (localStorage.getItem("tab") === "isClosed") {
            cardDetail(JSON.parse(localStorage.getItem('items')))
        }
        //setLoading(true)
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
            {loading === true ? cardItems.map(cardItem => {
                return <div className="col-4 card-bg m-4" key={cardItem.deviceName} >
                    <div className="image-div" >
                        <img className="card-image" key={cardItem.imageUrl} src={cardItem.imageUrl} alt="display image" />
                    </div>
                    <div className="text-left">
                        <div>
                            <h5 className="font-weight-bold">Sercair</h5>
                        </div>
                        <div>
                            <p key={cardItem.deviceName}>{cardItem.deviceName}</p>
                        </div>
                    </div>
                    <button type="button" className="btn" onClick={() => cardDetail(cardItem)}><span className="font-weight-bold">DETAY</span></button>
                </div>
            }) : <Spinner animation="border" />}
        </div>


        {isClicked === true && selectedCard !== null ? <CardDetail card={selectedCard} isClicked={isClicked} closeCardDetail={closeCardDetail} /> : ""}
    </div>
}