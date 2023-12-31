/* 
##
## Copyright (c) Tomorrow Group.
## Licensed under the MIT License.
##
*/

/* icon imports */
import ArrowLeftIcon from 'remixicon-react/ArrowDropLeftLineIcon';
import ArrowRightIcon from 'remixicon-react/ArrowDropRightLineIcon';

/* API imports */
import API from '../../assistant/api';

/* react imports */
import { useEffect, useState } from 'react';

/* type imports */
import { AdsContainerProps } from '../../Types/AdsContainerTypes';
import { AdProps } from '../../Types/AdTypes';

/* style imports */
import './AdsContainer.css';
import { AdItem } from '../AdItem/AdItem';

export const AdsContainer = ( { id, label, category }: AdsContainerProps ) => {
    const [ ads, setAds ] = useState<AdProps[]>([]);

    const limit = 20;

    useEffect( () => {
        
    }, []);

    useEffect( () => {
        const getAds = async ( ) => {
            let data = await API.getAds(
                "asc",
                limit,
                0,
                category,
                "",
                ""
            );
            setAds( data?.ads );
            // console.log(data);
        }
        getAds();
    }, []);

    const handleScrollBack = ( ) => {
        const carousel = window.document.querySelector(`#carousel-${id}`) as HTMLDivElement;
        carousel!.scrollLeft -= 500;
    }

    const handleScrollNext = ( ) => {
        const carousel = window.document.querySelector(`#carousel-${id}`) as HTMLDivElement;
        carousel!.scrollLeft += 500;
    }

    return (
        <div className='AdsContainer' id={`ads--container-${id}`}>
            <div className='scroll-back--button scroll-button' onClick={ handleScrollBack }>
                <ArrowLeftIcon className='scroll-icon' />
            </div>
            <div className='ads--header--container'>
                <p>{ label }</p>
            </div>
            <div className='scroll-next--button scroll-button' onClick={ handleScrollNext }>
                <ArrowRightIcon className='scroll-icon' />
            </div>
            <div className='ads-carousel--container' id={`carousel-${id}`}>
                { ads &&
                    ads.map((item, key) => (
                        <AdItem key={key} data={item} />
                    ))
                }
            </div>
        </div>
    )
}
