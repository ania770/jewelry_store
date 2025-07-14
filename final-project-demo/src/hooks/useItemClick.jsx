import { useNavigate } from 'react-router-dom';

export default function useItemClick() {

    //ф-ция для навигации
    const navigate = useNavigate();

    return (id) => {
        navigate(`/product/${id}`);
    };
}
