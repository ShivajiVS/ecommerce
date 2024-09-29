import { categories } from '@/constants/categories';
import { NewsResponse } from '@/types/newResponse';
import { getNewsData } from '@/lib/getNewsData';
import { NewsList } from '@/components/NewsList';

export default async function Home() {
    //fetch the new data
    console.log('catue', categories);

    const news = await getNewsData(categories.join(','));
    console.log('first', news);

    return (
        <main>
            <NewsList news={news} />
        </main>
    );
}
