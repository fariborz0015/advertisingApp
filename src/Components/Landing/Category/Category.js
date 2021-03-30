import loadable from '@loadable/component';

const CategoryItem = loadable(() => import('./CategoryItem'))

function Category(params) {
    const justrange = [1, 1, 1, 1, 1, 1, 1, 1, 1,]
    return (
        <ul className="category-list w-100">

            {
                justrange.map((item,index) => <CategoryItem key={`category`+index} />)
            }

        </ul>

    )
}


export default Category