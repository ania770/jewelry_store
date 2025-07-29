// ItemsList.js — компонент списка
import ItemCard from '../ItemCard/ItemCard';
import './style.scss'
export default function ItemList({ items, onItemClick }) {
    return (
        //обертка списка
        <div className='out'>
            {items.map(item => (
                <ItemCard
                    key={item.id}
                    item={item}
                    onClick={onItemClick}
                    showAddToCartButton={true}
                />
            ))}
        </div>
    );
}
