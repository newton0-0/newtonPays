import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';

const TransactionHistory = () => {
    const [userData, setData] = useState([]);
    // const token = localStorage.getItem('authToken');
    const id = localStorage.getItem('username');
    
    async function fetchFriends() {
        const res = await fetch('/payment/get-transactions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': id
            }
        });
        const friendsData = await res.json();
        setData(friendsData.data);
    };
    useEffect(() => {
        fetchFriends();
    }, []);
    
    return (
        <div className='transactionsList'>
            <div className='transactionHeader'>
            <Grid container>
                <Grid item xs={2.5} md={2} spacing={4}>
                    <p className='transactionContent'>username</p>
                </Grid>
                <Grid item xs={2} md={2} spacing={4}>
                    <p className='transactionContent'>amount</p>
                </Grid>
                <Grid item xs={2.5} md={2} spacing={4}>
                    <p className='transactionContent'>date</p>
                </Grid>
                <Grid item xs={4} md={2} spacing={4}>
                    <p className='transactionContent'>description</p>
                </Grid>
            </Grid>
            </div>
        {userData.map((transaction) => {
            return (
                <div className='oneTransaction'>
                    <Grid container>
                        <Grid item xs={2} md={2} spacing={3}>
                            <p className='transactionContent'>{transaction.friend.username}</p>
                        </Grid>
                        <Grid item xs={2} md={2} spacing={3}>
                            <p className='transactionContent'>{transaction.amount}</p>
                        </Grid>
                        <Grid item xs={4} md={2} spacing={3}>
                            <p className='transactionContent'>{transaction.createdAt.slice(0, 10)}</p>
                        </Grid>
                        <Grid item xs={4} md={2} spacing={3}>
                            <p className='transactionContent'>{transaction.description}</p>
                        </Grid>
                    </Grid>
                </div>
            )
        })}
        </div>
    )
}

export default TransactionHistory;