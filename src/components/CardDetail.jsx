import { useEffect, useRef, useState } from "react"


export default function CardDetail(props) {

    const [isClicked, setIsClicked] = useState(false)
    const box = useRef(null);



    useEffect(() => {

        setIsClicked(props.isClicked)
        if (!localStorage.getItem('items')) {
            localStorage.setItem('items', JSON.stringify(props.card))
        }

    }, [])

    //Divin Dışına tıklanma Kontrolü
    function useOutsideClicker(ref) {
        useEffect(() => {
            function handleOutsideClick(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    //console.log("Divin dışına tıklandı");
                    props.closeCardDetail()
                } else {
                    setIsClicked(props.isClicked)
                }
            }
            document.addEventListener("click", handleOutsideClick);
            return () => document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }

    useOutsideClicker(box)
    let discountDiv;
    if (localStorage.getItem('tab') === "isClosed") {
        discountDiv = <div className="discount"><a>%50 İNDİRİM</a></div>

    } else {
        discountDiv = ""
    }

    if (isClicked === true) {
        return <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 detail-card-bg m-4" ref={box}>
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
                    <div >
                        {discountDiv}
                    </div>
                </div>
            </div>
        </div>
    }

}


