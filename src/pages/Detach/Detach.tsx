/* 
##
## Copyright (c) Tomorrow Group.
## Licensed under the MIT License.
##
*/

/* react imports */
import { useEffect, useRef, useState } from 'react';

/* style imports */
import './Detach.css';

/* API imports */
import API from '../../assistant/api';

/* layout imports */
import { CategorieProps } from '../../Types/CategorieTypes';

/* type imports */
import { StateProps } from '../../Types/StateTypes';

/* icon imports */
import ArrowIcon from 'remixicon-react/ArrowLeftLineIcon';

/* icon imports */
import HelpIcon from 'remixicon-react/QuestionLineIcon';

/* routes imports */
import { Link, useNavigate } from 'react-router-dom';
// import { ErrorLayout } from '../../layouts/ErrorLayout/ErrorLayout';

export const Detach = ( ) => {
    const files = useRef() as React.LegacyRef<HTMLInputElement>;
    const navigate = useNavigate();
    // const [ errors, setErrors ] = useState<string[]>([]);
    const [ detachErrors, setDetachErrors ] = useState<string []>([]);

    const [ stateList, setStateList ] = useState<StateProps []>([]);
    const [ categories, setCategories ] = useState<CategorieProps[]>([]);

    const [ categoryId, setCategoryId ] = useState<string>("");
    const [ categoryName, setCategoryName ] = useState<string>("");
    const [ categorySlug, setCategorySlug ] = useState<string>("");
    const [ categoryActive, setCategoryActive ] = useState<boolean>(false);

    const [ title, setTitle ] = useState<string>("");
    const [ description, setDescription ] = useState<string>("");
    const [ price, setPrice ] = useState<string>("");
    const [ priceNegotiable, setPriceNegotiable ] = useState<boolean>(false);
    const [ state, setState ] = useState<string>("");
    // const [ images, setImages ] = useState<string[]>([]);

    useEffect( () => {
        const getCategories = async ( ) => {
            let data = await API.getCategories();
            setCategories(data);
        }
        getCategories();
    }, []);

    useEffect( ( ) => {
        const getStates = async ( ) => {
            let states = await API.getStates();
            setStateList( states );
        }
        getStates();
    }, []);

    const handleGoBackClick = ( ) => {
        setCategoryId("");
        setCategoryName("");
        setCategorySlug("");
        setCategoryActive(false);
    }

    const handleDetachClick = async ( e: React.FormEvent<HTMLFormElement>) => {  
        e.preventDefault();
        alert("Nd");
        if (title.trim() === "") {
            setDetachErrors(prev => [...prev, "A valid title must be providaded."]);
        }
        if (price === "") {
            setDetachErrors(prev => [...prev, "A valid price must be provided!"]);
        }
        if (state === "") {
            setDetachErrors(prev => [...prev, "A valid state must be provided!"]);
        }

        if (detachErrors.length === 0) {
            const formData = new FormData();
            formData.append("name", title);
            formData.append("category", categoryName.toLowerCase());
            formData.append("state", state);
            formData.append("price", price);
            formData.append("price_negotiable", priceNegotiable ? "true" : "false");
            formData.append("description", description);

            if (files) {
                if (files.current.files) {
                    for (let i in files.current.files) {
                        formData.append("images", files.current.files[i]);
                    }
                }
            }
            let result = await API.postAd(formData);
            console.log(result);
            alert(result);
            if (result.err) {
                console.log("Something was wrong!");
            } else {
                window.location.href = `/Ad/${result.ad._id}`;
                return;
            }
        }
    }

    const handleCategoryClick = ( name: string, id: string, slug: string ) => {
        setCategorySlug(slug);
        setCategoryId(id);
        setCategoryName(name);
    }

    return (
        <div className='Detach page'>
            <div className='detach--container'>
                <div className='detach-header--container'>
                    <div className='detach-top-header--container'>
                        <div className='go-home-icon--container' onClick={ () => {} }>
                            <Link to={"/"}>
                                <ArrowIcon className='go-back-icon' />
                            </Link>
                        </div>
                        <h2>What are you detaching?</h2>
                        <div className='help-icon--container'>
                            <Link to={"/Help"}>
                                <HelpIcon className='go-back-icon' />
                            </Link>
                        </div>
                    </div>

                    <div className='detach-categories--container'>
                    { categories &&
                        categories.map((item, index) => (
                            <div className={`CategoryLayout ${categorySlug === item.slug ? "category-layout--active" : ""}`}
                                id={ item._id } 
                                key={index}
                                onClick={ ( ) => handleCategoryClick(item.name, item._id, item.slug) }>
                                <img src={`../../../public/media/images/icons2/${item.slug}.png`} 
                                    className='category-icon' />
                                <p className='category-name'>{ item.name }</p>
                            </div>
                        ))
                    }
                    </div>
                </div>
                { categorySlug &&
                    <form className='detach-form--container' onSubmit={ handleDetachClick }>
                        <div className='detach-form-header--container'>
                            <div className='go-back-icon--container' onClick={ handleGoBackClick}>
                                <ArrowIcon className='go-back-icon' />
                            </div>
                            <p className='detach-form-header-title'>{ categoryName }</p>
                        </div>
                        <div className='detach-form-body--container'>
                            <label className='form-label'>
                                <div className='form-input--container'>
                                    <input className='form-input' 
                                        type='text' 
                                        name='title' 
                                        required 
                                        placeholder='Title'
                                        autoFocus
                                        onChange={ (e) => setTitle(e.target.value) } />
                                    <div className='input-border-bottom'></div>
                                </div>
                            </label>
                            <label className='form-label'>
                                <div className='form-textarea--container'>
                                    <textarea className='form-textarea' 
                                        wrap='hard'
                                        name='description' 
                                        required 
                                        placeholder='Description'
                                        onChange={ (e) => setDescription(e.target.value) } ></textarea>
                                    <div className='input-border-bottom'></div>
                                </div>
                            </label>
                            <label className='form-label'>
                                <div className='form-input--container'>
                                    <input className='form-input' 
                                        type='text' 
                                        name='price' 
                                        required 
                                        placeholder='Price'
                                        prefix='$'
                                        onChange={ (e) => setPrice( e.target.value )} />
                                    <div className='input-border-bottom'></div>
                                </div>
                            </label>
                            <label className='form-label'>
                                <div className='form-input--container input-checkbox--container'>
                                    <span>Price negotiable?</span>
                                    <input className='form-input checkbox' 
                                        type='checkbox' 
                                        name='price_negotiable'
                                        onClick={ () => setPriceNegotiable(!priceNegotiable) } />
                                </div>
                            </label>
                            <label className='form-label'>
                                <select placeholder='State' className='select-form--container'>
                                    <option>{ state ? state : "Select state"}</option>
                                    {
                                        stateList.map((i, index:number) => 
                                        <option 
                                            key={index} 
                                            id={`${i.name}-state`} 
                                            onClick={ () => setState(i.name) }>{i?.name}
                                        </option>)
                                    }
                                </select>
                            </label>
                            <label className='form-label'>
                                <div className='form-input--container input-image--container'>
                                    <input className='form-input input-image' 
                                        type='file' 
                                        name='files'
                                        ref={ files }
                                        accept='image/png, image/jpg, image/jpeg, image/webp'
                                        multiple />
                                </div>
                            </label>
                        </div>
                        {/* <div className='form-footer-info'>  </div> */}
                        <div className='submit-form-button--container'>
                            <button type='submit' className='submit-form-button'>
                                Detach
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>
    )
}
