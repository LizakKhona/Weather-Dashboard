// ===== Ключ для доступу до Pixabay API =====
const API_KEY = '57746768-7f6f59d2a7c92a428583d8afa'

// Функція отримує 10 фотографій природи з Pixabay
export const getNatureImages = async () => {
    const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=nature&image_type=photo&orientation=horizontal&per_page=10&safesearch=true`
    );

    // чи успішно виконаний запит
    if (!response.ok) {
        throw new Error('Не вдалося завантажити зображення');
    }

    // Перетворює відповідь сервера з JSON у JavaScript об'єкт
    const data = await response.json();

    // повертає масив знайдених фотографій
    return data.hits;
};