import loadable from '@loadable/component';

const BoxItem = loadable(() => import('./BoxItem'));

function BoxList(props) {


 
    
    const Items = props.items;

    return (
        <div className="box-list" >
            <h3 className="box-list-title pr-3">{props.header} </h3>
            {/* box item */}
            {
                Items.length > 0
                    ?
                    Items.map(item => (<BoxItem item={item} key={`key${item.id}`} />))
                    :
                    <small className="d-block w-100 text-center text-secondary">
                        {props.nothaveText}
                    </small>
            }
            {/* end box item */}
        </div>

    )
}


export default BoxList