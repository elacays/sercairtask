import { useEffect, useState } from "react"


export default function CardDetail(props) {
    const [cardItem, setCardItem] = useState([])
    setCardItem(props.card)
    /*
    deviName
    imageUrl
    desc
    */
    return <div className="container invisible">
        <div className="row justify-content-center">
            <div className="col-4 card-bg m-4"  >
                <div className="image-div">
                    {/* <img className="card-image" src={cardItem.imageUrl} alt="display image" /> */}
                </div>
                <div className="text-left">
                    <div >
                        <h5 className="font-weight-bold">Sercair</h5>
                    </div>
                    <div>
                        <p >veri veri</p>
                    </div>
                </div>
                <p>veri veri veri veri veri veri veri veri</p>
                <button type="button" className="btn"><span className="font-weight-bold">DETAY</span></button>
            </div>
        </div>
    </div>
}