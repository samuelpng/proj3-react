import { Fragment } from "react"


export default function CardPlaceholder() {

    const myArray = [1, 2, 3, 4, 5, 6, 7, 8]

    return (

        <Fragment>
            <div className="row">
                {myArray.map(m => {
                    return (
                        <div className="col-12 col-md-6 col-lg-3 mb-5" key={m}>
                            <div className="cardLoad">
                                <div className="card__image"></div>
                                <div className="card__content">
                                    <h2 className=".loadTitle"></h2>
                                    <p className="loadText"></p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>

    )
}