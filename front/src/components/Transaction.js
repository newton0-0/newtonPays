import {useState} from 'react';
import { Grid } from '@mui/material';

const Transaction = () => {
    const [reciever, setReciever] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    async function getUserLocation() {
        let actualPosition;
        try {
          if (navigator.geolocation) {
            const position = await navigator.geolocation.getCurrentPosition(
              (position) => {
                actualPosition = position;
                console.log("check 1",position);  
              },
              (error) => {
                console.error("Error:", error.message);
              }
            );
            console.log("check 2", position);
            return {...actualPosition};
          } else {
            console.error("Geolocation is not supported by this browser.");
            return null;
          }
        } catch (error) {
          console.error("Error:", error);
          return null;
        }
      }

    async function doTransaction(e) {
        e.preventDefault();

        const transaction = await fetch('/payment/send-money', {
            method: 'POST',
            headers: {
                'authorization' : localStorage.getItem('username'),
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                reciever : reciever,
                amount: amount,
                description: description
            })
        });
        const res = transaction.json();

        console.log(res);
    }

    return (
        <div>
            <h3 className='transactionHeader'>do transaction here</h3>
            {/* <Grid container direction="row">
                <Grid item xs={42} spacing={2}> {}
                    <h1>email</h1>
                </Grid>
                <Grid item xs={4} spacing={2}>
                    <image src={icon1}>email</image>
                </Grid>
            </Grid> */}
            <form className='transactionForm'>
            <Grid container direction="column">
                <Grid item xs={4} spacing={2}> {}
                    <label>
                        reciever:
                        <input type="text" value={reciever} onChange={(e) => setReciever(e.target.value)} />
                    </label>
                </Grid>
                <Grid item xs={4} spacing={2}>
                    <label>
                        amount:
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </label>
                </Grid>
                <Grid item xs={4} spacing={2}>
                    <label>
                        description:
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                </Grid>
                <Grid item xs={8} spacing={2} className='transactionButton'><button onClick={(e) => doTransaction(e)}>Submit</button></Grid>
            </Grid>
            </form>
        </div>
    )
}

export default Transaction;