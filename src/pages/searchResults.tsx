import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import {TextField, Button, Box} from '@mui/material';
import getBillFromKeywords from './api/billsForText';

export default function SearchResults(){
    const router = useRouter();
    const routerQuery = router.query;
    let keywords= routerQuery[Object.keys(routerQuery)[0]];

    const [searchResult, setSearchResult] = useState("");

    //use keywords to search for bills using billsForText
    //figure out how to get all the bills names and info in an array plus their bill id
    //pipe that into billbutton and then bill button should pipe that into bill page

    useEffect(() => {
        const fetchData = async () =>{
            const state = "CA";
            const query = keywords;
            const searchData = await fetch(`/api/billsForText?state=${state}&query=${query}`);
            const searchDataJson = await searchData.json();
            if(searchData.status >= 400){
                console.log(searchDataJson['message']);
            } else {
                setSearchResult(searchDataJson);
                console.log(searchDataJson);
            }
        };
        fetchData();
        // console.log(keywords);
    }, []);

    return(
        <Button>{keywords}</Button>
    );
}