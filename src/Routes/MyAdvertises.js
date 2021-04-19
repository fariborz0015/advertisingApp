import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import loadable from '@loadable/component';
import axios from 'axios';
import * as Actions from './../Actions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfiniteScroll from 'react-infinite-scroll-component';
const BoxList = loadable(() => import('../Components/Landing/BoxList/BoxList'));
const BottomLoading = loadable(() => import('./../Components/BottomLoading/BottomLoading'));
function MyAdvertises(props) {

    const myStorage = window.localStorage;
    const api_token = myStorage.getItem('api_token');
    const [nextPage, nextPageSet] = useState("")
    const [itemlength, itemlengthSet] = useState(5)
    const [hasmore, hasmoreSet] = useState(true)



    useEffect(() => {
        props.dispatch(Actions.loadingAction(true));
        axios.get('/MyAdvertis', {
            headers: {
                Authorization: `Bearer ${api_token}`
            }
        })
            .then(res => {

                props.dispatch(Actions.loadingAction(false));
                props.dispatch(Actions.getMyAdverisesAction(res.data.data));
                nextPageSet(res.data.next_page_url);
                itemlengthSet(itemlength + 5);
                if(res.data.to==res.data.total){
                    hasmoreSet(false)
                }
            })
            .catch(err => {
                toast.error('خطا', { position: "top-center" });
                props.dispatch(Actions.loadingAction(false));
            })

    }, [])


    let GetmoreِData = () => {
        axios.get(nextPage, {
            headers: {
                Authorization: `Bearer ${api_token}`
            }
        })
            .then(res => {
                props.dispatch(Actions.loadingAction(false));
                props.dispatch(Actions.getMyAdverisesAction(res.data.data));
                nextPageSet(res.data.next_page_url);
                itemlengthSet(itemlength + 5);
                if(res.data.to==res.data.total){
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

                <BoxList items={props.MyAdvertises} header="اگهی های ارسال شده شما " nothaveText="شما هیچ اگهی ارسال نکرده اید " />
            </InfiniteScroll>


        </>
    )
}


let mapStateToProps = state => {
    return {
        ...state,
        MyAdvertises: state.GETADVERTISES_reducer.MyAdvertises

    }
}

export default connect(mapStateToProps)(MyAdvertises)