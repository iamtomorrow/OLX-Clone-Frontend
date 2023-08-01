
import { AdProps } from "../../Types/AdTypes";
import "./AdItem.css";

interface AdItemProps {
    key: number;
    data: AdProps
}


export const AdItem = ( { key, data  }: AdItemProps ) => {

    return (
        <div className="AdItem" id={ `${key}` }>
            <div className="ad-item-body">
                <img src={ data.images[0].url } className="ad-item-image" />
            </div>
            <div className="ad-item-info">
                <div className="ad-item-name">
                    <p>{ data.name.substring(0, 40) }</p>
                </div>
                <div className="ad-item-price">
                    <p>$ { data.price }</p>
                </div>
            </div>
        </div>
    )
}
