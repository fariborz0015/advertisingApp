import loadable from '@loadable/component';

const BoxItem=loadable(()=>import('./BoxItem'));

function BoxList(params) {


    return (
        <div className="box-list">
            <h3 className="box-list-title pr-3">جدید ترین اگهی های ما </h3>
          {/* box item */}
          <BoxItem />
          {/* end box item */}
        </div>

    )
}


export default BoxList