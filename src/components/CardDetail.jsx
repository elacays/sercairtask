import { useEffect, useState } from "react"


export default function CardDetail(props) {

    if (props.isClicked === true) {
        return <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 detail-card-bg m-4"  >
                    <div className="image-div">
                        {<img className="detail-card-image" src={props.card.imageUrl} alt="display image" />}
                    </div>
                    <div className="text-left pl-5 pr-5">
                        <div >
                            <h5 className="font-weight-bold">Sercair</h5>
                        </div>
                        <div>
                            <p >{props.card.deviceName}</p>
                        </div>
                        <div className="detail-content">
                            <p>{props.card.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

}


