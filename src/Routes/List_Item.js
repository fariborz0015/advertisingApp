import loadable from '@loadable/component';

const BoxItem=loadable(()=>import('../Components/Landing/BoxList/BoxItem'));

function List_Item(props) {

    const params=props.match.params

    return (
        <div className="box-list">
            <h3 className="box-list-title pr-3"> اگهی ها برای {params.CatId} </h3>
          {/* box item */}
          <BoxItem />
          {/* end box item */}
        </div>

    )
}


export default List_Item