import loadable from '@loadable/component'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import * as Actions from './../Actions';
import InfiniteScroll from 'react-infinite-scroll-component';
const Category = loadable(() => import('./../Components/Landing/Category/Category'));
const BoxList = loadable(() => import('./../Components/Landing/BoxList/BoxList'));
const BottomLoading = loadable(() => import('./../Components/BottomLoading/BottomLoading'));

function Home(props) {



    const [nextPage, nextPageSet] = useState("")
    const [itemlength, itemlengthSet] = useState(5)
    const [hasmore, hasmoreSet] = useState(true)
    const api_token = window.localStorage.getItem('api_token');

    //get Last ads 
    useEffect(() => {
        axios.get('http://laravelapi.dct-roosh-hirkan.ir/api/LastAds', {
            headers: {
                Authorization: `Bearer ${api_token}`
            }
        })
            .then(res => {


                props.dispatch(Actions.loadingAction(false));
                props.dispatch(Actions.getLastAds(res.data.data));
                nextPageSet(res.data.next_page_url);
                itemlengthSet(itemlength + 5);
                if (res.data.to == res.data.total) {
                    hasmoreSet(false)
                }
            })
            .catch(err => {

            })


    }, [])
    //end

    //getting categories
    useEffect(() => {
        axios.get('http://laravelapi.dct-roosh-hirkan.ir/api/category/getAll', {
            headers: {
                Authorization: `Bearer ${api_token}`
            }
        })
            .then(res => {

         
                props.dispatch(Actions.loadingAction(false));
                props.dispatch(Actions.GetAllCategory(res.data.Data.items));

            })
            .catch(err => {

            })

    }, [])
    //end


    //ionfinte get data
    let GetmoreِData = () => {
        axios.get(nextPage, {
            headers: {
                Authorization: `Bearer ${api_token}`
            }
        })
            .then(res => {
                props.dispatch(Actions.loadingAction(false));
                props.dispatch(Actions.getLastAds(res.data.data));
                nextPageSet(res.data.next_page_url);
                itemlengthSet(itemlength + 5);
                if (res.data.to == res.data.total) {
                    hasmoreSet(false)
                }
            })
            .catch(err => {

            })

    }
    //end

 
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


                <Category items={props.Categories} />
                <BoxList items={props.LastAds} header="  جدید ترین اگهی های ما " nothaveText="هیچ اگهی جدیدی وجود ندارد " />

            </InfiniteScroll>


        </>
    )
}

let mapStateToProps = state => {
    return {
        ...state,
        LastAds:sortBydate(state.GETADVERTISES_reducer.LastAds),
        Categories: state.GETCATEGORIES_reducer.Categories
    }



}


let sortBydate = array => {
    return array.sort(function (a, b) {
        return new Date(b.created_at) - new Date(a.created_at);
    });
}
export default connect(mapStateToProps)(Home)