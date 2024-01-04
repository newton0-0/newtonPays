import {useState} from 'react';
import { Grid } from '@mui/material';

const Transaction = () => {
    const [reciever, setReciever] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

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
                return console.error("Error:", error.message);
              }
            );
            console.log("check 2", actualPosition);
            setLatitude(actualPosition.coords.latitude);
            setLongitude(actualPosition.coords.longitude);
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

        const reqBody = {
            reciever : reciever,
            amount: amount,
            description: description
        }

        const transaction = await fetch('/payment/send-money', {
            method: 'POST',
            headers: {
                'authorization' : localStorage.getItem('username'),
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(reqBody)
        });
        const res = await transaction.json();
        console.log(res);
        if(!res.success) {
            return alert(res.message);
        }
        if(res.data.offerType === "cashback") {
            alert("Congrats! You got a cashback of " + res.data.offer);
        }
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
                        <input type="text" placeholder='reciever phone no.' value={reciever} onChange={(e) => setReciever(e.target.value)} />
                    </label>
                </Grid>
                <Grid item xs={4} spacing={2}>
                    <label>
                        amount:
                        <input type="number" placeholder='amount in INR' value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </label>
                </Grid>
                <Grid item xs={4} spacing={2}>
                    <label>
                        <input type="text" placeholder='description, if any' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                </Grid>
                <Grid item xs={8} spacing={2} className='transactionButton'><button onClick={(e) => doTransaction(e)}>Submit</button></Grid>
            </Grid>
            </form>
        </div>
    )
}

export default Transaction;