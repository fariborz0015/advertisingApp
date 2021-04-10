import loadable from '@loadable/component';

const CategoryItem = loadable(() => import('./CategoryItem'))

function Category(props) {
     let categories=props.items;
    return (
        <ul className="category-list w-100">

            {
                categories.map((item) => <CategoryItem item={item} key={`category`+item.id} />)
            }

        </ul>

    )
}


export default Category