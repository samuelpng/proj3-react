import { Fragment } from "react"


export default function CardPlaceholder() {

    const myArray = [1, 2, 3, 4, 5, 6, 7, 8]

    return (

        <Fragment>
            <div className="row">
                {myArray.map(m => {
                    return (
                        <div className="col-12 col-md-6 col-lg-3 mb-5" key="1">
                            <div class="cardLoad">
                                <div class="card__image"></div>
                                <div class="card__content">
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