import React from 'react'
import { jewelryItems } from "../../data/data"
import './style.scss'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import useItemClick from '../../hooks/useItemClick';
import { useState, useEffect, useRef } from 'react';
import ItemList from '../../components/ItemList/ItemList';



export default function Shop() {
    //открыто ли меню фильтов
    const [menuOpen, setMenuOpen] = useState(false);
    //клик вне области фильтров
    const filtersRef = useRef(null);

    //фокус и значение инпутов
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [inputValue, setInputValue] = useState("");

    //фильтры по цене
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    //выбрать значения
    const [selectedAlloy, setSelectedAlloy] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [onSaleOnly, setOnSaleOnly] = useState(false);

    //сортировка по цене
    const [sortOrder, setSortOrder] = useState("");

    //пагинация (страница и кол-во элементов на ней)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);

    //клик по элементу через хук (переход на продукт)
    const handleItemClick = useItemClick();

    //переключение меню
    const toggleMenu = () => setMenuOpen(prev => !prev);

    //закрытие меню кликов вне области 
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filtersRef.current && !filtersRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);


    // Сбрасываем текущую страницу на 1 при изменении фильтров или сортировки
    useEffect(() => {
        setCurrentPage(1);
    }, [inputValue, minPrice, maxPrice, selectedAlloy, selectedCategory, onSaleOnly, sortOrder]);

    //уникальные варианты (аллоу и категории)
    const uniqueAlloys = [...new Set(jewelryItems.map(item => item.alloy))];
    const uniqueCategory = [...new Set(jewelryItems.map(item => item.category))];

    //цена со скидкой 
    const discountedPrice = (item) => {
        return (typeof item.discount === 'number' && item.discount > 0)
            ? Math.round(item.price - (item.price * item.discount / 100))
            : item.price;
    };

    // Фильтрация с учётом всех параметров
    const filteredItems = jewelryItems.filter(item => {
        const price = discountedPrice(item);
        const from = minPrice === '' ? 0 : parseFloat(minPrice);
        const to = maxPrice === '' ? Infinity : parseFloat(maxPrice);

        const matchesPrice = price >= from && price <= to;
        const matchesSearch = item.name.toLowerCase().includes(inputValue.toLowerCase());
        const matchesAlloy = selectedAlloy === "" || item.alloy === selectedAlloy;
        const matchesCategory = selectedCategory === "" || item.category === selectedCategory;

        const isOnSale = item.discount === true || (typeof item.discount === "number" && item.discount > 0);
        const matchesSale = !onSaleOnly || isOnSale;

        return matchesPrice && matchesSearch && matchesCategory && matchesAlloy && matchesSale;
    });

    // Сортировка с учетом скидки
    const sortedItems = [...filteredItems].sort((a, b) => {
        if (sortOrder === "asc") return a.price - b.price;
        if (sortOrder === "desc") return b.price - a.price;
        return 0;
    });
    console.log(sortedItems);


    //очистка фильтров 
    const handleClearFilters = () => {
        setInputValue('');
        setMinPrice('');
        setMaxPrice('');
        setSelectedAlloy('');
        setSelectedCategory('');
        setOnSaleOnly(false);
        setSortOrder('');
        setCurrentPage(1);
    };


    //кол-во элементов на странице в зависимости от ширины экрана
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 1020) {
                setItemsPerPage(6); // мобилка планшет 
            } else {
                setItemsPerPage(9); //  десктоп
            }
        }
        handleResize(); // вызов при первом рендере
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

    // Вычисляем элементы для текущей страницы
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = sortedItems.slice(indexOfFirst, indexOfLast);

    // Обработчик переключения страницы
    function goToPage(page) {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    }

    return (
        <>
            <Header />

            <div className='shop'>
                <div className="wrapper shop__wrapper">
                    <section className='filters shop__filters'>
                        <aside className={`aside filters__aside ${menuOpen ? 'filters__aside--open' : ''}`}
                            ref={filtersRef}>
                            <button className={`btn filters__btn ${menuOpen ? 'btn--open' : ''}`}
                                onClick={toggleMenu}>
                                <svg className='svg_filter' width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>

                            </button>

                            <div className={`container_asides filters__container_asides ${menuOpen ? 'filters__container_asides--open' : ''}`}>

                                <div className="name filters__name">
                                    <h2 className='title filters__title'>Filters</h2>
                                    <button className="btn filters__clean_btn" onClick={handleClearFilters}>
                                        Clean
                                    </button>
                                    <svg onClick={toggleMenu} className='svg_close' width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729" />
                                    </svg>
                                </div>
                                <div className="settings filters__setting">
                                    {/* search */}

                                    <div className={`search filters__search`}>
                                        <label
                                            htmlFor="filter_search"
                                            style={{ display: inputValue || isInputFocused ? 'none' : 'block' }}
                                        >
                                            Search...
                                        </label>
                                        <input
                                            className="input_search filters__input_search"
                                            type="text"
                                            id="filter_search"
                                            value={inputValue}
                                            onFocus={() => setIsInputFocused(true)}
                                            onBlur={() => setIsInputFocused(false)}
                                            onChange={(e) => setInputValue(e.target.value)}
                                        />
                                    </div>

                                    {/* surowce */}
                                    <div className="select_div filters__select_div">
                                        <select
                                            className='select filters__select'
                                            name="sel"
                                            id="sel"
                                            value={selectedAlloy}
                                            onChange={(e) => setSelectedAlloy(e.target.value)}
                                        >
                                            <option value="">All alloys</option>
                                            {uniqueAlloys.map(alloy => (
                                                <option key={alloy} value={alloy}>{alloy}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* categoty */}
                                    <div className="category_div filters__category_div">
                                        <select
                                            className='category filters__category'
                                            name="sel_category"
                                            id="sel_category"
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                        >
                                            <option value="">All categories</option>
                                            {uniqueCategory.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* cena */}
                                    {/* сортироыать по цене??? */}
                                    <div className="price_div filters__price_div">
                                        <div className="min filters__min">

                                            <label htmlFor="min">Price from</label>
                                            <input
                                                type="number"
                                                id="min"
                                                value={minPrice}
                                                onChange={(e) => setMinPrice(e.target.value)}
                                                placeholder="0"
                                                min="0"
                                            />
                                        </div>

                                        <div className="max filters__max">
                                            <label htmlFor="max">Price to</label>
                                            <input
                                                type="number"
                                                id="max"
                                                value={maxPrice}
                                                onChange={(e) => setMaxPrice(e.target.value)}
                                                placeholder="9999"
                                                min="0"
                                            />
                                        </div>


                                    </div>

                                    {/* сортировка по цене */}
                                    <div className="bottom filters__bottom">

                                        <div className="div_sort filters__div_sort">
                                            <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                                                <option value="">No sorting</option>
                                                <option value="asc">Price: low to high</option>
                                                <option value="desc">Price: high to low</option>
                                            </select>
                                        </div>
                                        {/* on sele */}
                                        <div className="sale_div filters__sale_div checkbox-wrapper-9">
                                            <h3 className='sale_title filters__sale_title'>On sale</h3>
                                            <input className="tgl tgl-flat"
                                                type="checkbox"
                                                id="sale"
                                                checked={onSaleOnly}
                                                onChange={() => setOnSaleOnly(prev => !prev)}
                                            />
                                            <label className="tgl-btn" htmlFor="sale"></label>


                                        </div>
                                    </div>




                                </div>
                            </div>
                        </aside>
                    </section>

                    <section className={`catalog shop__catalog ${menuOpen ? 'catalog--open' : ''}`}>
                        <div className="container catalog__container">
                            {/* <Item items={sortedItems} /> */}
                            {/* <ItemList items={currentItems} /> */}
                            <ItemList items={currentItems} onItemClick={handleItemClick} />
                            {/* Навигация по страницам */}
                            <div className="pagination">
                                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                                    Prev
                                </button>

                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => goToPage(i + 1)}
                                        className={currentPage === i + 1 ? 'active' : ''}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                                    Next
                                </button>
                            </div>
                        </div>

                    </section>
                </div>
            </div>

            <Footer />
        </>


    )
}
