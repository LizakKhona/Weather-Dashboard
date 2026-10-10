
import { useEffect, useState } from 'react';

// Імпорт функції для отримання фотографій з Pixabay
import { getNatureImages } from '../../apiServices/galleryService';

// Імпорт CSS Module
import styles from './Gallery.module.css';

const Gallery = () => {
    // Масив отриманих фотографій
    const [images, setImages] = useState([]);

    // Індекс фотографії, яка зараз знаходиться по центру
    const [currentIndex, setCurrentIndex] = useState(0);

    // Отримує фотографії після першого рендеру компонента
    useEffect(() => {
        const fetchImages = async () => {
            try {
                // запит до Pixabay
                const data = await getNatureImages(); // (З АПІ СЕРВІСЕС/ГАЛЕРІсЕРВІСЕС)

                // Зберігаємо отримані фотографії у state
                setImages(data.slice(0, 10));
            } catch (error) {
                console.error('Помилка завантаження галереї:', error);
            }
        };

        fetchImages();
    }, []);

    // перемикає на наступну фотографію
    const nextSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    };

    // Перемикає на попередню фотографію
    const previousSlide = () => {
        setCurrentIndex(
            prevIndex => (prevIndex - 1 + images.length) % images.length
        );
    };

    // ===== Керування слайдером за допомогою КОЛІЩАТКИ миші ===== \\


    const handleWheel = event => {
        // Забороняє прокручувати сторінку над слайдером
        event.preventDefault();

        // Коліщатко вгору --> рух ліворуч
        if (event.deltaY < 0) {
            previousSlide();
        }

        // Коліщатко вниз --Ю рух праворуч
        if (event.deltaY > 0) {
            nextSlide();
        }
    };

    // Визначає відстань фотографії від центральної
    const getOffset = index => {
        let offset = index - currentIndex;

        // Робить перехід між останньою та першою фотографіями
        if (offset > images.length / 2) {
            offset -= images.length;
        }

        if (offset < -images.length / 2) {
            offset += images.length;
        }

        return offset;
    };

    // Якщо фотографії ще НЕ завантажилися
    if (!images.length) {
        return null;
    }

    return (
        <section className={styles.gallery}>
            {/* Заголовок секції */}
            <h2 className={styles.title}>Beautiful nature</h2>

            {/* Контейнер слайдера */}
            <div
                className={styles.slider}
                onWheel={handleWheel}
            >
                <div className={styles.imageWrapper}>
                    {images.map((image, index) => {
                        // Визначає положення фотографії
                        const offset = getOffset(index);
                        const distance = Math.abs(offset);

                        // Початковий розмір дальніх фотографій
                        let width = 248;
                        let height = 136;
                        let position = 347 + (distance - 2) * 248;

                        // Центральна фотографія
                        if (distance === 0) {
                            width = 384;
                            height = 211;
                            position = 0;
                        }
                        // Фотографії поруч з центральною
                        else if (distance === 1) {
                            width = 310;
                            height = 170;
                            position = 192;
                        }

                        // Визначає затемнення фотографії
                        let overlayStyle = '';

                        if (distance === 1) {
                            overlayStyle = styles.overlaySecond;
                        } else if (distance === 2) {
                            overlayStyle = styles.overlayThird;
                        }

                        return (
                            <div
                                key={image.id}
                                className={styles.slide}
                                style={{
                                    width: `${width}px`,
                                    height: `${height}px`,
                                    transform: `translate(-50%, -50%) translateX(${offset < 0 ? -position : position}px)`,
                                    opacity: distance <= 2 ? 1 : 0,
                                    zIndex: 10 - distance,
                                }}
                            >
                                <img
                                    src={image.webformatURL}
                                    alt={image.tags}
                                />

                                <span
                                    className={`${styles.overlay} ${overlayStyle}`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Gallery;