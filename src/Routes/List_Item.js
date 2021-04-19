import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import loadable from '@loadable/component';
import axios from 'axios';
import * as Actions from './../Actions'


import InfiniteScroll from 'react-infinite-scroll-component';
const BoxList = loadable(() => import('../Components/Landing/BoxList/BoxList'));
const BottomLoading = loadable(() => import('./../Components/BottomLoading/BottomLoading'));
function Category_items(props) {



    const myStorage = window.localStorage;
    const api_token = myStorage.getItem('api_token');
    const [nextPage, nextPageSet] = useState(null);
    const [itemlength, itemlengthSet] = useState(5);
    const [hasmore, hasmoreSet] = useState(true);
    const [items, itemsSet] = useState({});
    const [categoryInfo, categoryInfoSET] = useState({});



    useEffect(() => {
        props.dispatch(Actions.loadingAction(true));
        axios.get(`http://laravelapi.dct-roosh-hirkan.ir/api/getItemBYcategory?catid=${props.match.params.CatId}`, {
            headers: {
                Authorization: `Bearer ${api_token}`
            }
        })
            .then(res => {

                itemsSet(res.data.Advertises.data);
                categoryInfoSET(res.data.category);
                nextPageSet(res.data.Advertises.next_page_url);
                itemlengthSet(itemlength + 5);
                if (res.data.Advertises.total - itemlength == 0) {
                    hasmoreSet(false)
                }

                props.dispatch(Actions.loadingAction(false));
            })
            .catch(err => {
                props.dispatch(Actions.loadingAction(false));

            })

    }, [])



    let GetmoreِData = () => {
        axios.get(nextPage + `&catid=${props.match.params.CatId}`, {
            headers: {
                Authorization: `Bearer ${api_token}`
            }
        })
            .then(res => {
                props.dispatch(Actions.loadingAction(false));
                itemsSet([...items, ...res.data.Advertises.data]);
                nextPageSet(res.data.Advertises.next_page_url);
                itemlengthSet(itemlength + 5);
                if (res.data.Advertises.total - itemlength <= 0) {
                    hasmoreSet(false)
                }
            })
            .catch(err => {

            })

    }


    return (
        <>

            <InfiniteScroll
                dataLength={itemlength} //This is important field to render the next data
                next={() => GetmoreِData()}
                hasMore={hasmore}
                scrollThreshold={1}
                scrollableTarget="scrollableDiv"
                loader={<BottomLoading />}
                endMessage={
                    <p className="text-center text-secondary">
                        <b> همه اگهی ها مشاهده شد </b>
                    </p>
                }


                releaseToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                }
            >
                <br />
           
                <BoxList items={items} header={`اگهی های ${categoryInfo.name} `} nothaveText="شما هیچ اگهی ارسال نکرده اید " />
            </InfiniteScroll>


        </>
    )
}


let mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Category_items)